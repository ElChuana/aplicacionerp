// pages/api/sub-accounts/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cost_center_id } = req.query;
  const where = cost_center_id ? { cost_center_id: Number(cost_center_id) } : {};

  const data = await prisma.sub_accounts.findMany({
    where,
    select: { id: true, name: true, cost_center_id: true },
    orderBy: { name: 'asc' },
  });

  res.status(200).json(data);
}
