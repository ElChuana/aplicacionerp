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

      const quotations = await prisma.quotations.findMany({
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
          users: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          quotation_items: {
            include: {
              units: {
                select: {
                  id: true,
                  code: true,
                  unit_type: true,
                  floor: true,
                  total_m2: true,
                },
              },
            },
          },
          _count: {
            select: {
              promises: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      res.status(200).json(quotations);
    } catch (error) {
      console.error('Error fetching quotations:', error);
      res.status(500).json({ error: 'Error al obtener cotizaciones' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        company_id,
        client_id,
        project_id,
        quotation_number,
        valid_until,
        items, // Array de { unit_id, unit_price, quantity }
        discount_amount,
        bono_pie_amount,
        down_payment_pct,
        observations,
        userId,
      } = req.body;

      // Validaciones
      if (!company_id || !client_id || !project_id || !items?.length) {
        return res.status(400).json({ 
          error: 'Campos requeridos: company_id, client_id, project_id, items' 
        });
      }

      // Calcular totales
      const subtotal = items.reduce((sum: number, item: any) =>
        sum + (Number(item.unit_price) || 0) * (Number(item.quantity) || 1),
        0
      );
      
      const discount = discount_amount || 0;
      const bonoPie = bono_pie_amount || 0;
  const total = subtotal - discount - bonoPie;
  const downPaymentPct = Number(down_payment_pct) || 0;
  const down_payment_amount = (total * downPaymentPct) / 100;

      // Crear cotización con items
      const quotation = await prisma.quotations.create({
        data: {
          company_id,
          client_id,
          project_id,
          number: quotation_number,
          valid_until: valid_until ? new Date(valid_until) : undefined,
          subtotal,
          discount_amount: discount,
          bono_pie_amount: bonoPie,
          total,
          down_payment_pct: downPaymentPct,
          down_payment_amount,
          notes: observations,
          status: 'DRAFT',
          created_by: userId || 1, // TODO: obtener de JWT
          quotation_items: {
            create: items.map((item: any) => ({
              unit_id: item.unit_id,
              quantity: Number(item.quantity) || 1,
              unit_price: Number(item.unit_price) || 0,
              line_total: (Number(item.unit_price) || 0) * (Number(item.quantity) || 1),
              description: item.description || '',
            })),
          },
        },
        include: {
          clients: true,
          projects: true,
          quotation_items: {
            include: {
              units: true,
            },
          },
        },
      });

      res.status(201).json(quotation);
    } catch (error: any) {
      console.error('Error creating quotation:', error);
      
      if (error.code === 'P2002') {
        return res.status(409).json({ 
          error: 'Ya existe una cotización con ese número' 
        });
      }
      
      if (error.code === 'P2003') {
        return res.status(400).json({ 
          error: 'Una o más unidades no existen' 
        });
      }
      
      res.status(500).json({ error: 'Error al crear cotización' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
