// Script para extraer números de documento usando OpenAI
// Ejecutar con: npx ts-node scripts/extract-document-numbers-ai.ts

import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();

// Inicializar OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ExtractionResult {
  obligationId: string;
  description: string;
  extractedNumber: string | null;
  confidence: 'high' | 'medium' | 'low';
}

async function extractDocumentNumberWithAI(description: string): Promise<{ number: string | null; confidence: 'high' | 'medium' | 'low' }> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Eres un asistente experto en contabilidad chilena. Tu tarea es extraer el número de documento (factura, boleta, etc.) de la descripción de una obligación contable.

REGLAS:
1. Extrae SOLO el número del documento (sin texto adicional)
2. Si hay múltiples números, prioriza el que parece ser el número de factura/boleta
3. Si no encuentras un número de documento claro, responde "NONE"
4. Responde en formato JSON: {"number": "123456", "confidence": "high|medium|low"}
5. Confidence: 
   - high: número claramente identificado como factura/boleta
   - medium: número probable pero no completamente claro
   - low: número posible pero dudoso

EJEMPLOS:
- "Factura 123456" → {"number": "123456", "confidence": "high"}
- "Boleta electrónica N° 789012" → {"number": "789012", "confidence": "high"}
- "Pago servicios mes diciembre" → {"number": "NONE", "confidence": "high"}
- "Doc 456 - Mantención" → {"number": "456", "confidence": "medium"}`
        },
        {
          role: "user",
          content: `Extrae el número de documento de esta descripción:\n\n"${description}"`
        }
      ],
      temperature: 0.1,
      max_tokens: 100,
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      return { number: null, confidence: 'low' };
    }

    const result = JSON.parse(response);
    
    if (result.number === "NONE" || !result.number) {
      return { number: null, confidence: result.confidence || 'low' };
    }

    return {
      number: result.number.toString().trim(),
      confidence: result.confidence || 'medium'
    };

  } catch (error) {
    console.error('Error en OpenAI:', error);
    return { number: null, confidence: 'low' };
  }
}

async function processBatch(obligations: Array<{ id: bigint; description: string }>, batchSize: number = 10): Promise<ExtractionResult[]> {
  const results: ExtractionResult[] = [];
  
  for (let i = 0; i < obligations.length; i += batchSize) {
    const batch = obligations.slice(i, i + batchSize);
    console.log(`\n📦 Procesando lote ${Math.floor(i / batchSize) + 1}/${Math.ceil(obligations.length / batchSize)} (${batch.length} obligaciones)...`);
    
    const batchPromises = batch.map(async (obl) => {
      const result = await extractDocumentNumberWithAI(obl.description);
      
      return {
        obligationId: obl.id.toString(),
        description: obl.description,
        extractedNumber: result.number,
        confidence: result.confidence
      };
    });
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    // Mostrar progreso
    const extracted = batchResults.filter(r => r.extractedNumber).length;
    console.log(`   ✅ Extraídos: ${extracted}/${batch.length}`);
    
    // Pequeña pausa entre lotes para no saturar la API
    if (i + batchSize < obligations.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  return results;
}

async function main() {
  console.log('🤖 Iniciando extracción inteligente con OpenAI...\n');
  
  // Verificar API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY no está configurada en .env');
    process.exit(1);
  }
  
  try {
    // Obtener obligaciones con descripción
    console.log('📊 Obteniendo obligaciones...');
    const obligations = await prisma.$queryRaw<Array<{ id: bigint; description: string }>>`
      SELECT id, description 
      FROM obligations 
      WHERE description IS NOT NULL
      AND TRIM(description) != ''
      ORDER BY id DESC
    `;
    
    console.log(`📋 Encontradas ${obligations.length} obligaciones con descripción\n`);
    
    if (obligations.length === 0) {
      console.log('✅ No hay obligaciones para procesar');
      return;
    }
    
    // Procesar con OpenAI en lotes
    const results = await processBatch(obligations);
    
    // Estadísticas
    const extracted = results.filter(r => r.extractedNumber);
    const highConfidence = extracted.filter(r => r.confidence === 'high');
    const mediumConfidence = extracted.filter(r => r.confidence === 'medium');
    const lowConfidence = extracted.filter(r => r.confidence === 'low');
    
    console.log('\n\n📊 RESUMEN DE EXTRACCIÓN:');
    console.log('═'.repeat(80));
    console.log(`Total procesado:       ${results.length}`);
    console.log(`Números extraídos:     ${extracted.length} (${Math.round(extracted.length / results.length * 100)}%)`);
    console.log(`Sin número:            ${results.length - extracted.length}`);
    console.log('\nPor nivel de confianza:');
    console.log(`  🟢 Alta:             ${highConfidence.length}`);
    console.log(`  🟡 Media:            ${mediumConfidence.length}`);
    console.log(`  🔴 Baja:             ${lowConfidence.length}`);
    console.log('═'.repeat(80));
    
    // Mostrar muestra de extracciones exitosas
    if (extracted.length > 0) {
      console.log('\n📋 MUESTRA DE EXTRACCIONES (primeras 15):');
      console.log('─'.repeat(100));
      extracted.slice(0, 15).forEach((r, idx) => {
        const emoji = r.confidence === 'high' ? '🟢' : r.confidence === 'medium' ? '🟡' : '🔴';
        const desc = r.description.substring(0, 60);
        console.log(`\n${idx + 1}. ${emoji} ID: ${r.obligationId} | N° Doc: ${r.extractedNumber}`);
        console.log(`   "${desc}${r.description.length > 60 ? '...' : ''}"`);
      });
    }
    
    // Guardar resultados
    const { writeFileSync } = await import('fs');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    const outputPath = `./scripts/document-numbers-ai-${timestamp}.json`;
    writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\n\n💾 Resultados completos guardados en: ${outputPath}`);
    
    // Instrucciones
    console.log('\n\n⚠️  MODO PREVIEW - Cambios NO aplicados a la base de datos');
    console.log('\n📝 PRÓXIMOS PASOS:');
    console.log('1. Revisa el archivo JSON generado');
    console.log('2. Si los resultados son correctos, ejecuta el script de aplicación:');
    console.log('   npx ts-node scripts/apply-document-numbers.ts');
    console.log('\n');
    
  } catch (error) {
    console.error('❌ Error durante la extracción:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
