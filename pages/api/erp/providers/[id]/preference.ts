// File: pages/api/erp/providers/[id]/preference.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  const providerId = Number(id);

  if (isNaN(providerId)) {
    return res.status(400).json({ message: 'Invalid provider ID' });
  }

  try {
    // Obtener la clasificación más usada para este proveedor
    const mostUsed = await prisma.$queryRaw<Array<{
      cost_center_id: number | null;
      sub_account_id: number | null;
      count: bigint;
    }>>`
      SELECT 
        cost_center_id,
        sub_account_id,
        COUNT(*) as count
      FROM obligations
      WHERE provider_id = ${providerId}
        AND cost_center_id IS NOT NULL
        AND sub_account_id IS NOT NULL
      GROUP BY cost_center_id, sub_account_id
      ORDER BY count DESC
      LIMIT 1
    `;

    if (mostUsed.length === 0) {
      return res.status(404).json({ 
        message: 'No preferences found',
        cost_center_id: null,
        sub_account_id: null
      });
    }

    return res.status(200).json({
      cost_center_id: mostUsed[0].cost_center_id,
      sub_account_id: mostUsed[0].sub_account_id,
      usage_count: Number(mostUsed[0].count)
    });
  } catch (error) {
    console.error('Error fetching provider preferences:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
