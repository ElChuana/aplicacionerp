// Script para analizar las descripciones de obligaciones y ver patrones
// Ejecutar con: npx ts-node scripts/analyze-descriptions.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Analizando descripciones de obligaciones...\n');
  
  try {
    const obligations = await prisma.$queryRaw<Array<{ id: bigint; description: string | null }>>`
      SELECT id, description 
      FROM obligations 
      WHERE description IS NOT NULL
      ORDER BY id DESC
      LIMIT 50
    `;
    
    console.log(`📊 Mostrando las últimas ${obligations.length} obligaciones con descripción:\n`);
    console.log('═'.repeat(100));
    
    obligations.forEach((obl, idx) => {
      console.log(`\n${idx + 1}. ID: ${obl.id}`);
      console.log(`   Descripción: "${obl.description}"`);
      console.log('─'.repeat(100));
    });
    
    console.log('\n\n📋 Análisis de patrones:');
    console.log('Buscaremos patrones comunes en estas descripciones para mejorar la extracción.');
    
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
