// File: pages/api/companies.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

type Company = {
  id: number;
  name: string;
  rut?: string;
  address?: string;
};

type ErrorResponse = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Company[] | Company | ErrorResponse>
) {
  if (req.method === 'GET') {
    try {
      const companies = await prisma.companies.findMany({ orderBy: { name: 'asc' } });
      const result: Company[] = companies.map(c => ({
        id: c.id,
        name: c.name,
        rut: c.rut || undefined,
        address: c.address || undefined,
      }));
      return res.status(200).json(result);
    } catch (e: any) {
      console.error('GET /api/companies error:', e);
      return res.status(500).json({ error: 'Error al obtener empresas' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, rut, address } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'El campo "name" es obligatorio' });
      }
      const newCompany = await prisma.companies.create({
        data: { name, rut, address }
      });
      const result: Company = {
        id: newCompany.id,
        name: newCompany.name,
        rut: newCompany.rut || undefined,
        address: newCompany.address || undefined,
      };
      return res.status(201).json(result);
    } catch (e: any) {
      console.error('POST /api/companies error:', e);
      return res.status(500).json({ error: 'Error al crear empresa' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
