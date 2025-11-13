import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const unitId = parseInt(id as string);

  if (req.method === 'GET') {
    try {
      const unit = await prisma.units.findUnique({
        where: { id: unitId },
        include: {
          projects: true,
          unit_prices: {
            orderBy: {
              valid_from: 'desc',
            },
            include: {
              users: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
          quotation_items: {
            include: {
              quotations: {
                include: {
                  clients: true,
                },
              },
            },
          },
        },
      });

      if (!unit) {
        return res.status(404).json({ error: 'Unidad no encontrada' });
      }

      res.status(200).json(unit);
    } catch (error) {
      console.error('Error fetching unit:', error);
      res.status(500).json({ error: 'Error al obtener unidad' });
    }
  } else if (req.method === 'PUT') {
    try {
      const {
        code,
        unit_type,
        floor,
        surface_total,
        surface_useful,
        surface_terrace,
        bedrooms,
        bathrooms,
        orientation,
        status,
      } = req.body;

      const unit = await prisma.units.update({
        where: { id: unitId },
        data: {
          code,
          unit_type,
          floor,
          total_m2: surface_total,
          covered_m2: surface_useful,
          terrace_m2: surface_terrace,
          bedrooms,
          bathrooms,
          orientation,
          status,
        },
        include: {
          projects: true,
        },
      });

      res.status(200).json(unit);
    } catch (error: any) {
      console.error('Error updating unit:', error);
      
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Unidad no encontrada' });
      }
      
      if (error.code === 'P2002') {
        return res.status(409).json({ 
          error: 'Ya existe una unidad con ese código en el proyecto' 
        });
      }
      
      res.status(500).json({ error: 'Error al actualizar unidad' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.units.delete({
        where: { id: unitId },
      });

      res.status(200).json({ message: 'Unidad eliminada exitosamente' });
    } catch (error: any) {
      console.error('Error deleting unit:', error);
      
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Unidad no encontrada' });
      }
      
      if (error.code === 'P2003') {
        return res.status(409).json({ 
          error: 'No se puede eliminar la unidad porque tiene cotizaciones asociadas' 
        });
      }
      
      res.status(500).json({ error: 'Error al eliminar unidad' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
