// File: pages/api/erp/bank-accounts/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

type BankAccount = {
  id: number;
  bank_name: string;
  account_no: string;
  currency: string;
};

type ErrorResponse = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BankAccount[] | ErrorResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { company } = req.query;
  const companyId = Array.isArray(company) ? Number(company[0]) : Number(company);
  if (isNaN(companyId)) {
    return res.status(400).json({ error: 'Company ID inválido' });
  }

  try {
    const accounts = await prisma.bank_accounts.findMany({
      where: { company_id: companyId },
      select: {
        id: true,
        bank_name: true,
        account_no: true,
        currency: true,
      },
    });
    return res.status(200).json(accounts);
  } catch (error: any) {
    console.error('GET /api/bank-accounts error:', error);
    return res.status(500).json({ error: 'Error interno al obtener cuentas bancarias' });
  }
}
