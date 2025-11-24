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

    // Buscar movimientos similares con clasificación (a través de obligaciones)
    const movements = await prisma.bank_movements.findMany({
      where: {
        description: { contains: desc.substring(0, 10), mode: 'insensitive' },
        [field]: { gt: 0 },
        movement_matches: {
          some: {
            obligations: {
              sub_account_id: { not: null }
            }
          }
        }
      },
      include: {
        movement_matches: {
          include: {
            obligations: {
              select: {
                sub_account_id: true,
                cost_center_id: true
              }
            }
          }
        }
      },
      take: 100
    });

    if (!movements.length)
      return res.status(200).json({ sugerencia: null });

    // Contar frecuencia de cada subcuenta
    const subAccountCounts = new Map<number, number>();
    
    movements.forEach(m => {
      m.movement_matches.forEach(match => {
        const subAccountId = match.obligations.sub_account_id;
        if (subAccountId) {
          subAccountCounts.set(
            Number(subAccountId),
            (subAccountCounts.get(Number(subAccountId)) || 0) + 1
          );
        }
      });
    });

    if (subAccountCounts.size === 0)
      return res.status(200).json({ sugerencia: null });

    // Obtener la subcuenta más frecuente
    let topSubAccountId = 0;
    let maxCount = 0;
    
    subAccountCounts.forEach((count, subAccountId) => {
      if (count > maxCount) {
        maxCount = count;
        topSubAccountId = subAccountId;
      }
    });

    const sub = await prisma.sub_accounts.findUnique({
      where: { id: topSubAccountId },
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
