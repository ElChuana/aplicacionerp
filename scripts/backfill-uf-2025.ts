import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

// Prioridad a .env.local (Railway) y luego .env
try {
  const root = path.join(__dirname, '..');
  const envLocal = path.join(root, '.env.local');
  if (fs.existsSync(envLocal)) dotenv.config({ path: envLocal });
  dotenv.config();
} catch {}

// Permitir override remoto vía flag --remote usando DATABASE_URL_RAILWAY
const useRemote = process.argv.includes('--remote');
let prisma: PrismaClient;
if (useRemote && process.env.DATABASE_URL_RAILWAY) {
  prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL_RAILWAY });
  console.log('🚚 Usando DATABASE_URL_RAILWAY para backfill UF');
} else {
  prisma = new PrismaClient();
  console.log('🏠 Usando DATABASE_URL por defecto para backfill UF');
}
const CMF_API_KEY = process.env.CMF_API_KEY;
const CMF_BASE_URL = 'https://api.cmfchile.cl/api-sbifv3/recursos_api/uf';

if (!CMF_API_KEY) {
  console.error('❌ Falta CMF_API_KEY en entorno');
  process.exit(1);
}

interface Inserted { date: string; value: number; }

async function fetchMonth(year: number, month: number) {
  // month: 1-12
  const start = new Date(year, month - 1, 1);
  let end = new Date(year, month, 0);
  const today = new Date();
  if (end > today) end = today; // recortar mes actual si es futuro.
  const toISO = (d: Date) => d.toISOString().slice(0, 10);

  // ✅ La API CMF para datos diarios del mes funciona con ruta /uf/{year}/{month}
  // El intento anterior usando fecha_inicio/fecha_fin devolvía sólo 1 registro.
  const monthStr = String(month).padStart(2, '0');
  const url = `${CMF_BASE_URL}/${year}/${monthStr}?apikey=${CMF_API_KEY}&formato=json`;
  console.log(`🔄 (monthly) UF ${year}-${monthStr} usando endpoint por mes: ${url}`);
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      console.warn(`⚠️ Error ${resp.status} al descargar mes ${month}`);
      return { month, inserted: 0, missing: true };
    }
    const json = await resp.json();
    const entries = json.UFs || json.UF || [];
    console.log(`   ↪️ claves JSON: ${Object.keys(json).join(', ')} | entries=${Array.isArray(entries) ? entries.length : 'N/A'}`);
    if (!Array.isArray(entries) || entries.length === 0) {
      console.warn(`⚠️ Sin datos UF para mes ${month}`);
      return { month, inserted: 0, empty: true };
    }
    let count = 0;
    for (const { Fecha, Valor } of entries) {
      if (!Fecha || !Valor) continue;
      // La API a veces entrega Fecha en formato DD-MM-YYYY y otras en YYYY-MM-DD.
      let date: Date;
      if (/^\d{2}-\d{2}-\d{4}$/.test(Fecha)) {
        const [dd, mm, yyyy] = Fecha.split('-');
        date = new Date(`${yyyy}-${mm}-${dd}T00:00:00Z`);
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(Fecha)) {
        date = new Date(`${Fecha}T00:00:00Z`);
      } else {
        date = new Date(Fecha);
      }
      if (isNaN(date.getTime())) {
        console.warn(`   ⚠️ Fecha inválida recibida: ${Fecha}`);
        continue;
      }
      const ufValue = parseFloat(Valor.replace(/\./g,'').replace(',','.'));
      if (!ufValue || isNaN(ufValue)) continue;
      await prisma.uf_rates.upsert({
        where: { date },
        create: { date, uf_value: ufValue },
        update: { uf_value: ufValue }
      });
      count++;
    }
    // Respetar la API (pequeña pausa)
    await new Promise(r=>setTimeout(r,400));
    return { month, inserted: count };
  } catch (e) {
    console.error(`❌ Error mes ${month}:`, e);
    return { month, inserted: 0, error: true };
  }
}

(async () => {
  const year = 2025;
  // Detectar meses con registros incompletos (< 25) para este año en la base destino
  const targetMonths: number[] = [];
  for (const m of [6,7,8,9,10,11]) {
    const startRange = new Date(Date.UTC(year, m-1, 1));
    const endRange = new Date(Date.UTC(year, m, 0));
    const count = await prisma.uf_rates.count({ where: { date: { gte: startRange, lte: endRange } } });
    if (count < 25) targetMonths.push(m);
  }
  console.log(`📝 Meses detectados con UF incompleta (<25 registros): ${targetMonths.join(', ') || 'ninguno'}`);
  if (targetMonths.length === 0) {
    console.log('✅ No hay meses incompletos; finalizando.');
    await prisma.$disconnect();
    process.exit(0);
  }
  console.log('🚀 Iniciando backfill UF meses faltantes 2025');
  try {
    const dbUrl = (useRemote ? process.env.DATABASE_URL_RAILWAY : process.env.DATABASE_URL) || '';
    let info = '';
    if (dbUrl) {
      try { const u = new URL(dbUrl); info = `${u.hostname}${u.port?':'+u.port:''}/${u.pathname.replace('/','')}`; } catch {}
    }
    console.log(`🔗 Base de datos destino: ${info || 'desconocida'}`);
  } catch {}
  const results = [] as any[];
  for (const m of targetMonths) {
    results.push(await fetchMonth(year, m));
  }
  // Auditoría posterior
  const audit = [] as any[];
  for (const m of targetMonths) {
    const start = new Date(year, m-1, 1);
    const end = new Date(year, m, 0);
    const count = await prisma.uf_rates.count({ where: { date: { gte: start, lte: end } } });
    audit.push({ mes: m, registros: count });
  }
  console.table(results);
  console.log('📊 Auditoría tras backfill:');
  console.table(audit);
  const totalYear = await prisma.uf_rates.count({ where: { date: { gte: new Date(year,0,1), lte: new Date(year,11,31) } } });
  console.log(`✅ Total UF año ${year} ahora: ${totalYear}`);
  await prisma.$disconnect();
  process.exit(0);
})();
