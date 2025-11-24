#!/usr/bin/env node
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  try {
    const result = await prisma.$queryRaw`SELECT DISTINCT pr.company_id, COUNT(*) as cnt 
      FROM obligations o JOIN projects pr ON o.project_id = pr.id 
      GROUP BY pr.company_id ORDER BY cnt DESC`;
    console.log('Obligaciones por compañía:');
    result.forEach(r => console.log(`  company_id=${r.company_id} => ${r.cnt} obligaciones`));
  } catch(e){
    console.error(e);
    process.exit(1);
  } finally { await prisma.$disconnect(); }
})();
