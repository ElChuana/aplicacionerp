import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const promiseId = parseInt(id as string);

  if (req.method === 'GET') {
    try {
      const promise = await prisma.promises.findUnique({
        where: { id: promiseId },
        include: {
          clients: {
            include: {
              contacts: true,
            },
          },
          projects: true,
          companies: true,
          quotations: {
            include: {
              quotation_items: {
                include: {
                  units: {
                    include: {
                      unit_prices: {
                        where: {
                          valid_to: null,
                        },
                        take: 1,
                      },
                    },
                  },
                },
              },
            },
          },
          deeds: true,
          payment_plans: {
            include: {
              installments: {
                orderBy: {
                  installment_number: 'asc',
                },
                include: {
                  bank_movements: {
                    select: {
                      id: true,
                      bank_date: true,
                      debit: true,
                      credit: true,
                      description: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!promise) {
        return res.status(404).json({ error: 'Promesa no encontrada' });
      }

      res.status(200).json(promise);
    } catch (error) {
      console.error('Error fetching promise:', error);
      res.status(500).json({ error: 'Error al obtener promesa' });
    }
  } else if (req.method === 'PUT') {
    try {
      const {
        promise_number,
        promise_date,
        total_amount,
        down_payment_amount,
        observations,
        status,
      } = req.body;

      const promise = await prisma.promises.update({
        where: { id: promiseId },
        data: {
          promise_number,
          promise_date: promise_date ? new Date(promise_date) : undefined,
          total_amount,
          downpayment_amount: down_payment_amount,
          terms: observations,
          status,
        },
        include: {
          clients: true,
          projects: true,
          quotations: {
            include: {
              quotation_items: {
                include: {
                  units: true,
                },
              },
            },
          },
        },
      });

      res.status(200).json(promise);
    } catch (error: any) {
      console.error('Error updating promise:', error);
      
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Promesa no encontrada' });
      }
      
      if (error.code === 'P2002') {
        return res.status(409).json({ 
          error: 'Ya existe una promesa con ese número' 
        });
      }
      
      res.status(500).json({ error: 'Error al actualizar promesa' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Verificar que no tenga escritura asociada
      const promise = await prisma.promises.findUnique({
        where: { id: promiseId },
        include: {
          deeds: true,
          quotations: {
            include: {
              quotation_items: true,
            },
          },
        },
      });

      if (!promise) {
        return res.status(404).json({ error: 'Promesa no encontrada' });
      }

      if (promise.deeds && promise.deeds.length > 0) {
        return res.status(409).json({ 
          error: 'No se puede eliminar la promesa porque tiene escritura asociada' 
        });
      }

      // Liberar unidades reservadas
      if (promise.quotations?.quotation_items) {
        const unitIds = promise.quotations.quotation_items
          .map(item => item.unit_id)
          .filter((id): id is number => typeof id === 'number');
        await prisma.units.updateMany({
          where: {
            id: {
              in: unitIds,
            },
          },
          data: {
            status: 'DISPONIBLE',
          },
        });
      }

      await prisma.promises.delete({
        where: { id: promiseId },
      });

      res.status(200).json({ message: 'Promesa eliminada exitosamente' });
    } catch (error: any) {
      console.error('Error deleting promise:', error);
      
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Promesa no encontrada' });
      }
      
      res.status(500).json({ error: 'Error al eliminar promesa' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
