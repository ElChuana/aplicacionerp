// Script para leer proveedores y sugerir clasificación
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('\n📋 PROVEEDORES ACTUALES:\n');
  const providers = await prisma.providers.findMany({
    orderBy: { name: 'asc' }
  });
  
  providers.forEach((p, i) => {
    console.log(`${i + 1}. ID: ${p.id} | ${p.name} | RUT: ${p.rut || 'N/A'}`);
  });

  console.log('\n\n🏢 CENTROS DE COSTO DISPONIBLES:\n');
  const costCenters = await prisma.cost_centers.findMany({
    orderBy: { name: 'asc' }
  });
  
  for (const cc of costCenters) {
    console.log(`\n📊 ${cc.id}. ${cc.name}`);
    const subs = await prisma.sub_accounts.findMany({
      where: { cost_center_id: cc.id },
      orderBy: { code: 'asc' }
    });
    subs.forEach(s => {
      console.log(`   └─ ${s.id}. ${s.code} - ${s.name}`);
    });
  }

  await prisma.$disconnect();
}

main().catch(console.error);
