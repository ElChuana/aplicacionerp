import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
  
  const { company } = req.query;
  if (!company) {
    return res.status(400).json({ error: 'Parámetro company requerido' });
  }

  try {
    const projects = await prisma.projects.findMany({
      where: {
        company_id: parseInt(company as string),
      },
      orderBy: { name: 'asc' },
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proyectos', details: String(error) });
  }
}
