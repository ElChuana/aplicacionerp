#!/usr/bin/env node
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  try {
    const samples = await prisma.obligations.findMany({ take: 5, select: { id: true, cost_center_id: true, sub_account_id: true } });
    console.log('Muestra de obligaciones con clasificación:');
    samples.forEach(o => console.log(`  ID=${o.id}, CC=${o.cost_center_id}, SA=${o.sub_account_id}`));
    
    const withClass = await prisma.obligations.count({ where: { cost_center_id: { not: null }, sub_account_id: { not: null } } });
    const total = await prisma.obligations.count();
    console.log(`\nTotal con clasificación: ${withClass} de ${total}`);
  } catch(e){
    console.error(e);
    process.exit(1);
  } finally { await prisma.$disconnect(); }
})();
