// File: pages/api/erp/cost-centers/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export interface CostCenterAgg {
  id: number;
  code: string;
  name: string;
  totalCLP: number; // Suma de amount_original en CLP
  totalUF: number;  // Suma de amount_original en UF
  obligationsCount: number; // Número de obligaciones clasificadas en este centro
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

    // Obtener última UF disponible
    const uf = await prisma.uf_rates.findFirst({ orderBy: { date: 'desc' } });
    const ufValue = uf ? parseFloat(uf.uf_value.toString()) : null;

    // Consulta base: suma separada por moneda
    const aggRows = await prisma.$queryRaw<any[]>`
      SELECT
        cc.id,
        cc.code,
        cc.name,
        COALESCE(SUM(CASE WHEN o.currency = 'CLP' THEN o.amount_original ELSE 0 END),0)    AS total_clp,
        COALESCE(SUM(CASE WHEN o.currency = 'UF'  THEN o.amount_original ELSE 0 END),0)    AS total_uf_moneda,
        COUNT(o.id) FILTER (WHERE o.id IS NOT NULL)                                         AS obligations_count
      FROM cost_centers cc
      LEFT JOIN obligations o ON o.cost_center_id = cc.id
      LEFT JOIN projects p    ON o.project_id = p.id
      WHERE (p.company_id = ${companyId} OR p.company_id IS NULL)
      GROUP BY cc.id, cc.code, cc.name
      ORDER BY cc.name ASC;
    `;

    const result: CostCenterAgg[] = aggRows.map(r => {
      const totalCLP = Number(r.total_clp);
      const totalUFMoneda = Number(r.total_uf_moneda); // obligaciones originalmente en UF
      // Conversión: CLP → UF usando última UF; si no hay UF usar 0
      const convertedCLPtoUF = ufValue && ufValue > 0 ? totalCLP / ufValue : 0;
      return {
        id: Number(r.id),
        code: r.code,
        name: r.name,
        totalCLP,
        // totalUF incluye obligaciones en UF + conversión de CLP
        totalUF: parseFloat((totalUFMoneda + convertedCLPtoUF).toFixed(4)),
        obligationsCount: Number(r.obligations_count)
      };
    });

    // Exponer cabecera para depuración rápida del valor UF usado
    if (ufValue) {
      res.setHeader('X-UF-Value', ufValue.toString());
      res.setHeader('Cache-Control', 'no-store');
    }

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Error en /api/cost-centers:', error);
    return res.status(500).json({ error: 'Error interno al obtener centros de costo' });
  }
}
