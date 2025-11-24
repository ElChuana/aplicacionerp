import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { id } = req.query;
  const movementId = Array.isArray(id) ? Number(id[0]) : Number(id);
  if (isNaN(movementId)) return res.status(400).json({ message: 'ID de movimiento inválido' });

  const { obligationEntries } = req.body as { obligationEntries: string[] };
  if (!Array.isArray(obligationEntries) || obligationEntries.length === 0) {
    return res.status(400).json({ message: 'obligationEntries debe ser un array no vacío' });
  }

  try {
    const mv = await prisma.bank_movements.findUnique({
      where: { id: movementId },
      select: { debit: true, credit: true }
    });
    if (!mv) return res.status(404).json({ message: 'Movimiento no encontrado' });
    const movementAmount = parseFloat(((mv.debit ?? mv.credit ?? 0)).toString());

    const parsed = obligationEntries.map(entry => {
      const [oid, amtStr] = entry.split(':');
      const obligationId = Number(oid);
      const matched_amount = parseFloat(amtStr);
      if (isNaN(obligationId) || isNaN(matched_amount)) {
        throw new Error(`Formato inválido: ${entry}`);
      }
      return { obligationId, matched_amount };
    });

    const total = parsed.reduce((s, r) => s + r.matched_amount, 0);
    if (total > movementAmount + 0.01) {
      return res.status(400).json({ message: 'La suma excede el monto del movimiento' });
    }

    await Promise.all(parsed.map(({ obligationId, matched_amount }) =>
      prisma.movement_matches.upsert({
        where: { movement_id_obligation_id: { movement_id: movementId, obligation_id: obligationId } },
        update: { matched_amount },
        create: { movement_id: movementId, obligation_id: obligationId, matched_amount }
      })
    ));

    return res.status(201).json({ message: 'Asociaciones creadas/actualizadas', total });
  } catch (e) {
    console.error('POST /api/erp/bank-movements/[id]/associate-obligations error', e);
    return res.status(500).json({ message: 'Error interno al asociar obligaciones' });
  }
}
