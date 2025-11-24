#!/usr/bin/env node
/**
 * Script: classify-remaining-obligations.js
 * Objetivo: Asignar centro de costo y subcuenta a obligaciones que aún no tienen clasificación.
 * Regla: usar mapeo sugerido estático según clasificacion_proveedores_sugerida.sql.
 * Sólo aplica donde cost_center_id y sub_account_id son NULL.
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
function fmt(n){return Number(n).toLocaleString('es-CL');}

// Mapeo sugerido (proveedor_id -> { cost_center_id, sub_account_id })
const mapping = {
  2:  { cc:5, sa:35 },      // Aguas Andinas
  15: { cc:6, sa:51 },      // Banco Internacional
  18: { cc:5, sa:47 },      // Cencosud
  8:  { cc:11, sa:122 },    // Constructora Nueva RSA
  7:  { cc:2, sa:12 },      // Diseño & Arquitectura
  4:  { cc:5, sa:132 },     // Estudio Jurídico V.H.V.R.
  5:  { cc:5, sa:41 },      // Estudio Tributario
  16: { cc:5, sa:41 },      // Nubox
  14: { cc:5, sa:45 },      // Orion Seguros
  11: { cc:5, sa:45 },      // Orsan Seguros
  12: { cc:8, sa:62 },      // Plan OK S.A.
  1:  { cc:8, sa:62 },      // Plan ok (duplicado)
  10: { cc:11, sa:123 },    // Sociedad Comercial Fenix
  19: { cc:11, sa:123 },    // Sodimac
  // Ya clasificados previamente: 3,6,9,13,17
};

(async () => {
  try {
    const updatesSummary = [];
    for (const [providerIdStr, vals] of Object.entries(mapping)) {
      const providerId = Number(providerIdStr);
      // Aplicar sólo a obligaciones sin clasificación
      const result = await prisma.obligations.updateMany({
        data: { cost_center_id: vals.cc, sub_account_id: vals.sa },
        where: { provider_id: providerId, cost_center_id: null, sub_account_id: null }
      });
      if (result.count > 0) {
        updatesSummary.push({ providerId, count: result.count, cc: vals.cc, sa: vals.sa });
      }
    }

    // Totales después
    const totalClassified = await prisma.obligations.count({ where:{ cost_center_id:{ not: null }, sub_account_id:{ not: null } } });
    const total = await prisma.obligations.count();

    console.log('Actualizaciones realizadas:');
    if (!updatesSummary.length) console.log('  No se actualizaron obligaciones (posiblemente ya estaban clasificadas).');
    updatesSummary.forEach(u => {
      console.log(`  Proveedor ${u.providerId} => ${fmt(u.count)} obligaciones asignadas (CC=${u.cc}, SA=${u.sa})`);
    });
    console.log(`\nClasificadas con ambos campos tras ejecución: ${fmt(totalClassified)} de ${fmt(total)} ( ${(totalClassified/total*100).toFixed(2)}% )`);
  } catch(e){
    console.error('Error en clasificación restante:', e);
    process.exit(1);
  } finally { await prisma.$disconnect(); }
})();
