// pages/api/providers.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // GET /api/providers
  if (method === 'GET') {
    try {
      const providers = await prisma.providers.findMany({
        select: {
          id:            true,
          name:          true,
          rut:           true,
          address:       true,
          contact_name:  true,
          contact_email: true,
          contact_phone: true,
          created_at:    true,
        },
      });
      return res.status(200).json(providers);
    } catch (error) {
      console.error('GET /api/providers error:', error);
      return res.status(500).json({ message: 'Error Internacionalo al obtener proveedores' });
    }
  }

  // POST /api/providers
  if (method === 'POST') {
    const {
      name,
      rut,
      address,
      contact_name,
      contact_email,
      contact_phone,
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'El campo name es obligatorio' });
    }

    try {
      // Busca por nombre, usando findFirst en lugar de findUnique
      let prov = await prisma.providers.findFirst({
        where: { name },
      });

      if (prov) {
        // Si ya existe devuelve el registro existente
        return res.status(200).json(prov);
      }

      // Si no existe, crea uno nuevo
      prov = await prisma.providers.create({
        data: {
          name,
          rut,
          address,
          contact_name,
          contact_email,
          contact_phone,
        },
      });

      return res.status(201).json(prov);
    } catch (error) {
      console.error('POST /api/providers error:', error);
      return res.status(500).json({ message: 'Error Internacionalo al crear proveedor' });
    }
  }

  // Métodos no permitidos
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
