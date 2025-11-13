// File: pages/api/erp/credits/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

type ErrorResponse = { error: string };
type ObligationRow = {
  id: string;
  providerName: string;
  projectName: string;
  typeName: string;
  description?: string | null;
  amount: string;
  currency: string;
  startDate: string;
  dueDate: string;
  balance: string;
  status: 'pendiente' | 'vencida' | 'pagada';
};
type CreditDetailResponse = {
  id: number;
  providerName: string;
  interest_rate_pct: number;
  start_date: string;
  end_date: string | null;
  amortization_scheme: string | null;
  interest_frequency: string;
  interest_type: string;
  capital_schedule: any;
  obligations: ObligationRow[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreditDetailResponse | ErrorResponse>
) {
  const { id } = req.query;
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const creditId = Array.isArray(id) ? Number(id[0]) : Number(id);
  if (isNaN(creditId)) {
    return res.status(400).json({ error: 'ID de crédito inválido' });
  }

  try {
    // Obtener las obligaciones asociadas
    const obligations = await prisma.obligations.findMany({
      where: { credit_id: creditId },
      include: {
        providers: { select: { name: true } },
        projects: { select: { name: true } },
        obligation_types: { select: { name: true } },
        movement_matches: { select: { matched_amount: true } },
      },
    });

    if (!obligations.length) {
      return res.status(404).json({ error: 'Crédito no encontrado o sin obligaciones' });
    }

    // Calcular rows
    const rows: ObligationRow[] = obligations.map(o => {
      const totalMatched = o.movement_matches.reduce((sum, m) => sum + Number(m.matched_amount), 0);
      const balance = Number(o.amount_original) - totalMatched;
      return {
        id: o.id.toString(),
        providerName: o.providers.name,
        projectName: o.projects.name,
        typeName: o.obligation_types.name,
        description: o.description,
        amount: Number(o.amount_original).toFixed(2),
        currency: o.currency,
        startDate: o.start_date.toISOString().slice(0, 10),
  dueDate: o.due_date ? o.due_date.toISOString().slice(0, 10) : '',
        balance: balance.toFixed(2),
        status: o.status as 'pendiente' | 'vencida' | 'pagada',
      };
    });

    // Nombre del proveedor principal (el primero)
    const providerName = rows[0].providerName;

    // Obtener el crédito
    const credit = await prisma.credits.findUnique({
      where: { id: creditId },
    });
    if (!credit) {
      return res.status(404).json({ error: 'Crédito no existe' });
    }

    const detail: CreditDetailResponse = {
      id: creditId,
      providerName,
      interest_rate_pct: Number(credit.interest_rate_pct),
      start_date: credit.start_date.toISOString().slice(0, 10),
      end_date: credit.end_date ? credit.end_date.toISOString().slice(0, 10) : null,
      amortization_scheme: credit.amortization_scheme,
      interest_frequency: credit.interest_frequency,
      interest_type: credit.interest_type,
      capital_schedule: credit.capital_schedule,
      obligations: rows,
    };

    return res.status(200).json(detail);
  } catch (error: any) {
    console.error('GET /api/credits/[id] error:', error);
    return res.status(500).json({ error: 'Error interno al obtener detalle de crédito' });
  }
}
