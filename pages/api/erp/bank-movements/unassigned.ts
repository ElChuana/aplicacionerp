// File: /pages/api/bank-movements/unassigned.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    return res.status(405).json({ error: 'Método no permitido' });

  try {
    const { company, account } = req.query;

    const where: any = { sub_account_id: null };

    if (account) {
      where.bank_account_id = Number(account);
    } else if (company) {
      where.bank_accounts = { company_id: Number(company) };
    }

    const movimientos = await prisma.bank_movements.findMany({
      where,
      include: {
        bank_accounts: { select: { bank_name: true, account_no: true } },
      },
      orderBy: { bank_date: 'desc' },
      take: 500,
    });

    const clean = movimientos.map((m) => ({
      id: Number(m.id),
      fecha: m.bank_date.toISOString().split('T')[0],
      descripcion: m.description,
      cargo: m.debit ? Number(m.debit) : 0,
      abono: m.credit ? Number(m.credit) : 0,
      monto: m.debit ? -Number(m.debit) : Number(m.credit),
      cuenta: `${m.bank_accounts?.bank_name || ''} - ${m.bank_accounts?.account_no || ''}`,
    }));

    res.status(200).json(clean);
  } catch (err) {
    console.error('Error obteniendo movimientos no asignados:', err);
    res.status(500).json({ error: 'Error obteniendo movimientos no asignados' });
  }
}
