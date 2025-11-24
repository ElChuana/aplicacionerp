const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const TYPE_NAMES = [
  'Capacitación',
  'Asesoría Legal',
  'Asesoría Tributaria',
  'Construcción',
  'Arquitectura',
  'Materiales y Retail',
  'Servicios Varios',
  'Seguros',
  'Software',
  'Seguridad',
  'Gastos Bancarios',
  'Nota de Crédito',
];

async function ensureTypes() {
  let created = 0;
  for (const name of TYPE_NAMES) {
    const sql = `INSERT INTO obligation_types(name) SELECT '${name.replace(/'/g, "''")}' WHERE NOT EXISTS (SELECT 1 FROM obligation_types WHERE name='${name.replace(/'/g, "''")}')`;
    await prisma.$executeRawUnsafe(sql);
  }
  const types = await prisma.obligation_types.findMany({ select: { id: true, name: true } });
  const map = new Map(types.map(t => [t.name, t.id]));
  return { types: map };
}

function readStatements(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Split by ; and keep INSERT statements only
  const statements = content
    .split(';')
    .map(s => s.trim())
    .filter(s => s && s.toUpperCase().startsWith('INSERT INTO'))
    .map(s => s + ';');
  return statements;
}

async function executeStatements(statements) {
  let ok = 0, fail = 0;
  for (const stmt of statements) {
    try {
      await prisma.$executeRawUnsafe(stmt);
      ok++;
    } catch (e) {
      // Log y continuar
      console.error('Error ejecutando SQL:', e.message);
      fail++;
    }
  }
  return { ok, fail };
}

async function main() {
  console.log('🚀 Asegurando tipos de obligación...');
  const { types } = await ensureTypes();
  console.log(`✓ Tipos disponibles: ${types.size}`);

  const outDir = path.join(__dirname, 'out');
  const provFile = path.join(outDir, 'providers_inserts.sql');
  const oblFile = path.join(outDir, 'obligations_inserts.sql');

  if (fs.existsSync(provFile)) {
    const provContent = fs.readFileSync(provFile, 'utf-8');
    if (!provContent.includes('No hay proveedores nuevos')) {
      console.log('📦 Ejecutando inserts de proveedores...');
      const provStatements = readStatements(provFile);
      const resProv = await executeStatements(provStatements);
      console.log(`✓ Proveedores: ${resProv.ok} ejecutados, ${resProv.fail} con error`);
    } else {
      console.log('✓ No hay proveedores nuevos');
    }
  } else {
    console.log('ℹ️  No se encontró providers_inserts.sql');
  }

  if (fs.existsSync(oblFile)) {
    console.log('📦 Ejecutando inserts de obligaciones...');
    const oblStatements = readStatements(oblFile);
    const resObl = await executeStatements(oblStatements);
    console.log(`✓ Obligaciones: ${resObl.ok} ejecutados, ${resObl.fail} con error`);
  } else {
    console.log('❌ No se encontró obligations_inserts.sql');
  }

  await prisma.$disconnect();
}

main().catch(e => { console.error('Fallo:', e); prisma.$disconnect(); process.exit(1); });
