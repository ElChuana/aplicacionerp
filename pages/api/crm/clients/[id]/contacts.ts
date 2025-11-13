import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const clientId = parseInt(id as string);

  if (req.method === 'POST') {
    try {
      const { name, role, email, phone, notes } = req.body;

      const contact = await prisma.contacts.create({
        data: {
          client_id: clientId,
          name,
          role,
          email,
          phone,
          notes,
        },
      });

      res.status(201).json(contact);
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).json({ error: 'Error al crear contacto' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
