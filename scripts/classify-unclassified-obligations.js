#!/usr/bin/env node
/**
 * Re-clasifica obligaciones que aún tienen cost_center_id/sub_account_id NULL.
 * Usa el mismo mapeo estático de provider_id -> (cost_center_id, sub_account_id)
 * Ejecutar: node scripts/classify-unclassified-obligations.js [companyId]
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mapping = {
  1:  { cc:8, sa:62 },      // Plan ok
  2:  { cc:5, sa:35 },      // Aguas Andinas
  3:  { cc:8, sa:64 },      // Capacitaciones Luis Felipe
  4:  { cc:5, sa:132 },     // Estudio Jurídico V.H.V.R.
  5:  { cc:5, sa:41 },      // Estudio Tributario
  6:  { cc:11, sa:140 },    // S Y C Construcciones -> Postventa
  7:  { cc:2, sa:12 },      // Diseño & Arquitectura
  8:  { cc:11, sa:122 },    // Constructora Nueva RSA
  9:  { cc:5, sa:39 },      // Kleber Home
  10: { cc:11, sa:123 },    // Sociedad Comercial Fenix
  11: { cc:5, sa:45 },      // Orsan Seguros
  12: { cc:8, sa:62 },      // Plan OK S.A.
  13: { cc:5, sa:139 },     // Tepille SPA -> Seguridad
  14: { cc:5, sa:45 },      // Orion Seguros
  15: { cc:6, sa:51 },      // Banco Internacional
  16: { cc:5, sa:41 },      // Nubox
  17: { cc:5, sa:141 },     // Banco Security -> Gastos Bancarios
  18: { cc:5, sa:47 },      // Cencosud
  19: { cc:11, sa:123 },    // Sodimac
};

async function main() {
  const companyId = Number(process.argv[2] || 1);
  console.log(`=== Reclasificando obligaciones sin clasificación (company=${companyId}) ===`);
  // Obtener obligaciones sin clasificación para la compañía
  const unclassified = await prisma.obligations.findMany({
    where: { cost_center_id: null, provider_id: { in: Object.keys(mapping).map(Number) }, projects: { company_id: companyId } },
    select: { id: true, provider_id: true }
  });
  if (unclassified.length === 0) {
    console.log('No hay obligaciones sin clasificación.');
    return;
  }
  console.log(`Encontradas ${unclassified.length} obligaciones sin clasificación.`);
  let updated = 0;
  for (const o of unclassified) {
    const m = mapping[o.provider_id];
    if (!m) continue;
    await prisma.obligations.update({
      where: { id: o.id },
      data: { cost_center_id: m.cc, sub_account_id: m.sa }
    });
    updated++;
  }
  console.log(`Actualizadas ${updated} obligaciones.`);
  // Verificar totales
  const remaining = await prisma.obligations.count({ where: { cost_center_id: null, projects: { company_id: companyId } } });
  console.log(`Restantes sin clasificación: ${remaining}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());