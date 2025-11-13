import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const quotationId = parseInt(id as string);

  if (req.method === 'GET') {
    try {
      const quotation = await prisma.quotations.findUnique({
        where: { id: quotationId },
        include: {
          clients: {
            include: {
              contacts: true,
            },
          },
          projects: true,
          companies: true,
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
          promises: {
            include: {
              deeds: true,
            },
            orderBy: {
              promise_date: 'desc',
            },
          },
        },
      });

      if (!quotation) {
        return res.status(404).json({ error: 'Cotización no encontrada' });
      }

      res.status(200).json(quotation);
    } catch (error) {
      console.error('Error fetching quotation:', error);
      res.status(500).json({ error: 'Error al obtener cotización' });
    }
  } else if (req.method === 'PUT') {
    try {
      const {
        quotation_number,
        valid_until,
        discount_amount,
        bono_pie_amount,
        down_payment_pct,
        observations,
        status,
        items,
      } = req.body;

      const updateData: any = {
        number: quotation_number,
        valid_until: valid_until ? new Date(valid_until) : undefined,
        discount_amount,
        bono_pie_amount,
        down_payment_pct,
        notes: observations,
        status,
      };

      // Si vienen items, recalcular totales y actualizar items
      if (items?.length) {
        const subtotal = items.reduce((sum: number, item: any) =>
          sum + (Number(item.unit_price) || 0) * (Number(item.quantity) || 1),
          0
        );

        const discount = discount_amount || 0;
        const bonoPie = bono_pie_amount || 0;
        const total = subtotal - discount - bonoPie;

        updateData.subtotal = subtotal;
        updateData.total = total;
        const dpPct = Number(down_payment_pct) || 0;
        updateData.down_payment_amount = (total * dpPct) / 100;

        // Eliminar items anteriores y crear nuevos
        await prisma.quotation_items.deleteMany({
          where: { quotation_id: quotationId },
        });

        updateData.quotation_items = {
          create: items.map((item: any) => ({
            unit_id: item.unit_id,
            quantity: Number(item.quantity) || 1,
            unit_price: Number(item.unit_price) || 0,
            line_total:
              (Number(item.unit_price) || 0) * (Number(item.quantity) || 1),
            description: item.description || '',
          })),
        };
      }

      const quotation = await prisma.quotations.update({
        where: { id: quotationId },
        data: updateData,
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

      res.status(200).json(quotation);
    } catch (error: any) {
      console.error('Error updating quotation:', error);
      
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Cotización no encontrada' });
      }
      
      if (error.code === 'P2002') {
        return res.status(409).json({ 
          error: 'Ya existe una cotización con ese número' 
        });
      }
      
      res.status(500).json({ error: 'Error al actualizar cotización' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Verificar que no tenga promesas asociadas
      const quotation = await prisma.quotations.findUnique({
        where: { id: quotationId },
        include: {
          promises: true,
        },
      });

      if (!quotation) {
        return res.status(404).json({ error: 'Cotización no encontrada' });
      }

      if (quotation.promises.length > 0) {
        return res.status(409).json({ 
          error: 'No se puede eliminar la cotización porque tiene promesas asociadas' 
        });
      }

      await prisma.quotations.delete({
        where: { id: quotationId },
      });

      res.status(200).json({ message: 'Cotización eliminada exitosamente' });
    } catch (error: any) {
      console.error('Error deleting quotation:', error);
      
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Cotización no encontrada' });
      }
      
      res.status(500).json({ error: 'Error al eliminar cotización' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
