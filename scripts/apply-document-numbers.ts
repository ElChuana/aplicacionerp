// Script para aplicar los números de documento extraídos con IA
// Ejecutar con: npx ts-node scripts/apply-document-numbers.ts <archivo-json>

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface ExtractionResult {
  obligationId: string;
  description: string;
  extractedNumber: string | null;
  confidence: 'high' | 'medium' | 'low';
}

async function main() {
  // Obtener archivo JSON de los argumentos
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('❌ Error: Debes proporcionar el archivo JSON con los resultados');
    console.log('\nUso:');
    console.log('  npx ts-node scripts/apply-document-numbers.ts <archivo-json>');
    console.log('\nEjemplo:');
    console.log('  npx ts-node scripts/apply-document-numbers.ts scripts/document-numbers-ai-2025-11-24.json');
    process.exit(1);
  }
  
  const jsonFile = args[0];
  
  if (!fs.existsSync(jsonFile)) {
    console.error(`❌ Error: No se encuentra el archivo ${jsonFile}`);
    process.exit(1);
  }
  
  console.log('🚀 Iniciando aplicación de números de documento...\n');
  console.log(`📂 Leyendo archivo: ${jsonFile}\n`);
  
  try {
    // Leer resultados
    const results: ExtractionResult[] = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
    
    // Filtrar solo los que tienen número extraído
    const toUpdate = results.filter(r => r.extractedNumber);
    
    console.log('📊 Estadísticas:');
    console.log(`   Total en archivo:  ${results.length}`);
    console.log(`   Con número:        ${toUpdate.length}`);
    console.log(`   Sin número:        ${results.length - toUpdate.length}\n`);
    
    if (toUpdate.length === 0) {
      console.log('⚠️  No hay números de documento para aplicar');
      return;
    }
    
    // Filtrar por nivel de confianza (opcional)
    const minConfidence = process.env.MIN_CONFIDENCE || 'low';
    const confidenceLevels = { high: 3, medium: 2, low: 1 };
    
    const filtered = toUpdate.filter(r => {
      const level = confidenceLevels[r.confidence];
      const minLevel = confidenceLevels[minConfidence as keyof typeof confidenceLevels];
      return level >= minLevel;
    });
    
    if (filtered.length < toUpdate.length) {
      console.log(`⚠️  Filtrado por confianza mínima "${minConfidence}": ${filtered.length}/${toUpdate.length}\n`);
    }
    
    // Confirmación
    console.log('⚠️  ¿ESTÁS SEGURO DE APLICAR ESTOS CAMBIOS?\n');
    console.log('   Se actualizarán las siguientes obligaciones:');
    filtered.slice(0, 5).forEach((r, idx) => {
      const emoji = r.confidence === 'high' ? '🟢' : r.confidence === 'medium' ? '🟡' : '🔴';
      console.log(`   ${idx + 1}. ${emoji} ID ${r.obligationId}: "${r.description.substring(0, 40)}..." → ${r.extractedNumber}`);
    });
    if (filtered.length > 5) {
      console.log(`   ... y ${filtered.length - 5} más\n`);
    }
    
    console.log('\n⏳ Aplicando cambios en 5 segundos... (Ctrl+C para cancelar)\n');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('💾 Actualizando base de datos...\n');
    
    let updated = 0;
    let errors = 0;
    
    for (const result of filtered) {
      try {
        await prisma.$executeRaw`
          UPDATE obligations 
          SET document_number = ${result.extractedNumber}
          WHERE id = ${BigInt(result.obligationId)}
        `;
        updated++;
        
        if (updated % 10 === 0) {
          console.log(`   ✅ Procesadas ${updated}/${filtered.length} obligaciones...`);
        }
      } catch (error) {
        console.error(`   ❌ Error actualizando obligación ${result.obligationId}:`, error);
        errors++;
      }
    }
    
    console.log('\n' + '═'.repeat(80));
    console.log('✅ ACTUALIZACIÓN COMPLETADA');
    console.log('═'.repeat(80));
    console.log(`Obligaciones actualizadas: ${updated}`);
    console.log(`Errores:                   ${errors}`);
    console.log('═'.repeat(80) + '\n');
    
    // Crear backup del resultado
    const backupPath = jsonFile.replace('.json', '-applied.json');
    fs.copyFileSync(jsonFile, backupPath);
    console.log(`💾 Backup guardado en: ${backupPath}\n`);
    
  } catch (error) {
    console.error('❌ Error durante la aplicación:', error);
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
