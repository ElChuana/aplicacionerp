#!/usr/bin/env node
/**
 * Script: check-obligations-classification.js
 * Objetivo: Resumen de cuántas obligaciones tienen centro de costo y subcuenta asignados.
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function fmt(n){return n.toLocaleString('es-CL');}

(async () => {
  try {
    const total = await prisma.obligations.count();
    const withBoth = await prisma.obligations.count({ where:{ cost_center_id: { not: null }, sub_account_id:{ not: null } } });
    const onlyCC = await prisma.obligations.count({ where:{ cost_center_id:{ not: null }, sub_account_id: null } });
    const onlySA = await prisma.obligations.count({ where:{ cost_center_id: null, sub_account_id:{ not: null } } });
    const none = await prisma.obligations.count({ where:{ cost_center_id: null, sub_account_id: null } });

    // Top 10 proveedores por cantidad de obligaciones clasificadas
    const topProviders = await prisma.$queryRaw`SELECT p.id, p.name, COUNT(*) AS cnt
      FROM obligations o
      JOIN providers p ON p.id = o.provider_id
      WHERE o.cost_center_id IS NOT NULL AND o.sub_account_id IS NOT NULL
      GROUP BY p.id, p.name
      ORDER BY cnt DESC
      LIMIT 10`;

    console.log('Resumen clasificación de obligaciones:');
    console.log(`Total obligaciones: ${fmt(total)}`);
    console.log(`Con centro de costo y subcuenta: ${fmt(withBoth)}`);
    console.log(`Solo centro de costo: ${fmt(onlyCC)}`);
    console.log(`Solo subcuenta: ${fmt(onlySA)}`);
    console.log(`Sin clasificación: ${fmt(none)}`);
    console.log('\nTop 10 proveedores clasificados:');
    topProviders.forEach(r => console.log(`  [${r.id}] ${r.name} => ${fmt(Number(r.cnt))}`));
  } catch (e) {
    console.error('Error en verificación:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
