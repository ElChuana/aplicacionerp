import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Carga .env (local) primero y luego .env.local para obtener ambos valores
const root = path.join(__dirname, '..');
const envLocalPath = path.join(root, '.env.local');
const envPath = path.join(root, '.env');
if (fs.existsSync(envPath)) dotenv.config({ path: envPath });
let railwayUrl: string | undefined;
if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, 'utf-8');
  // Buscar DATABASE_URL en .env.local
  const match = content.match(/DATABASE_URL="([^"]+)"/);
  if (match) railwayUrl = match[1];
}

const localUrl = process.env.DATABASE_URL; // asume apunta a local en .env
if (!localUrl) {
  console.error('❌ No se encontró DATABASE_URL local en .env');
  process.exit(1);
}
if (!railwayUrl) {
  console.error('❌ No se encontró DATABASE_URL remoto en .env.local');
  process.exit(1);
}

console.log('[UF MIGRATE] Local DB:', localUrl.slice(0,60)+'...');
console.log('[UF MIGRATE] Railway DB:', railwayUrl.slice(0,60)+'...');

const localPrisma = new PrismaClient({ datasources: { db: { url: localUrl } } });
const remotePrisma = new PrismaClient({ datasources: { db: { url: railwayUrl } } });

(async () => {
  try {
    console.log('[UF MIGRATE] Leyendo uf_rates locales...');
    const rows = await localPrisma.uf_rates.findMany({ orderBy: { date: 'asc' } });
    console.log(`[UF MIGRATE] ${rows.length} registros encontrados.`);

    let inserted = 0;
    for (const r of rows) {
      await remotePrisma.uf_rates.upsert({
        where: { date: r.date },
        create: { date: r.date, uf_value: r.uf_value },
        update: { uf_value: r.uf_value }
      });
      inserted++;
      if (inserted % 500 === 0) console.log(`[UF MIGRATE] Procesados ${inserted}`);
    }

    const remoteCount = await remotePrisma.uf_rates.count();
    console.log(`[UF MIGRATE] Migración completada. Total remoto ahora: ${remoteCount}`);
    process.exit(0);
  } catch (e) {
    console.error('[UF MIGRATE] Error en migración:', e);
    process.exit(1);
  } finally {
    await localPrisma.$disconnect();
    await remotePrisma.$disconnect();
  }
})();
