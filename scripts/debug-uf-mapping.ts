import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

// Usar number para simplicidad en debug (convertimos Decimal -> number)
type MovementLite = { id: bigint; bank_date: Date; debit: number | null; credit: number | null; };

try {
  const root = path.join(__dirname, '..');
  const envLocal = path.join(root, '.env.local');
  if (fs.existsSync(envLocal)) dotenv.config({ path: envLocal });
  dotenv.config();
} catch {}

const prisma = new PrismaClient();

(async () => {
  const companyId = Number(process.argv[2]);
  if (!companyId) {
    console.error('Uso: ts-node scripts/debug-uf-mapping.ts <companyId> [YYYY-MM]');
    process.exit(1);
  }
  const monthFilter = process.argv[3]; // opcional YYYY-MM
  let from: Date | undefined; let to: Date | undefined;
  if (monthFilter && /^\d{4}-\d{2}$/.test(monthFilter)) {
    const [y,m] = monthFilter.split('-').map(Number);
    from = new Date(Date.UTC(y, m-1, 1));
    to = new Date(Date.UTC(y, m, 0));
  }

  const where: any = { bank_accounts: { company_id: companyId } };
  if (from && to) where.bank_date = { gte: from, lte: to };

  const rawMovements = await prisma.bank_movements.findMany({
    where,
    select: { id: true, bank_date: true, debit: true, credit: true },
    orderBy: { bank_date: 'asc' }
  });
  const movements: MovementLite[] = rawMovements.map(m => ({
    id: m.id,
    bank_date: m.bank_date,
    debit: m.debit ? parseFloat(m.debit.toString()) : null,
    credit: m.credit ? parseFloat(m.credit.toString()) : null
  }));
  console.log(`Movimientos encontrados: ${movements.length}`);
  const dateKeys = movements.map(m => {
    const d = m.bank_date;
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`;
  });
  const unique = Array.from(new Set(dateKeys));
  console.log(`Fechas únicas movimientos: ${unique.length}`);
  const minKey = unique.reduce((a,b)=> a<b?a:b);
  const maxKey = unique.reduce((a,b)=> a>b?a:b);

  const ufRates = await prisma.uf_rates.findMany({
    where: { date: { gte: new Date(minKey+'T00:00:00Z'), lte: new Date(maxKey+'T00:00:00Z') } },
    orderBy: { date: 'asc' }
  });
  const ufMap = new Map(ufRates.map(u => {
    const d = u.date;
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`;
    return [key, u.uf_value];
  }));

  const missing = unique.filter(k => !ufMap.has(k));
  console.log(`UF total rango: ${ufRates.length}`);
  console.log(`Fechas sin UF: ${missing.length}`);
  if (missing.length) console.log('Primeras faltantes:', missing.slice(0,20));
  if (ufRates[0]) console.log('Primera UF:', ufRates[0].date.toISOString(), ufRates[0].uf_value.toString());

  await prisma.$disconnect();
})();
