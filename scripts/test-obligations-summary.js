#!/usr/bin/env node
// Consulta rápida de la vista obligations_summary para validar clasificación
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const companyId = Number(process.argv[2] || 1);
  const rows = await prisma.$queryRawUnsafe(`SELECT id, provider_name, cost_center_id, cost_center_name, sub_account_id, sub_account_name FROM obligations_summary WHERE company_id=${companyId} ORDER BY id LIMIT 20`);
  for (const r of rows) {
    console.log(`ID=${r.id} | Prov=${r.provider_name} | CC=${r.cost_center_id} ${r.cost_center_name} | SA=${r.sub_account_id} ${r.sub_account_name}`);
  }
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });