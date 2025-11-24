#!/usr/bin/env node
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const centers = await prisma.cost_centers.findMany({ select: { id: true, name: true } });
  console.table(centers);
  const subs = await prisma.sub_accounts.findMany({ select: { id: true, cost_center_id: true, code: true, name: true } });
  console.table(subs.slice(0, 50));
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });