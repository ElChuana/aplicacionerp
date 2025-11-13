// File: pages/api/erp/obligation-types/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const types = await prisma.obligation_types.findMany({
        orderBy: { id: 'asc' },
      });
      return res.status(200).json(types);
    }

    if (req.method === 'POST') {
      const { name, description } = req.body;

      if (!name || name.trim() === '') {
        return res.status(400).json({ message: 'El nombre del tipo es obligatorio' });
      }

      const newType = await prisma.obligation_types.create({
        data: {
          name: name.trim(),
          description: description?.trim() || null,
        },
      });

      // ✅ Correcto: devolvemos usando res.json (no un return directo)
      res.status(200).json(newType);
      return; // importante: no devolver objeto directamente
    }

    // ❌ Si llega aquí con otro método (PUT, DELETE, etc.)
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err: any) {
    console.error('Error en /api/obligation-types:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
