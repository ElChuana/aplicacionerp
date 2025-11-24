#!/usr/bin/env node
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const subs = await prisma.sub_accounts.findMany({ skip: 50, take: 150, select: { id:true, cost_center_id:true, code:true, name:true } });
  console.table(subs);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });