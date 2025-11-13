// File: pages/api/erp/cost-centers/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export interface CostCenterAgg {
  id: number;
  code: string;
  name: string;
  totalCLP: number;
  totalUF: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CostCenterAgg[] | { error: string }>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const companyRaw = req.query.company;
    const companyId = Array.isArray(companyRaw)
      ? Number(companyRaw[0])
      : Number(companyRaw);
    if (isNaN(companyId)) {
      return res.status(400).json({ error: 'Parámetro company inválido' });
    }

    // Obtener todos los centros de costo
    const allCostCenters = await prisma.cost_centers.findMany({
      orderBy: { id: 'asc' }
    });

    // Inicializar mapa con todos los centros en 0
    const aggMap = new Map<number, CostCenterAgg>();
    for (const cc of allCostCenters) {
      aggMap.set(cc.id, {
        id: cc.id,
        code: cc.code,
        name: cc.name,
        totalCLP: 0,
        totalUF: 0
      });
    }

    // Obtener movimientos vinculados a la empresa
    const movements = await prisma.bank_movements.findMany({
      where: { bank_accounts: { company_id: companyId } },
      include: {
        sub_accounts: {
          include: { cost_centers: true },
        },
        bank_accounts: { select: { bank_name: true, account_no: true } },
      },
    });

    // Cargar UF rates únicos
    const dates = Array.from(
      new Set(movements.map(m => m.bank_date.toISOString().slice(0, 10)))
    );
    const dateObjs = dates.map(d => new Date(d));
    const ufRates = await prisma.uf_rates.findMany({
      where: { date: { in: dateObjs } },
    });
    const ufMap = new Map(
      ufRates.map(u => [u.date.toISOString().slice(0, 10), parseFloat(u.uf_value.toString())])
    );

    // Agregar movimientos a los centros correspondientes
    for (const m of movements) {
      const sa = m.sub_accounts;
      if (!sa) continue; // sin subcuenta asignada
      const cc = sa.cost_centers;
      if (!cc) continue; // sin centro de costo
      
      const agg = aggMap.get(cc.id);
      if (!agg) continue; // centro no existe (no debería pasar)
      
      // Determinar monto neto (abono positivo, cargo negativo)
      const amountCLP =
        m.debit != null ? m.debit : m.credit != null ? -m.credit : 0;
      agg.totalCLP += Number(amountCLP);
      // Calcular UF
      const dateKey = m.bank_date.toISOString().slice(0, 10);
      const ufVal = ufMap.get(dateKey) ?? 1;
      agg.totalUF += Number(amountCLP) / ufVal;
    }

    return res.status(200).json(Array.from(aggMap.values()));
  } catch (error: any) {
    console.error('Error en /api/cost-centers:', error);
    return res.status(500).json({ error: 'Error interno al obtener centros de costo' });
  }
}
