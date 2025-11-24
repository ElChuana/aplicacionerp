import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// GET /api/uf/audit?year=2025
// Devuelve conteo por mes y fechas faltantes entre primer y último movimiento bancario del año.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Método no permitido' });
  }
  try {
    const year = Number(req.query.year) || new Date().getFullYear();
    const from = new Date(Date.UTC(year,0,1));
    const to = new Date(Date.UTC(year,11,31));

    // Conteo UF por mes
    const months: { mes: number; registros: number }[] = [];
    for (let m=0;m<12;m++) {
      const start = new Date(Date.UTC(year,m,1));
      const end = new Date(Date.UTC(year,m+1,0));
      const count = await prisma.uf_rates.count({ where: { date: { gte: start, lte: end } } });
      months.push({ mes: m+1, registros: count });
    }

    // Detectar fechas de movimientos sin UF
    const movements = await prisma.bank_movements.findMany({
      where: { bank_date: { gte: from, lte: to } },
      select: { bank_date: true },
    });
    const uniqueMovDates = Array.from(new Set(movements.map(m => {
      const d = m.bank_date;
      return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`;
    })));
    const ufRates = await prisma.uf_rates.findMany({ where: { date: { gte: from, lte: to } }, select: { date: true } });
    const ufKeys = new Set(ufRates.map(u => u.date.toISOString().slice(0,10)));
    const missing = uniqueMovDates.filter(k => !ufKeys.has(k));

    return res.status(200).json({ year, months, movimientosSinUF: missing.slice(0,200) });
  } catch (e) {
    console.error('Error audit UF:', e);
    return res.status(500).json({ message: 'Error audit UF' });
  }
}