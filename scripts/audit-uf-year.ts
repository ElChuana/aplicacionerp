import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

try {
  const root = path.join(__dirname, '..');
  const envLocal = path.join(root, '.env.local');
  if (fs.existsSync(envLocal)) dotenv.config({ path: envLocal });
  dotenv.config();
} catch {}

const year = Number(process.argv[2]) || new Date().getFullYear();
const prisma = new PrismaClient();

(async () => {
  const months: { mes: number; registros: number }[] = [];
  for (let m=0;m<12;m++){ 
    const start = new Date(Date.UTC(year,m,1));
    const end = new Date(Date.UTC(year,m+1,0));
    const count = await prisma.uf_rates.count({ where: { date: { gte: start, lte: end } } });
    months.push({ mes: m+1, registros: count });
  }
  console.table(months);
  await prisma.$disconnect();
})();
