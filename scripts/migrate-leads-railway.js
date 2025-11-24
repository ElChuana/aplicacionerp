#!/usr/bin/env node
/**
 * Script: migrate-leads-railway.js
 * Objetivo: Aplicar migración de Leads en Railway ejecutando SQL idempotente.
 * Uso: DATABASE_URL debe apuntar a la base de Railway.
 * Nota: Correr ANTES de usar los endpoints /api/crm/leads.
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sqlPath = path.join(__dirname, '..', 'prisma', 'migration_leads.sql');
  if (!fs.existsSync(sqlPath)) {
    throw new Error('Archivo migration_leads.sql no encontrado');
  }
  const sql = fs.readFileSync(sqlPath, 'utf8');
  console.log('== Aplicando migración Leads ==');
  await prisma.$executeRawUnsafe(sql);
  console.log('✅ Migración Leads aplicada correctamente');
}

main()
  .catch(e => { console.error('❌ Error migrando Leads:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
