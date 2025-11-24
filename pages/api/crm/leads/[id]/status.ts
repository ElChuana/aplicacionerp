import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import { LEAD_STATUSES } from '../index';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', ['PATCH']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { id } = req.query;
  const leadId = Array.isArray(id) ? Number(id[0]) : Number(id);
  if (isNaN(leadId) || leadId <= 0) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  const { status } = req.body;
  const normalized = (status || '').toUpperCase();
  if (!LEAD_STATUSES.includes(normalized as any)) {
    return res.status(400).json({ message: 'Status inválido' });
  }
  try {
    const updated: any[] = await prisma.$queryRawUnsafe(
      `UPDATE leads SET status = $1, updated_at = now() WHERE id = $2 RETURNING id, status`,
      normalized,
      leadId
    );
    if (!updated.length) return res.status(404).json({ message: 'Lead no encontrado' });
    return res.status(200).json({ id: updated[0].id.toString(), status: updated[0].status });
  } catch (e: any) {
    console.error('PATCH /api/crm/leads/[id]/status error', e);
    return res.status(500).json({ message: 'Error interno (¿migración leads aplicada?)' });
  }
}
