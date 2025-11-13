import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const clientId = parseInt(id as string);

  if (req.method === 'GET') {
    try {
      const client = await prisma.clients.findUnique({
        where: { id: clientId },
        include: {
          companies: true,
          contacts: {
            orderBy: {
              created_at: 'desc',
            },
          },
          quotations: {
            include: {
              projects: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
            },
            orderBy: {
              created_at: 'desc',
            },
          },
          promises: {
            include: {
              projects: {
                select: {
                  id: true,
                  name: true,
                },
              },
              quotations: {
                select: {
                  id: true,
                  number: true,
                },
              },
            },
            orderBy: {
              promise_date: 'desc',
            },
          },
          receivables: {
            include: {
              projects: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            orderBy: {
              created_at: 'desc',
            },
          },
          payments: {
            include: {
              receivables: {
                select: {
                  id: true,
                  description: true,
                },
              },
            },
            orderBy: {
              paid_date: 'desc',
            },
            take: 10, // Últimos 10 pagos
          },
        },
      });

      if (!client) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      res.status(200).json(client);
    } catch (error) {
      console.error('Error fetching client:', error);
      res.status(500).json({ error: 'Error al obtener cliente' });
    }
  } else if (req.method === 'PUT') {
    try {
      const {
        client_type,
        rut,
        name,
        email,
        phone,
        address,
        billing_address,
      } = req.body;

      const client = await prisma.clients.update({
        where: { id: clientId },
        data: {
          client_type,
          rut,
          name,
          email,
          phone,
          address,
          billing_address,
        },
        include: {
          companies: true,
          contacts: true,
        },
      });

      res.status(200).json(client);
    } catch (error: any) {
      console.error('Error updating client:', error);
      
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      
      if (error.code === 'P2002') {
        return res.status(409).json({ 
          error: 'Ya existe un cliente con ese RUT en la empresa' 
        });
      }
      
      res.status(500).json({ error: 'Error al actualizar cliente' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.clients.delete({
        where: { id: clientId },
      });

      res.status(200).json({ message: 'Cliente eliminado exitosamente' });
    } catch (error: any) {
      console.error('Error deleting client:', error);
      
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      
      if (error.code === 'P2003') {
        return res.status(409).json({ 
          error: 'No se puede eliminar el cliente porque tiene cotizaciones, promesas o pagos asociados' 
        });
      }
      
      res.status(500).json({ error: 'Error al eliminar cliente' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
