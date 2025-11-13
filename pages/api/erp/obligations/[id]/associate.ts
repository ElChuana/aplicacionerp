// File: pages/api/erp/obligations/[id]/associate.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id } = req.query;
  const obligationId = Array.isArray(id) ? Number(id[0]) : Number(id);
  if (isNaN(obligationId)) {
    return res.status(400).json({ message: 'ID de obligación inválido' });
  }

  const { movementIds } = req.body as { movementIds: string[] };
  if (!Array.isArray(movementIds) || movementIds.length === 0) {
    return res.status(400).json({ message: 'movementIds debe ser un array no vacío' });
  }

  try {
    const entries = movementIds.map(entry => {
      const [mid, amt] = entry.split(':');
      const movementId = Number(mid);
      const matched_amount = parseFloat(amt);
      if (isNaN(movementId) || isNaN(matched_amount)) {
        throw new Error(`Formato inválido: ${entry}`);
      }
      return { movementId, matched_amount };
    });

    // Upsert each match: update if exists, else create
    await Promise.all(
      entries.map(({ movementId, matched_amount }) =>
        prisma.movement_matches.upsert({
          where: {
            movement_id_obligation_id: {
              movement_id: movementId,
              obligation_id: obligationId,
            },
          },
          update: { matched_amount },
          create: {
            movement_id: movementId,
            obligation_id: obligationId,
            matched_amount,
          },
        })
      )
    );

    return res.status(201).json({ message: 'Asociaciones creadas o actualizadas' });
  } catch (error) {
    console.error('ERROR POST /api/obligations/[id]/associate:', error);
    return res.status(500).json({ message: 'Error Internacionalo al asociar movimientos' });
  }
}
