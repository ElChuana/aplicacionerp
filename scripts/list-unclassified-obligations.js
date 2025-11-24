#!/usr/bin/env node
/**
 * Script: list-unclassified-obligations.js
 * Objetivo: Mostrar proveedores y conteo de obligaciones sin centro de costo y subcuenta.
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
function fmt(n){return Number(n).toLocaleString('es-CL');}
(async () => {
  try {
    const rows = await prisma.$queryRaw`SELECT p.id, p.name, COUNT(*) AS cnt
      FROM obligations o
      JOIN providers p ON p.id = o.provider_id
      WHERE o.cost_center_id IS NULL AND o.sub_account_id IS NULL
      GROUP BY p.id, p.name
      ORDER BY cnt DESC`;
    console.log('Proveedores con obligaciones sin clasificar:');
    rows.forEach(r => console.log(`[${r.id}] ${r.name} => ${fmt(r.cnt)} obligaciones`));
  } catch(e){
    console.error(e);
    process.exit(1);
  } finally { await prisma.$disconnect(); }
})();
