// File: pages/api/erp/cost-centers/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

type ErrorResponse = { error: string };

type SubAgg = { id: number; code: string | null; name: string; totalCLP: number; totalUF: number; obligationsCount: number };
type ObligationRow = {
  id: number;
  description: string | null;
  provider_name: string | null;
  amount_original: number;
  currency: string;
  start_date: string | null;
  due_date: string | null;
  status: string;
  sub_account_id: number | null;
  sub_account_code: string | null;
  sub_account_name: string | null;
};

type DetailResponse = {
  subAccounts: SubAgg[];
  obligations: ObligationRow[];
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
    // Último valor UF para convertir montos CLP
    const uf = await prisma.uf_rates.findFirst({ orderBy: { date: 'desc' } });
    const ufValue = uf ? parseFloat(uf.uf_value.toString()) : null;

    // Agregación de subcuentas basada en obligaciones clasificadas (separando moneda)
    const subRows = await prisma.$queryRaw<any[]>`
      SELECT
        sa.id,
        sa.code,
        sa.name,
        COALESCE(SUM(CASE WHEN o.currency = 'CLP' THEN o.amount_original ELSE 0 END),0) AS total_clp,
        COALESCE(SUM(CASE WHEN o.currency = 'UF'  THEN o.amount_original ELSE 0 END),0) AS total_uf_moneda,
        COUNT(o.id) FILTER (WHERE o.id IS NOT NULL)                                   AS obligations_count
      FROM sub_accounts sa
      LEFT JOIN obligations o ON o.sub_account_id = sa.id
      LEFT JOIN projects p    ON o.project_id = p.id
      WHERE sa.cost_center_id = ${centerId} AND (p.company_id = ${companyId} OR p.company_id IS NULL)
      GROUP BY sa.id, sa.code, sa.name
      ORDER BY sa.name ASC;
    `;

    const subAccounts: SubAgg[] = subRows.map(r => {
      const totalCLP = Number(r.total_clp);
      const totalUFMoneda = Number(r.total_uf_moneda);
      const convertedCLPtoUF = ufValue && ufValue > 0 ? totalCLP / ufValue : 0;
      return {
        id: Number(r.id),
        code: r.code || null,
        name: r.name,
        totalCLP,
        totalUF: parseFloat((totalUFMoneda + convertedCLPtoUF).toFixed(4)),
        obligationsCount: Number(r.obligations_count)
      };
    });

    // Lista de obligaciones del centro de costo
    const obligationsRows = await prisma.$queryRaw<any[]>`
      SELECT
        o.id,
        o.description,
        o.amount_original::float AS amount_original,
        o.currency,
        to_char(o.start_date,'YYYY-MM-DD') AS start_date,
        to_char(o.due_date,'YYYY-MM-DD')   AS due_date,
        o.status,
        o.sub_account_id,
        sa.code AS sub_account_code,
        sa.name AS sub_account_name,
        prov.name AS provider_name
      FROM obligations o
      LEFT JOIN sub_accounts sa ON o.sub_account_id = sa.id
      LEFT JOIN projects p      ON o.project_id = p.id
      LEFT JOIN providers prov  ON o.provider_id = prov.id
      WHERE o.cost_center_id = ${centerId} AND p.company_id = ${companyId}
      ORDER BY o.start_date DESC;
    `;

    const obligations: ObligationRow[] = obligationsRows.map(r => ({
      id: Number(r.id),
      description: r.description || null,
      provider_name: r.provider_name || null,
      amount_original: Number(r.amount_original),
      currency: r.currency,
      start_date: r.start_date,
      due_date: r.due_date,
      status: r.status,
      sub_account_id: r.sub_account_id != null ? Number(r.sub_account_id) : null,
      sub_account_code: r.sub_account_code || null,
      sub_account_name: r.sub_account_name || null,
    }));

    return res.status(200).json({ subAccounts, obligations });
  } catch(error:any) {
    console.error('GET /api/cost-centers/[id] error:',error);
    return res.status(500).json({ error: 'Error interno del servidor'});
  }
}
