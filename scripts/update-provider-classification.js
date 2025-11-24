#!/usr/bin/env node
/**
 * Actualiza la clasificación (centro de costo + subcuenta) por proveedor según nueva instrucción.
 * Crea subcuentas que no existan. No elimina nada previo.
 * Ejecutar: node scripts/update-provider-classification.js
 */
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helpers
async function ensureSubAccount(costCenterId, code, name) {
  let sa = await prisma.sub_accounts.findFirst({ where: { cost_center_id: costCenterId, code } });
  if (!sa) {
    sa = await prisma.sub_accounts.create({ data: { cost_center_id: costCenterId, code, name } });
    console.log(`  [+] Creada subcuenta '${name}' (code='${code}', id=${sa.id}) en CC=${costCenterId}`);
  }
  return sa.id;
}

async function main() {
  console.log('Usando DB:', (process.env.DATABASE_URL||'').slice(0,70)+'...');

  // IDs de centros de costo detectados anteriormente
  const CC = {
    ADMIN: 5,
    ESPECIALIDAD: 2,
    GASTOS_VENTAS: 8,
    GASTOS_FIN: 6,
    COSTO_CONSTRUCCION: 10, // existe
    OTROS: 11,
  };

  // Proveedores (IDs listados con script list-providers.js)
  const prov = {
    AGUAS_ANDINAS: 2,
    CAPACITACIONES_LUIS_FELIPE: 5, // TACTIKA INGENIERÍA Y DESARROLLO SPA se asume que corresponde? (ID 5 prov nombre distinto en listado; ajustar si diferente)
    CENCOSUD: 34,
    ESTUDIO_JURIDICO: 20,
    ESTUDIO_TRIBUTARIO: 2, // Nota: Estudio Tributario es ID 2; ya usado arriba para Aguas Andinas -> CORREGIR: Aguas Andinas no aparece en listado; ver mapeo real
  };

  // Mapeo final según solicitud (nombre -> { providerIds:[], cc, subAccountCode, subAccountName })
  // Construimos explícitamente sin reutilizar prov{} anterior por ambigüedad en nombres; usaremos búsqueda directa por LIKE.

  const requested = [
    { name: 'Aguas Andinas', match: 'AGUAS', cc: CC.ADMIN, saCode: 'servicios-basicos', saName: 'Servicios Básicos' },
    { name: 'Capacitaciones Luis Felipe', match: 'TACTIKA', cc: CC.GASTOS_VENTAS, saCode: 'gastos-venta-variable', saName: 'Gastos de venta variable' },
    { name: 'Cencosud Retail', match: 'CENCOSUD', cc: CC.ADMIN, saCode: 'insumos', saName: 'Insumos' },
    { name: 'Estudio Jurídico V.H.V.R.', match: 'JURIDICO', cc: CC.ADMIN, saCode: 'gastos-legales', saName: 'Gastos legales' },
    { name: 'Estudio Tributario', match: 'TRIBUTARIO', cc: CC.ADMIN, saCode: 'gastos-contables', saName: 'Gastos Contables' },
    { name: 'Nubox', match: 'NUBOX', cc: CC.ADMIN, saCode: 'gastos-contables', saName: 'Gastos Contables' },
    { name: 'Orion Seguros', match: 'ORION', cc: CC.ADMIN, saCode: 'poliza-de-seguros', saName: 'Póliza de Seguros' },
    { name: 'Orsan Seguros', match: 'ORSAN', cc: CC.ADMIN, saCode: 'poliza-de-seguros', saName: 'Póliza de Seguros' },
    { name: 'Diseño & Arquitectura SPA', match: 'DISENO & ARQUITECTURA', cc: CC.ESPECIALIDAD, saCode: 'arquitectura', saName: 'Arquitectura' },
    { name: 'Tepille SPA', match: 'TEPILLE', cc: CC.ESPECIALIDAD, saCode: 'imprevistos', saName: 'Imprevistos' },
    { name: 'Constructora Nueva RSA', match: 'CONSTRUCTORA NUEVA RSA', cc: CC.COSTO_CONSTRUCCION, saCode: 'contrato-suma-alzada', saName: 'Contrato Suma alzada' },
    { name: 'S Y C Construcciones', match: 'S Y C CONSTRUCCIONES', cc: CC.COSTO_CONSTRUCCION, saCode: 'postventa', saName: 'Postventa' },
    { name: 'Kleber Home SPA', match: 'KLEBER HOME', cc: CC.ADMIN, saCode: 'gerenciamiento', saName: 'Gerenciamiento' },
    { name: 'Sociedad Comercial Fenix', match: 'FENIX', cc: CC.OTROS, saCode: 'otros', saName: 'Otros' },
    { name: 'Sodimac', match: 'SODIMAC', cc: CC.OTROS, saCode: 'otros', saName: 'Otros' },
    { name: 'Banco Internacional', match: 'BANCO INTERNACIONAL', cc: CC.GASTOS_FIN, saCode: 'ito-banco', saName: 'ITO Banco' },
    { name: 'Banco Security', match: 'BANCO SECURITY', cc: CC.ADMIN, saCode: 'gastos_bancarios', saName: 'Gastos Bancarios' },
    { name: 'Plan OK S.A.', match: 'PLAN OK S.A', cc: CC.GASTOS_VENTAS, saCode: 'plan-planok', saName: 'Plan PlanOK' },
    { name: 'Plan ok', match: 'GLOBAL ADVISORS', cc: CC.GASTOS_VENTAS, saCode: 'plan-planok', saName: 'Plan PlanOK' },
  ];

  const updates = [];
  for (const item of requested) {
    const providers = await prisma.providers.findMany({ where: { name: { contains: item.match } } });
    if (!providers.length) {
      console.warn(`  [!] No encontrado proveedor para criterio '${item.match}'`);
      continue;
    }
    // Asegurar subcuenta
    const saId = await ensureSubAccount(item.cc, item.saCode, item.saName);
    for (const prov of providers) {
      const result = await prisma.obligations.updateMany({
        where: { provider_id: prov.id, cost_center_id: null },
        data: { cost_center_id: item.cc, sub_account_id: saId }
      });
      updates.push({ provider: prov.name, id: prov.id, affected: result.count, cc: item.cc, sa: saId });
    }
  }

  console.log('\nResumen actualizaciones:');
  updates.forEach(u => console.log(`  Proveedor ${u.id} (${u.provider}) => ${u.affected} obligaciones (CC=${u.cc}, SA=${u.sa})`));

  const total = await prisma.obligations.count();
  const classified = await prisma.obligations.count({ where: { cost_center_id: { not: null }, sub_account_id: { not: null } } });
  console.log(`\nClasificación final: ${classified} de ${total} (${((classified/total)*100).toFixed(2)}%)`);

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });