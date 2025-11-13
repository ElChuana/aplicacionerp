import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { projectId, status, unitType, companyId } = req.query;

      const where: any = {};
      
      if (projectId) {
        where.project_id = parseInt(projectId as string);
      }
      
      if (status) {
        where.status = status;
      }
      
      if (unitType) {
        where.unit_type = unitType;
      }
      
      // Filtrar por companyId si se proporciona
      if (companyId) {
        where.projects = {
          company_id: parseInt(companyId as string),
        };
      }

      const units = await prisma.units.findMany({
        where,
        include: {
          projects: {
            select: {
              id: true,
              name: true,
              code: true,
              company_id: true,
            },
          },
          unit_prices: {
            where: {
              OR: [
                { valid_to: null },
                { valid_to: { gte: new Date() } }
              ]
            },
            orderBy: {
              valid_from: 'desc',
            },
            take: 2, // Tomamos CLP y UF
          },
        },
        orderBy: [
          { project_id: 'asc' },
          { code: 'asc' },
        ],
      });

      // Formatear respuesta con precio actual
      const formattedUnits = units.map(unit => {
        const priceClp = unit.unit_prices.find(p => p.currency === 'CLP');
        const priceUf = unit.unit_prices.find(p => p.currency === 'UF');
        
        return {
          id: unit.id,
          code: unit.code,
          unit_type: unit.unit_type,
          floor: unit.floor,
          surface_total: unit.total_m2 ? Number(unit.total_m2) : null,
          bedrooms: unit.bedrooms,
          bathrooms: unit.bathrooms,
          status: unit.status,
          current_price: priceClp ? Number(priceClp.amount) : null,
          current_price_uf: priceUf ? Number(priceUf.amount) : null,
          project: {
            id: unit.projects.id,
            name: unit.projects.name,
            code: unit.projects.code,
          },
        };
      });

      res.status(200).json(formattedUnits);
    } catch (error) {
      console.error('Error fetching units:', error);
      res.status(500).json({ error: 'Error al obtener unidades' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        project_id,
        code,
        name,
        unit_type,
        floor,
        total_m2,
        covered_m2,
        terrace_m2,
        bedrooms,
        bathrooms,
        orientation,
        status,
        price_clp,
        price_uf,
        userId,
      } = req.body;

      // Validaciones
      if (!project_id || !code || !unit_type || !name) {
        return res.status(400).json({ 
          error: 'Campos requeridos: project_id, code, name, unit_type' 
        });
      }

      // Crear unidad
      const unit = await prisma.units.create({
        data: {
          project_id,
          code,
          name,
          unit_type,
          floor,
          total_m2,
          covered_m2,
          terrace_m2,
          bedrooms,
          bathrooms,
          orientation,
          status: status || 'DISPONIBLE',
        },
        include: {
          projects: true,
        },
      });

      // Si viene precio, crear registros de precio
      const pricePromises = [];
      
      if (price_clp) {
        pricePromises.push(
          prisma.unit_prices.create({
            data: {
              unit_id: unit.id,
              currency: 'CLP',
              amount: price_clp,
              valid_from: new Date(),
              created_by: userId ? BigInt(userId) : null,
            },
          })
        );
      }
      
      if (price_uf) {
        pricePromises.push(
          prisma.unit_prices.create({
            data: {
              unit_id: unit.id,
              currency: 'UF',
              amount: price_uf,
              valid_from: new Date(),
              created_by: userId ? BigInt(userId) : null,
            },
          })
        );
      }
      
      await Promise.all(pricePromises);

      res.status(201).json(unit);
    } catch (error: any) {
      console.error('Error creating unit:', error);
      
      if (error.code === 'P2002') {
        return res.status(409).json({ 
          error: 'Ya existe una unidad con ese código en el proyecto' 
        });
      }
      
      res.status(500).json({ error: 'Error al crear unidad' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
