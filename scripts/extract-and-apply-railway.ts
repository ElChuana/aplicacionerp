// Script para extraer números de documento de Railway y aplicarlos automáticamente
// Ejecutar con: DATABASE_URL="<railway-url>" npx ts-node scripts/extract-and-apply-railway.ts

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
          content: `Eres un experto en extraer números de documento de descripciones contables chilenas.

INSTRUCCIONES:
1. Extrae SOLO el número del documento (sin prefijos como "FAC-EL", "BOL", "#", etc.)
2. Si hay múltiples números, prioriza el que parece ser el folio/número de factura
3. Responde en formato JSON: {"number": "123456", "confidence": "high|medium|low"}
4. Si no hay número claro, responde {"number": "NONE", "confidence": "high"}

EJEMPLOS:
- "FAC-EL #15167859" → {"number": "15167859", "confidence": "high"}
- "Boleta 123456 - Servicio" → {"number": "123456", "confidence": "high"}
- "Factura 45-2024" → {"number": "45-2024", "confidence": "high"}
- "Pago servicios diciembre" → {"number": "NONE", "confidence": "high"}
- "F-123456 Mantención" → {"number": "123456", "confidence": "high"}`
        },
        {
          role: "user",
          content: `Extrae el número de documento:\n\n"${description}"`
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

async function main() {
  console.log('🤖 Extracción y aplicación automática en Railway...\n');
  
  // Verificar API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY no está configurada');
    process.exit(1);
  }
  
  try {
    // Obtener obligaciones sin document_number pero con descripción
    console.log('📊 Obteniendo obligaciones de Railway...');
    const obligations = await prisma.$queryRaw<Array<{ id: bigint; description: string }>>`
      SELECT id, description 
      FROM obligations 
      WHERE description IS NOT NULL
      AND TRIM(description) != ''
      AND (document_number IS NULL OR document_number = '')
      ORDER BY id DESC
    `;
    
    console.log(`📋 Encontradas ${obligations.length} obligaciones para procesar\n`);
    
    if (obligations.length === 0) {
      console.log('✅ Todas las obligaciones ya tienen número de documento o no tienen descripción');
      return;
    }
    
    // Procesar en lotes
    const results: ExtractionResult[] = [];
    const batchSize = 10;
    
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
      
      const extracted = batchResults.filter(r => r.extractedNumber).length;
      console.log(`   ✅ Extraídos: ${extracted}/${batch.length}`);
      
      // Pausa entre lotes
      if (i + batchSize < obligations.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    // Filtrar solo los que tienen número extraído
    const toApply = results.filter(r => r.extractedNumber);
    
    console.log('\n\n📊 RESUMEN:');
    console.log('═'.repeat(80));
    console.log(`Total procesado:       ${results.length}`);
    console.log(`Números extraídos:     ${toApply.length} (${Math.round(toApply.length / results.length * 100)}%)`);
    console.log(`Sin número:            ${results.length - toApply.length}`);
    
    const highConf = toApply.filter(r => r.confidence === 'high');
    const medConf = toApply.filter(r => r.confidence === 'medium');
    const lowConf = toApply.filter(r => r.confidence === 'low');
    
    console.log('\nPor confianza:');
    console.log(`  🟢 Alta:             ${highConf.length}`);
    console.log(`  🟡 Media:            ${medConf.length}`);
    console.log(`  🔴 Baja:             ${lowConf.length}`);
    console.log('═'.repeat(80));
    
    if (toApply.length === 0) {
      console.log('\n⚠️  No hay números para aplicar');
      return;
    }
    
    // Mostrar muestra
    console.log('\n📋 MUESTRA DE EXTRACCIONES (primeras 10):');
    console.log('─'.repeat(100));
    toApply.slice(0, 10).forEach((r, idx) => {
      const emoji = r.confidence === 'high' ? '🟢' : r.confidence === 'medium' ? '🟡' : '🔴';
      const desc = r.description.substring(0, 50);
      console.log(`${idx + 1}. ${emoji} ID: ${r.obligationId} | N° Doc: ${r.extractedNumber}`);
      const ellipsis = r.description.length > 50 ? '...' : '';
      console.log(`   "${desc}${ellipsis}"`);
    });
    
    // Confirmar aplicación
    console.log('\n\n⚠️  APLICANDO CAMBIOS EN 5 SEGUNDOS...');
    console.log('   Presiona Ctrl+C para cancelar\n');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('💾 Actualizando base de datos en Railway...\n');
    
    let updated = 0;
    let errors = 0;
    
    for (const result of toApply) {
      try {
        await prisma.$executeRaw`
          UPDATE obligations 
          SET document_number = ${result.extractedNumber}
          WHERE id = ${BigInt(result.obligationId)}
        `;
        updated++;
        
        if (updated % 10 === 0) {
          console.log(`   ✅ Actualizadas ${updated}/${toApply.length} obligaciones...`);
        }
      } catch (error) {
        console.error(`   ❌ Error actualizando ID ${result.obligationId}:`, error);
        errors++;
      }
    }
    
    console.log('\n' + '═'.repeat(80));
    console.log('✅ ACTUALIZACIÓN COMPLETADA');
    console.log('═'.repeat(80));
    console.log(`Obligaciones actualizadas: ${updated}`);
    console.log(`Errores:                   ${errors}`);
    console.log('═'.repeat(80) + '\n');
    
    // Guardar log
    const { writeFileSync } = await import('fs');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    const logPath = `./scripts/railway-extraction-${timestamp}.json`;
    writeFileSync(logPath, JSON.stringify({ results, updated, errors }, null, 2));
    console.log(`💾 Log guardado en: ${logPath}\n`);
    
  } catch (error) {
    console.error('❌ Error:', error);
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
