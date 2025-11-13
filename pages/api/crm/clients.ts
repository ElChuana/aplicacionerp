import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { companyId, clientType, search, rut } = req.query;

      const where: any = {};
      
      if (companyId) {
        where.company_id = parseInt(companyId as string);
      }
      
      if (clientType) {
        where.client_type = clientType;
      }

      if (rut) {
        where.rut = rut;
      }
      
      if (search) {
        where.OR = [
          { name: { contains: search as string, mode: 'insensitive' } },
          { rut: { contains: search as string, mode: 'insensitive' } },
          { email: { contains: search as string, mode: 'insensitive' } },
        ];
      }

      const clients = await prisma.clients.findMany({
        where,
        include: {
          companies: {
            select: {
              id: true,
              name: true,
            },
          },
          contacts: {
            orderBy: {
              created_at: 'desc',
            },
          },
          _count: {
            select: {
              quotations: true,
              promises: true,
              receivables: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      res.status(200).json(clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
      res.status(500).json({ error: 'Error al obtener clientes' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        company_id,
        client_type,
        rut,
        first_name,
        last_name,
        name,
        email,
        phone,
        address,
        comuna,
        region,
        billing_address,
        contacts,
      } = req.body;

      // Validaciones
      if (!company_id || !rut || !name || !client_type) {
        return res.status(400).json({ 
          error: 'Campos requeridos: company_id, rut, name, client_type' 
        });
      }

      // Crear cliente con contactos
      const client = await prisma.clients.create({
        data: {
          companies: {
            connect: { id: company_id }
          },
          client_type,
          rut,
          first_name,
          last_name,
          name,
          email,
          phone,
          address,
          comuna,
          region,
          billing_address,
          contacts: contacts?.length ? {
            create: contacts.map((contact: any) => ({
              name: contact.name,
              role: contact.role,
              phone: contact.phone,
              email: contact.email,
              notes: contact.notes,
            })),
          } : undefined,
        },
        include: {
          companies: true,
          contacts: true,
        },
      });

      res.status(201).json(client);
    } catch (error: any) {
      console.error('Error creating client:', error);
      
      if (error.code === 'P2002') {
        return res.status(409).json({ 
          error: 'Ya existe un cliente con ese RUT en la empresa' 
        });
      }
      
      res.status(500).json({ error: 'Error al crear cliente' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
