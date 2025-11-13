// /pages/api/bank-movements/suggestions.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    return res.status(405).json({ error: 'Método no permitido' });

  try {
    const desc = String(req.query.description || '').trim();
    const tipo = String(req.query.tipo || 'cargo');

    if (!desc) return res.status(400).json({ error: 'Falta descripción' });

    const field = tipo === 'cargo' ? 'debit' : 'credit';

    // ✅ Nueva versión compatible con Prisma 6.x
    const resultados = await prisma.bank_movements.groupBy({
      by: ['sub_account_id'],
      where: {
        description: { contains: desc.substring(0, 10), mode: 'insensitive' },
        sub_account_id: { not: null },
        [field]: { gt: 0 },
      },
      _count: { sub_account_id: true },
      orderBy: {
        _count: { sub_account_id: 'desc' },
      },
    });

    if (!resultados.length)
      return res.status(200).json({ sugerencia: null });

    const top = resultados[0];
    const sub = await prisma.sub_accounts.findUnique({
      where: { id: Number(top.sub_account_id) },
      include: { cost_centers: true },
    });

    if (!sub)
      return res.status(200).json({ sugerencia: null });

    res.status(200).json({
      sugerencia: {
        cost_center_id: sub.cost_center_id,
        sub_account_id: sub.id,
      },
    });
  } catch (err) {
    console.error('Error generando sugerencia:', err);
    res.status(500).json({ error: 'Error generando sugerencia' });
  }
}
