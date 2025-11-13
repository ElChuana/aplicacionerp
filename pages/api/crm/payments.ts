import type { NextApiRequest, NextApiResponse } from 'next';
import type { ReceivableStatus } from '@prisma/client';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { companyId, clientId, receivableId } = req.query;

      const where: any = {};
      
      if (companyId) {
        where.company_id = parseInt(companyId as string);
      }
      
      if (clientId) {
        where.client_id = parseInt(clientId as string);
      }
      
      if (receivableId) {
        where.receivable_id = parseInt(receivableId as string);
      }

      const payments = await prisma.payments.findMany({
        where,
        include: {
          clients: {
            select: {
              id: true,
              name: true,
              rut: true,
            },
          },
          companies: {
            select: {
              id: true,
              name: true,
            },
          },
          receivables: {
            select: {
              id: true,
              description: true,
              amount_original: true,
              amount_due: true,
              projects: {
                select: {
                  name: true,
                },
              },
            },
          },
          bank_movements: {
            select: {
              id: true,
              bank_date: true,
              debit: true,
              credit: true,
              description: true,
              bank_accounts: {
                select: {
                  bank_name: true,
                  account_no: true,
                  currency: true,
                },
              },
            },
          },
        },
        orderBy: {
          paid_date: 'desc',
        },
      });

      res.status(200).json(payments);
    } catch (error) {
      console.error('Error fetching payments:', error);
      res.status(500).json({ error: 'Error al obtener pagos' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        company_id,
        client_id,
        receivable_id,
        paid_date,
        amount,
        method,
        bank_movement_id,
        reference,
        notes,
      } = req.body;

      // Validaciones
      if (!client_id || !amount || !method) {
        return res.status(400).json({ 
          error: 'Campos requeridos: client_id, amount, method' 
        });
      }

      // Crear pago
      const payment = await prisma.payments.create({
        data: {
          company_id,
          client_id,
          receivable_id,
          paid_date: paid_date ? new Date(paid_date) : new Date(),
          amount,
          method,
          bank_movement_id,
          reference,
          notes,
        },
        include: {
          clients: true,
          companies: true,
          receivables: true,
          bank_movements: {
            include: {
              bank_accounts: true,
            },
          },
        },
      });

      // Si hay receivable, actualizar monto pagado
      if (receivable_id) {
        const receivable = await prisma.receivables.findUnique({
          where: { id: receivable_id },
          include: {
            payments: true,
          },
        });

        if (receivable) {
          const totalPaid = receivable.payments.reduce(
            (sum, p) => sum + p.amount.toNumber(), 
            0
          );
          const receivableAmount = receivable.amount_due.toNumber();

          // Actualizar estado de la cuenta por cobrar
          let newStatus: ReceivableStatus = 'PENDIENTE';

          if (totalPaid >= receivableAmount) {
            newStatus = 'COBRADO';
          } else if (totalPaid > 0) {
            newStatus = 'PARCIAL';
          }

          await prisma.receivables.update({
            where: { id: receivable_id },
            data: { status: newStatus },
          });
        }
      }

      res.status(201).json(payment);
    } catch (error: any) {
      console.error('Error creating payment:', error);
      
      if (error.code === 'P2003') {
        return res.status(400).json({ 
          error: 'Cliente, cuenta por cobrar o movimiento bancario no existe' 
        });
      }
      
      res.status(500).json({ error: 'Error al crear pago' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
