#!/usr/bin/env node
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const countOld = await prisma.obligations.count({ where: { sub_account_id: 46 } });
  console.log('Obligaciones con subcuenta Post Venta (id=46):', countOld);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });