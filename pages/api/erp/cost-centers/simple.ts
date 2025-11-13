// File: pages/api/erp/cost-centers/simple.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const centers = await prisma.cost_centers.findMany({
      select: { id: true, code: true, name: true },
      orderBy: { name: 'asc' },
    });

    return res.status(200).json(centers);
  } catch (error: any) {
    console.error('Error en /api/cost-centers/simple:', error);
    return res.status(500).json({ error: 'Error al obtener centros de costo' });
  }
}
