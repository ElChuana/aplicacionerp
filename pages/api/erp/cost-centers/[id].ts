// File: pages/api/erp/cost-centers/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

type ErrorResponse = { error: string };

type SubAgg = { name: string; totalCLP: number; totalUF: number };
type MovementAgg = {
  id: string;
  bank_date: string;
  description: string;
  amount: number;
  amountUF: number;
};

type DetailResponse = {
  subAccounts: SubAgg[];
  movements: MovementAgg[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DetailResponse | ErrorResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { id, company } = req.query;
  const centerId = Array.isArray(id) ? Number(id[0]) : Number(id);
  const companyId = Array.isArray(company) ? Number(company[0]) : Number(company);
  if (isNaN(centerId) || isNaN(companyId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    // Movimientos asignados a este centro de costo
    const movements = await prisma.bank_movements.findMany({
      where: {
        bank_accounts: { company_id: companyId },
        sub_accounts: { cost_centers: { id: centerId } }
      },
      select: {
        id: true,
        bank_date: true,
        description: true,
        debit: true,
        credit: true,
        sub_account_id: true
      },
      orderBy: { bank_date: 'desc' }
    });

    // Obtener UF rates for movement dates
    const dates = Array.from(new Set(movements.map(m => m.bank_date.toISOString().slice(0,10))));
    const ufRates = await prisma.uf_rates.findMany({
      where: { date: { in: dates.map(d=>new Date(d)) } }
    });
    const ufMap = new Map(ufRates.map(u=>[u.date.toISOString().slice(0,10), parseFloat(u.uf_value.toString())]));

    // Agregación de subcuentas
    const subs = await prisma.sub_accounts.findMany({
      where: { cost_center_id: centerId },
      select: { id: true, name: true }
    });

    const subMap = new Map<number, { totalCLP: number; totalUF: number }>();
    subs.forEach(s=> subMap.set(s.id,{ totalCLP:0, totalUF:0 }));

    const movAgg: MovementAgg[] = movements.map(m=>{
      const debit = m.debit ? parseFloat(m.debit.toString()) : 0;
      const credit = m.credit ? parseFloat(m.credit.toString()) : 0;
      const amount = debit - credit;
      const dateKey = m.bank_date.toISOString().slice(0,10);
      const rate = ufMap.get(dateKey) || 1;
      const amountUF = amount / rate;
      // agregar a subcuenta
      const subId = m.sub_account_id;
      if (typeof subId === 'number' && subMap.has(subId)) {
        const cur = subMap.get(subId)!;
        cur.totalCLP += amount;
        cur.totalUF += amountUF;
      }
      return {
        id: m.id.toString(),
        bank_date: dateKey,
        description: m.description || '',
        amount,
        amountUF
      };
    });

    const subAccounts: SubAgg[] = subs.map(s=>{
      const agg = subMap.get(s.id)!;
      return { name: s.name, totalCLP: agg.totalCLP, totalUF: agg.totalUF };
    });

    return res.status(200).json({ subAccounts, movements: movAgg });
  } catch(error:any) {
    console.error('GET /api/cost-centers/[id] error:',error);
    return res.status(500).json({ error: 'Error interno del servidor'});
  }
}
