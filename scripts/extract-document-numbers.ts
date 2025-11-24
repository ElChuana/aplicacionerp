// Script para extraer números de documento de las descripciones de obligaciones
// y poblar el campo document_number automáticamente
// Ejecutar con: npx ts-node scripts/extract-document-numbers.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Patrones comunes para detectar números de documento en descripciones
const patterns = [
  // Factura/Boleta seguido de número
  /(?:factura|boleta|fac|bol|doc|documento|n°|nº|#)\s*[:\-]?\s*(\d+)/i,
  
  // Número de factura electrónica (largo)
  /(?:factura|boleta)?\s*(?:electrónica|elect|elec)?\s*[:\-]?\s*(\d{6,})/i,
  
  // Folio seguido de número
  /folio\s*[:\-]?\s*(\d+)/i,
  
  // Solo números largos al inicio o final (probablemente sea un folio)
  /^(\d{6,})\b/,
  /\b(\d{6,})$/,
  
  // Formato "F-12345" o "B-12345"
  /[FB]\-(\d+)/i,
  
  // Número entre paréntesis que probablemente sea factura
  /\((\d{5,})\)/,
  
  // Guión seguido de número (común en facturas)
  /\s\-\s*(\d{5,})/,
];

interface ExtractionResult {
  obligationId: string;
  oldDescription: string;
  extractedNumber: string;
  pattern: string;
}

function extractDocumentNumber(description: string | null): string | null {
  if (!description) return null;
  
  const text = description.trim();
  
  // Probar cada patrón
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const number = match[1].trim();
      // Validar que el número extraído sea razonable (al menos 3 dígitos)
      if (number.length >= 3) {
        return number;
      }
    }
  }
  
  return null;
}

async function main() {
  console.log('🔍 Iniciando extracción de números de documento...\n');
  
  try {
    // Verificar si la columna document_number existe
    let obligations: Array<{ id: bigint; description: string | null }>;
    
    try {
      // Intentar con Prisma (si la columna ya existe)
      obligations = await prisma.obligations.findMany({
        where: {
          document_number: null,
          description: {
            not: null,
          },
        },
        select: {
          id: true,
          description: true,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2022') {
        // La columna no existe aún, usar query SQL directo
        console.log('⚠️  La columna document_number aún no existe en la base de datos');
        console.log('📝 Obteniendo obligaciones con descripción mediante SQL directo...\n');
        
        obligations = await prisma.$queryRaw<Array<{ id: bigint; description: string | null }>>`
          SELECT id, description 
          FROM obligations 
          WHERE description IS NOT NULL
        `;
      } else {
        throw error;
      }
    }
    
    console.log(`📊 Encontradas ${obligations.length} obligaciones sin número de documento\n`);
    
    if (obligations.length === 0) {
      console.log('✅ No hay obligaciones para procesar');
      return;
    }
    
    const results: ExtractionResult[] = [];
    let extracted = 0;
    let notFound = 0;
    
    // Analizar cada obligación
    for (const obl of obligations) {
      const documentNumber = extractDocumentNumber(obl.description);
      
      if (documentNumber) {
        results.push({
          obligationId: obl.id.toString(),
          oldDescription: obl.description || '',
          extractedNumber: documentNumber,
          pattern: 'Detectado',
        });
        extracted++;
      } else {
        notFound++;
      }
    }
    
    console.log(`\n📈 Resultados del análisis:`);
    console.log(`   ✅ Números extraídos: ${extracted}`);
    console.log(`   ❌ No se encontró patrón: ${notFound}`);
    console.log(`   📊 Total procesado: ${obligations.length}\n`);
    
    if (results.length === 0) {
      console.log('⚠️  No se encontraron números de documento para extraer');
      return;
    }
    
    // Mostrar muestra de los primeros 10 resultados
    console.log('📋 Muestra de extracciones (primeros 10):');
    console.log('─'.repeat(100));
    results.slice(0, 10).forEach((r, idx) => {
      const desc = r.oldDescription.substring(0, 60);
      console.log(`${idx + 1}. ID: ${r.obligationId} | N° Doc: ${r.extractedNumber}`);
      console.log(`   Descripción: "${desc}${r.oldDescription.length > 60 ? '...' : ''}"`);
      console.log('');
    });
    
    // Preguntar confirmación (en un entorno real)
    console.log('\n⚠️  MODO PREVIEW - No se realizarán cambios en la base de datos');
    console.log('Para aplicar los cambios, modifica el script y descomenta la sección de UPDATE\n');
    
    // DESCOMENTAR ESTA SECCIÓN PARA APLICAR LOS CAMBIOS:
    /*
    console.log('💾 Aplicando cambios a la base de datos...\n');
    console.log('⚠️  IMPORTANTE: Asegúrate de que la columna document_number ya existe en la BD\n');
    
    let updated = 0;
    for (const result of results) {
      try {
        // Usar SQL directo para máxima compatibilidad
        await prisma.$executeRaw`
          UPDATE obligations 
          SET document_number = ${result.extractedNumber}
          WHERE id = ${BigInt(result.obligationId)}
        `;
        updated++;
        if (updated % 50 === 0) {
          console.log(`   Procesadas ${updated}/${results.length} obligaciones...`);
        }
      } catch (error) {
        console.error(`❌ Error actualizando obligación ${result.obligationId}:`, error);
      }
    }
    
    console.log(`\n✅ Actualización completada: ${updated} obligaciones actualizadas`);
    */
    
    // Guardar resultados en un archivo para revisión
    const fs = require('fs');
    const outputPath = './scripts/document-numbers-extracted.json';
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`💾 Resultados guardados en: ${outputPath}`);
    console.log('   Revisa este archivo antes de aplicar los cambios\n');
    
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
