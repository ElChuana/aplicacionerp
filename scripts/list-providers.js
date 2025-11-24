#!/usr/bin/env node
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const provs = await prisma.providers.findMany({ select: { id:true, name:true, rut:true } });
  console.table(provs);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });