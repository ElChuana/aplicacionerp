#!/usr/bin/env node
/**
 * Script: apply-all-changes-to-railway.js
 * Objetivo: Aplicar todos los cambios de clasificación a la base de datos de Railway.
 * Ejecuta: 1) Recrear vista, 2) Clasificar obligaciones
 */
// Forzar carga de .env.local para asegurar uso de Railway (Next.js la carga automáticamente, Node no)
try { require('dotenv').config({ path: '.env.local' }); } catch (e) { /* ignore */ }
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function fmt(n){return Number(n).toLocaleString('es-CL');}

// Mapeo de clasificación
const mapping = {
  1:  { cc:8, sa:62 },      // Plan ok
  2:  { cc:5, sa:35 },      // Aguas Andinas  
  3:  { cc:8, sa:64 },      // Capacitaciones Luis Felipe (ya aplicado antes)
  4:  { cc:5, sa:132 },     // Estudio Jurídico V.H.V.R.
  5:  { cc:5, sa:41 },      // Estudio Tributario
  6:  { cc:11, sa:140 },    // S Y C Construcciones -> Postventa
  7:  { cc:2, sa:12 },      // Diseño & Arquitectura
  8:  { cc:11, sa:122 },    // Constructora Nueva RSA
  9:  { cc:5, sa:39 },      // Kleber Home (ya aplicado antes)
  10: { cc:11, sa:123 },    // Sociedad Comercial Fenix
  11: { cc:5, sa:45 },      // Orsan Seguros
  12: { cc:8, sa:62 },      // Plan OK S.A.
  13: { cc:5, sa:139 },     // Tepille SPA -> Seguridad (ya aplicado antes)
  14: { cc:5, sa:45 },      // Orion Seguros
  15: { cc:6, sa:51 },      // Banco Internacional
  16: { cc:5, sa:41 },      // Nubox
  17: { cc:5, sa:141 },     // Banco Security -> Gastos Bancarios (ya aplicado antes)
  18: { cc:5, sa:47 },      // Cencosud
  19: { cc:11, sa:123 },    // Sodimac
};

(async () => {
  try {
    console.log('Conectando a DATABASE_URL:', (process.env.DATABASE_URL||'').slice(0,70)+'...');
    const preNulls = await prisma.obligations.count({ where: { cost_center_id: null } });
    console.log(`Obligaciones sin clasificar antes: ${fmt(preNulls)}`);
    console.log('=== PASO 1: Recrear vista obligations_summary ===');
    
    await prisma.$executeRawUnsafe('DROP VIEW IF EXISTS obligations_summary');
    console.log('✓ Vista anterior eliminada');
    
    await prisma.$executeRawUnsafe(`
CREATE VIEW obligations_summary AS
SELECT
  o.id,
  o.project_id,
  pr.company_id,
  p.name   AS provider_name,
  pr.name  AS project_name,
  t.name   AS type_name,
  o.description,
  o.amount_original,
  o.currency,
  o.start_date,
  o.due_date,
  COALESCE(SUM(mm.matched_amount), 0) AS paid_amount,
  (COALESCE(SUM(dd.total_amount), 0) + COALESCE(SUM(icn.amount), 0)) AS credit_notes_total,
  (o.amount_original - COALESCE(SUM(mm.matched_amount), 0) - COALESCE(SUM(dd.total_amount), 0) - COALESCE(SUM(icn.amount), 0)) AS balance,
  CASE
    WHEN (o.amount_original - COALESCE(SUM(mm.matched_amount), 0) - COALESCE(SUM(dd.total_amount), 0) - COALESCE(SUM(icn.amount), 0)) <= 0 THEN 'pagada'
    WHEN o.due_date < CURRENT_DATE THEN 'vencida'
    ELSE 'pendiente'
  END AS status,
  o.cost_center_id,
  cc.name AS cost_center_name,
  o.sub_account_id,
  sa.code AS sub_account_code,
  sa.name AS sub_account_name,
  o.created_at
FROM obligations o
  JOIN projects pr           ON o.project_id = pr.id
  JOIN providers p           ON o.provider_id = p.id
  JOIN obligation_types t    ON o.type_id = t.id
  LEFT JOIN movement_matches mm ON o.id = mm.obligation_id
  LEFT JOIN dte_documents dd ON dd.obligation_id = o.id AND dd.type = 'NOTA_CREDITO'
  LEFT JOIN internal_credit_notes icn ON o.id = icn.obligation_id
  LEFT JOIN cost_centers cc ON o.cost_center_id = cc.id
  LEFT JOIN sub_accounts sa ON o.sub_account_id = sa.id
GROUP BY
  o.id,
  o.project_id,
  pr.company_id,
  p.name,
  pr.name,
  t.name,
  o.description,
  o.amount_original,
  o.currency,
  o.start_date,
  o.due_date,
  o.cost_center_id,
  cc.name,
  o.sub_account_id,
  sa.code,
  sa.name,
  o.created_at
    `);
    console.log('✓ Vista obligations_summary recreada con campos de clasificación');

    console.log('\n=== PASO 2: Crear subcuentas nuevas si no existen ===');
    
    // Verificar y crear Seguridad
    const seguridad = await prisma.sub_accounts.findFirst({ where: { cost_center_id: 5, code: 'seguridad' } });
    let seguridadId = seguridad?.id;
    if (!seguridadId) {
      const created = await prisma.sub_accounts.create({ data: { cost_center_id: 5, code: 'seguridad', name: 'Seguridad' } });
      seguridadId = created.id;
      console.log(`✓ Creada subcuenta Seguridad (ID: ${seguridadId})`);
    } else {
      console.log(`✓ Subcuenta Seguridad ya existe (ID: ${seguridadId})`);
    }

    // Verificar y crear Postventa
    const postventa = await prisma.sub_accounts.findFirst({ where: { cost_center_id: 11, code: 'postventa' } });
    let postventaId = postventa?.id;
    if (!postventaId) {
      const created = await prisma.sub_accounts.create({ data: { cost_center_id: 11, code: 'postventa', name: 'Postventa' } });
      postventaId = created.id;
      console.log(`✓ Creada subcuenta Postventa (ID: ${postventaId})`);
    } else {
      console.log(`✓ Subcuenta Postventa ya existe (ID: ${postventaId})`);
    }

    // Verificar y crear Gastos Bancarios
    const gastosBancarios = await prisma.sub_accounts.findFirst({ where: { cost_center_id: 5, code: 'gastos_bancarios' } });
    let gastosBancariosId = gastosBancarios?.id;
    if (!gastosBancariosId) {
      const created = await prisma.sub_accounts.create({ data: { cost_center_id: 5, code: 'gastos_bancarios', name: 'Gastos Bancarios' } });
      gastosBancariosId = created.id;
      console.log(`✓ Creada subcuenta Gastos Bancarios (ID: ${gastosBancariosId})`);
    } else {
      console.log(`✓ Subcuenta Gastos Bancarios ya existe (ID: ${gastosBancariosId})`);
    }

    // Actualizar mapeo con IDs reales
    mapping[6].sa = postventaId;
    mapping[13].sa = seguridadId;
    mapping[17].sa = gastosBancariosId;

    console.log('\n=== PASO 3: Merge subcuentas duplicadas Comisión venta variable ===');
    const sa64 = await prisma.sub_accounts.findUnique({ where: { id: 64 } });
    const sa119 = await prisma.sub_accounts.findUnique({ where: { id: 119 } });
    
    if (sa64 && sa119) {
      const moved = await prisma.obligations.updateMany({ 
        data: { sub_account_id: 64 }, 
        where: { sub_account_id: 119 } 
      });
      console.log(`✓ Merge 119 → 64: ${fmt(moved.count)} obligaciones actualizadas`);
    } else {
      console.log('⚠ Subcuentas 64 o 119 no encontradas, saltando merge');
    }

    console.log('\n=== PASO 4: Clasificar obligaciones por proveedor ===');
    const updatesSummary = [];
    
    for (const [providerIdStr, vals] of Object.entries(mapping)) {
      const providerId = Number(providerIdStr);
      const result = await prisma.obligations.updateMany({
        data: { cost_center_id: vals.cc, sub_account_id: vals.sa },
        where: { 
          provider_id: providerId,
          cost_center_id: null
        }
      });
      if (result.count > 0) {
        updatesSummary.push({ providerId, count: result.count, cc: vals.cc, sa: vals.sa });
      }
    }

    console.log('\nActualizaciones realizadas por proveedor:');
    if (!updatesSummary.length) {
      console.log('  (No se actualizaron obligaciones)');
    } else {
      updatesSummary.forEach(u => {
        console.log(`  Proveedor ${u.providerId} => ${fmt(u.count)} obligaciones (CC=${u.cc}, SA=${u.sa})`);
      });
    }

    console.log('\n=== PASO 5: Verificación final ===');
    const totalClassified = await prisma.obligations.count({ 
      where:{ 
        cost_center_id:{ not: null }, 
        sub_account_id:{ not: null } 
      } 
    });
    const total = await prisma.obligations.count();
    
    console.log(`✅ Clasificadas: ${fmt(totalClassified)} de ${fmt(total)} (${(totalClassified/total*100).toFixed(2)}%)`);
    
  } catch(e){
    console.error('❌ Error en aplicación de cambios:', e.message);
    process.exit(1);
  } finally { 
    await prisma.$disconnect(); 
  }
})();
