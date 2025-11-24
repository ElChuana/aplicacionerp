#!/usr/bin/env node
/**
 * Fuerza la reclasificación de TODAS las obligaciones de cada proveedor según nuevo mapping
 * ignorando la clasificación previa (sobrescribe cost_center_id y sub_account_id).
 * Ejecutar: node scripts/force-reclassify-providers.js
 */
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function ensureSubAccount(costCenterId, code, name) {
  let sa = await prisma.sub_accounts.findFirst({ where: { cost_center_id: costCenterId, code } });
  if (!sa) {
    sa = await prisma.sub_accounts.create({ data: { cost_center_id: costCenterId, code, name } });
    console.log(`  [+] Creada subcuenta '${name}' (code='${code}', id=${sa.id}) en CC=${costCenterId}`);
  }
  return sa.id;
}

async function main() {
  console.log('DB=', (process.env.DATABASE_URL||'').slice(0,60)+'...');

  const CC = {
    ADMIN: 5,
    ESPECIALIDAD: 2,
    GASTOS_VENTAS: 8,
    GASTOS_FIN: 6,
    COSTO_CONSTRUCCION: 10,
    OTROS: 11,
  };

  const mapping = [
    { match: 'AGUAS', cc: CC.ADMIN, saCode: 'servicios-basicos', saName: 'Servicios Básicos' },
    { match: 'TACTIKA', cc: CC.GASTOS_VENTAS, saCode: 'gastos-venta-variable', saName: 'Gastos de venta variable' },
    { match: 'CENCOSUD', cc: CC.ADMIN, saCode: 'insumos', saName: 'Insumos' },
    { match: 'JURIDICO', cc: CC.ADMIN, saCode: 'gastos-legales', saName: 'Gastos legales' },
    { match: 'TRIBUTARIO', cc: CC.ADMIN, saCode: 'gastos-contables', saName: 'Gastos Contables' },
    { match: 'NUBOX', cc: CC.ADMIN, saCode: 'gastos-contables', saName: 'Gastos Contables' },
    { match: 'ORION', cc: CC.ADMIN, saCode: 'poliza-de-seguros', saName: 'Póliza de Seguros' },
    { match: 'ORSAN', cc: CC.ADMIN, saCode: 'poliza-de-seguros', saName: 'Póliza de Seguros' },
    { match: 'DISENO & ARQUITECTURA', cc: CC.ESPECIALIDAD, saCode: 'arquitectura', saName: 'Arquitectura' },
    { match: 'TEPILLE', cc: CC.ESPECIALIDAD, saCode: 'imprevistos', saName: 'Imprevistos' },
    { match: 'CONSTRUCTORA NUEVA RSA', cc: CC.COSTO_CONSTRUCCION, saCode: 'contrato-suma-alzada', saName: 'Contrato Suma alzada' },
    { match: 'S Y C CONSTRUCCIONES', cc: CC.COSTO_CONSTRUCCION, saCode: 'postventa', saName: 'Postventa' },
    { match: 'KLEBER HOME', cc: CC.ADMIN, saCode: 'gerenciamiento', saName: 'Gerenciamiento' },
    { match: 'FENIX', cc: CC.OTROS, saCode: 'otros', saName: 'Otros' },
    { match: 'SODIMAC', cc: CC.OTROS, saCode: 'otros', saName: 'Otros' },
    { match: 'BANCO INTERNACIONAL', cc: CC.GASTOS_FIN, saCode: 'ito-banco', saName: 'ITO Banco' },
    { match: 'BANCO SECURITY', cc: CC.ADMIN, saCode: 'gastos_bancarios', saName: 'Gastos Bancarios' },
    { match: 'PLAN OK S.A', cc: CC.GASTOS_VENTAS, saCode: 'plan-planok', saName: 'Plan PlanOK' },
    { match: 'GLOBAL ADVISORS', cc: CC.GASTOS_VENTAS, saCode: 'plan-planok', saName: 'Plan PlanOK' },
  ];

  const summary=[];
  for (const item of mapping) {
    const providers = await prisma.providers.findMany({ where: { name: { contains: item.match } }, select:{id:true,name:true} });
    if (!providers.length) {
      console.warn(`  [!] No hay proveedor para patrón '${item.match}'`);
      continue;
    }
    const saId = await ensureSubAccount(item.cc, item.saCode, item.saName);
    for (const prov of providers) {
      const updated = await prisma.obligations.updateMany({
        where: { provider_id: prov.id },
        data: { cost_center_id: item.cc, sub_account_id: saId }
      });
      summary.push({ provider: prov.name, id: prov.id, affected: updated.count, cc:item.cc, sa: saId });
    }
  }

  console.log('\nResumen fuerza reclasificación:');
  summary.forEach(s=> console.log(`  Prov ${s.id} (${s.provider}) -> ${s.affected} obligaciones (CC=${s.cc}, SA=${s.sa})`));
  const classified = await prisma.obligations.count({ where:{ cost_center_id:{not:null}, sub_account_id:{not:null} } });
  const total = await prisma.obligations.count();
  console.log(`\nClasificación final: ${classified} de ${total} (${((classified/total)*100).toFixed(2)}%)`);
  await prisma.$disconnect();
}

main().catch(e=>{console.error(e);process.exit(1);});