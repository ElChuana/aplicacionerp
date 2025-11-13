// pages/api/projects.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { company, id } = req.query;

    // Si se proporciona un ID específico
    if (id) {
      const projectId = Array.isArray(id) ? Number(id[0]) : Number(id);
      const project = await prisma.projects.findUnique({
        where: { id: projectId },
        include: {
          companies: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              units: true,
            },
          },
        },
      });

      if (!project) {
        return res.status(404).json({ message: 'Proyecto no encontrado' });
      }

      const formattedProject = {
        id: project.id,
        code: project.code,
        name: project.name,
        address: project.address,
        comuna: project.comuna,
        status: 'ACTIVO', // TODO: Agregar campo status en el modelo
        description: project.description,
        company: {
          id: project.companies.id,
          name: project.companies.name,
        },
        _count: project._count,
      };

      return res.status(200).json([formattedProject]);
    }

    // Si se proporciona company, filtrar por empresa
    const companyId = Array.isArray(company)
      ? Number(company[0])
      : typeof company === 'string'
      ? Number(company)
      : null;

    if (!companyId) {
      return res.status(400).json({ message: 'Parámetro company es requerido' });
    }

    const projects = await prisma.projects.findMany({
      where: { company_id: companyId },
      include: {
        companies: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            units: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    const formattedProjects = projects.map(project => ({
      id: project.id,
      code: project.code,
      name: project.name,
      address: project.address,
      comuna: project.comuna,
      status: 'ACTIVO', // TODO: Agregar campo status en el modelo
      company: {
        id: project.companies.id,
        name: project.companies.name,
      },
      _count: project._count,
    }));

    return res.status(200).json(formattedProjects);
  } catch (error) {
    console.error('Error en GET /api/projects:', error);
    return res.status(500).json({ message: 'Error interno al obtener proyectos' });
  }
}