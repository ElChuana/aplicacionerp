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

      const receivables = await prisma.receivables.findMany({
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
          projects: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
          payments: {
            orderBy: {
              paid_date: 'desc',
            },
          },
          _count: {
            select: {
              payments: true,
            },
          },
        },
        orderBy: {
          due_date: 'asc',
        },
      });

      // Calcular saldo pendiente para cada cuenta por cobrar
      const receivablesWithBalance = receivables.map(rec => {
        const totalPaid = rec.payments.reduce(
          (sum, p) => sum + p.amount.toNumber(), 
          0
        );
        const balance = rec.amount_due.toNumber() - totalPaid;

        return {
          ...rec,
          total_paid: totalPaid,
          balance,
        };
      });

      res.status(200).json(receivablesWithBalance);
    } catch (error) {
      console.error('Error fetching receivables:', error);
      res.status(500).json({ error: 'Error al obtener cuentas por cobrar' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        company_id,
        client_id,
        project_id,
        description,
        amount,
        due_date,
        status,
      } = req.body;

      // Validaciones
      if (!company_id || !client_id || !project_id || !amount || !due_date) {
        return res.status(400).json({ 
          error: 'Campos requeridos: company_id, client_id, project_id, amount, due_date' 
        });
      }

      const receivable = await prisma.receivables.create({
        data: {
          companies: company_id ? { connect: { id: Number(company_id) } } : undefined,
          clients: { connect: { id: Number(client_id) } },
          projects: { connect: { id: Number(project_id) } },
          source_type: 'CRM',
          description,
          currency: 'CLP',
          amount_original: amount,
          amount_due: amount,
          due_date: new Date(due_date),
          status: status || 'PENDIENTE',
        },
        include: {
          clients: true,
          projects: true,
        },
      });

      res.status(201).json(receivable);
    } catch (error: any) {
      console.error('Error creating receivable:', error);
      
      if (error.code === 'P2003') {
        return res.status(400).json({ 
          error: 'Cliente o proyecto no existe' 
        });
      }
      
      res.status(500).json({ error: 'Error al crear cuenta por cobrar' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
