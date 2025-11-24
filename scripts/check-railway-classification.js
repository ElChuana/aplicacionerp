#!/usr/bin/env node
// Carga explícita de .env.local para usar DATABASE_URL de Railway
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Usando DATABASE_URL=', process.env.DATABASE_URL?.slice(0,60)+'...');
  for (const companyId of [1,2,3]) {
    const total = await prisma.obligations.count({ where: { projects: { company_id: companyId } } });
    const nulls = await prisma.obligations.count({ where: { projects: { company_id: companyId }, cost_center_id: null } });
    console.log(`Company ${companyId}: Total=${total}, Sin CC=${nulls}`);
  }
  const sample = await prisma.$queryRawUnsafe('SELECT id, provider_name, cost_center_id, cost_center_name, sub_account_id, sub_account_name FROM obligations_summary WHERE company_id=1 ORDER BY id LIMIT 10');
  console.log('Muestra vista company=1:');
  for (const r of sample) {
    console.log(`ID=${r.id} CC=${r.cost_center_id} ${r.cost_center_name} SA=${r.sub_account_id} ${r.sub_account_name}`);
  }
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });