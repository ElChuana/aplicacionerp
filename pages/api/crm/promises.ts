import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { companyId, clientId, projectId, status } = req.query;

      const where: any = {};
      
      if (companyId) {
        where.company_id = parseInt(companyId as string);
      }
      
      if (clientId) {
        where.client_id = parseInt(clientId as string);
      }
      
      if (projectId) {
        where.project_id = parseInt(projectId as string);
      }
      
      if (status) {
        where.status = status;
      }

      const promises = await prisma.promises.findMany({
        where,
        include: {
          clients: {
            select: {
              id: true,
              name: true,
              rut: true,
              email: true,
              phone: true,
            },
          },
          projects: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
          companies: {
            select: {
              id: true,
              name: true,
            },
          },
          quotations: {
            select: {
              id: true,
              number: true,
              total: true,
              quotation_items: {
                include: {
                  units: {
                    select: {
                      code: true,
                      unit_type: true,
                    },
                  },
                },
              },
            },
          },
          deeds: {
            select: {
              id: true,
              protocol_number: true,
              deed_date: true,
              status: true,
            },
          },
          payment_plans: {
            include: {
              _count: {
                select: {
                  installments: true,
                },
              },
            },
          },
        },
        orderBy: {
          promise_date: 'desc',
        },
      });

      res.status(200).json(promises);
    } catch (error) {
      console.error('Error fetching promises:', error);
      res.status(500).json({ error: 'Error al obtener promesas' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        company_id,
        client_id,
        project_id,
        quotation_id,
        promise_number,
        promise_date,
        down_payment_amount,
        observations,
      } = req.body;

      // Validaciones
      if (!company_id || !client_id || !project_id) {
        return res.status(400).json({ 
          error: 'Campos requeridos: company_id, client_id, project_id' 
        });
      }

      // Si viene quotation_id, obtener datos de la cotización
      let totalAmount = 0;
      if (quotation_id) {
        const quotation = await prisma.quotations.findUnique({
          where: { id: quotation_id },
        });

        if (!quotation) {
          return res.status(404).json({ error: 'Cotización no encontrada' });
        }

  totalAmount = quotation.total.toNumber();

        // Actualizar estado de cotización
        await prisma.quotations.update({
          where: { id: quotation_id },
          data: { status: 'ACCEPTED' },
        });
      }

      // Crear promesa
      const promise = await prisma.promises.create({
        data: {
          company_id,
          client_id,
          project_id,
          quotation_id,
          promise_number,
          promise_date: promise_date ? new Date(promise_date) : new Date(),
          total_amount: totalAmount,
          downpayment_amount: down_payment_amount,
          terms: observations,
          status: 'VIGENTE',
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

      // Si hay unidades en la cotización, marcarlas como RESERVADA
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
            status: 'RESERVADO',
          },
        });
      }

      res.status(201).json(promise);
    } catch (error: any) {
      console.error('Error creating promise:', error);
      
      if (error.code === 'P2002') {
        return res.status(409).json({ 
          error: 'Ya existe una promesa con ese número' 
        });
      }
      
      res.status(500).json({ error: 'Error al crear promesa' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
