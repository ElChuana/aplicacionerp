// File: pages/api/erp/sub-accounts/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { cost_center_id, name } = req.body;

    // Validaciones
    if (!cost_center_id || !name) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const costCenterId = Number(cost_center_id);
    if (isNaN(costCenterId)) {
      return res.status(400).json({ error: 'ID de centro de costo inválido' });
    }

    // Verificar que el centro de costo existe
    const costCenter = await prisma.cost_centers.findUnique({
      where: { id: costCenterId }
    });

    if (!costCenter) {
      return res.status(404).json({ error: 'Centro de costo no encontrado' });
    }

    // Obtener el último código usado en este centro de costo
    const lastSubAccount = await prisma.sub_accounts.findFirst({
      where: { cost_center_id: costCenterId },
      orderBy: { code: 'desc' }
    });

    // Generar el siguiente código automáticamente
    let nextCode = '001';
    if (lastSubAccount) {
      const lastCodeNum = parseInt(lastSubAccount.code, 10);
      if (!isNaN(lastCodeNum)) {
        nextCode = String(lastCodeNum + 1).padStart(3, '0');
      }
    }

    // Crear la subcuenta con código automático
    const subAccount = await prisma.sub_accounts.create({
      data: {
        cost_center_id: costCenterId,
        code: nextCode,
        name: name.trim()
      }
    });

    return res.status(201).json(subAccount);
  } catch (error: any) {
    console.error('Error al crear subcuenta:', error);
    return res.status(500).json({ error: 'Error interno al crear subcuenta' });
  }
}
