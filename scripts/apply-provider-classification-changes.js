#!/usr/bin/env node
/**
 * Script: apply-provider-classification-changes.js
 * Objetivo: Crear subcuentas nuevas y reclasificar obligaciones según requerimientos.
 * Fecha: 20-11-2025
 * Nota: Requiere DATABASE_URL configurada en el entorno.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = global.__prisma || new PrismaClient();
global.__prisma = prisma;

function fmt(n) {
  if (typeof n !== 'number') return n;
  return n.toLocaleString('es-CL'); // separador de miles
}

async function ensureSubAccount(costCenterId, code, name) {
  let sa = await prisma.sub_accounts.findFirst({ where: { cost_center_id: costCenterId, code } });
  if (!sa) {
    sa = await prisma.sub_accounts.create({ data: { cost_center_id: costCenterId, code, name } });
    console.log(`Creada subcuenta '${name}' (code=${code}) con ID=${sa.id}`);
  } else {
    console.log(`Subcuenta existente '${name}' (code=${code}) ID=${sa.id}`);
  }
  return sa.id;
}

async function main() {
  console.log('== Inicio aplicación de cambios de clasificación ==');

  // Pre conteos
  const targetProviders = [3, 9, 6, 13, 17];
  const preCounts = await prisma.obligations.groupBy({
    by: ['provider_id'],
    where: { provider_id: { in: targetProviders } },
    _count: { _all: true }
  });
  console.log('Conteos previos de obligaciones por proveedor:');
  preCounts.forEach(c => console.log(`  provider_id=${c.provider_id} -> ${fmt(c._count._all)} obligaciones`));

  // Merge subcuenta Comisión venta variable (119 -> 64)
  const sa119 = await prisma.sub_accounts.findUnique({ where: { id: 119 } });
  const sa64 = await prisma.sub_accounts.findUnique({ where: { id: 64 } });
  if (sa119 && sa64) {
    const moved = await prisma.obligations.updateMany({ data: { sub_account_id: 64 }, where: { sub_account_id: 119 } });
    console.log(`Merge subcuenta 119 -> 64: ${fmt(moved.count)} obligaciones actualizadas.`);
    const remaining119 = await prisma.obligations.count({ where: { sub_account_id: 119 } });
    if (remaining119 === 0) {
      console.log('Subcuenta 119 sin obligaciones. (Puedes eliminarla manualmente si deseas)');
    } else {
      console.log(`Subcuenta 119 aún tiene ${fmt(remaining119)} obligaciones (no eliminada).`);
    }
  } else {
    console.log('Subcuenta 119 o 64 no encontrada; se omite merge.');
  }

  // Crear subcuentas nuevas
  const seguridadId = await ensureSubAccount(5, 'seguridad', 'Seguridad');
  const postventaId = await ensureSubAccount(11, 'postventa', 'Postventa');
  const gastosBancariosId = await ensureSubAccount(5, 'gastos_bancarios', 'Gastos Bancarios');

  // Re-clasificaciones
  const updates = [];
  updates.push(await prisma.obligations.updateMany({ data: { cost_center_id: 8, sub_account_id: 64 }, where: { provider_id: 3 } })); // Capacitaciones Luis Felipe
  updates.push(await prisma.obligations.updateMany({ data: { cost_center_id: 5, sub_account_id: 39 }, where: { provider_id: 9 } })); // Kleber Home
  updates.push(await prisma.obligations.updateMany({ data: { cost_center_id: 11, sub_account_id: postventaId }, where: { provider_id: 6 } })); // S Y C Construcciones
  updates.push(await prisma.obligations.updateMany({ data: { cost_center_id: 5, sub_account_id: seguridadId }, where: { provider_id: 13 } })); // Tepille SPA
  updates.push(await prisma.obligations.updateMany({ data: { cost_center_id: 5, sub_account_id: gastosBancariosId }, where: { provider_id: 17 } })); // Banco Security

  console.log('Resumen re-clasificaciones (obligaciones afectadas por operación):');
  updates.forEach((u, idx) => console.log(`  Operación ${idx + 1}: ${fmt(u.count)} obligaciones`));

  // Post conteos
  const postCounts = await prisma.obligations.groupBy({
    by: ['provider_id'],
    where: { provider_id: { in: targetProviders } },
    _count: { _all: true }
  });
  console.log('Conteos posteriores de obligaciones por proveedor:');
  postCounts.forEach(c => console.log(`  provider_id=${c.provider_id} -> ${fmt(c._count._all)} obligaciones`));

  console.log('== Fin aplicación de cambios ==');
}

main()
  .catch(e => {
    console.error('Error en script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
