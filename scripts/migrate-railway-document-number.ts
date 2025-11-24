// Script para aplicar migración de document_number en Railway
// Ejecutar con: npx ts-node scripts/migrate-railway-document-number.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Aplicando migración de document_number en Railway...\n');
  
  try {
    // 1. Agregar columna document_number
    console.log('📝 Paso 1: Agregando columna document_number...');
    try {
      await prisma.$executeRaw`
        ALTER TABLE obligations ADD COLUMN document_number VARCHAR(100)
      `;
      console.log('✅ Columna document_number agregada exitosamente\n');
    } catch (error: any) {
      if (error.message?.includes('already exists') || error.message?.includes('duplicate column')) {
        console.log('⚠️  La columna document_number ya existe, continuando...\n');
      } else {
        throw error;
      }
    }
    
    // 2. Actualizar vista obligations_summary
    console.log('📝 Paso 2: Actualizando vista obligations_summary...');
    
    // Primero eliminar la vista
    await prisma.$executeRaw`DROP VIEW IF EXISTS obligations_summary`;
    console.log('   Vista anterior eliminada');
    
    // Crear vista actualizada
    await prisma.$executeRaw`
      CREATE VIEW obligations_summary AS
      SELECT
        o.id,
        o.project_id,
        pr.company_id,
        p.name   AS provider_name,
        pr.name  AS project_name,
        t.name   AS type_name,
        o.description,
        o.document_number,
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
        o.document_number,
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
    `;
    console.log('✅ Vista obligations_summary creada exitosamente\n');
    
    // 3. Verificar que la vista funciona
    console.log('📝 Paso 3: Verificando vista...');
    const testQuery = await prisma.$queryRaw<any[]>`
      SELECT COUNT(*) as count FROM obligations_summary
    `;
    console.log(`✅ Vista funciona correctamente (${testQuery[0].count} obligaciones)\n`);
    
    console.log('═'.repeat(80));
    console.log('✅ MIGRACIÓN COMPLETADA EXITOSAMENTE');
    console.log('═'.repeat(80));
    console.log('\n🎉 El endpoint /api/erp/obligations ahora funcionará correctamente\n');
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
