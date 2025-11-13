// File: pages/api/uf-sync.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { syncUfRates } from '../../lib/uf-sync';

type UFResponse = { uf_value: number; date: string };
type SyncResponse = { message: string; total?: number };
type ErrorResponse = { message: string };

function normalizeToUTC(date: Date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UFResponse | SyncResponse | ErrorResponse>
) {
  // 🔹 POST → forzar sincronización manual
  if (req.method === 'POST') {
    try {
      const result = await syncUfRates(false);
      return res.status(200).json({
        message: `Sincronización completada con ${result.total} registros actualizados`,
        total: result.total,
      });
    } catch (e: any) {
      console.error('UF sync error:', e);
      return res.status(500).json({ message: 'Error al sincronizar UF' });
    }
  }

  // 🔹 GET → obtener UF actual o por fecha
  if (req.method === 'GET') {
    try {
      const dateParam = Array.isArray(req.query.date)
        ? req.query.date[0]
        : (req.query.date as string | undefined);

      let uf;
      if (dateParam) {
        const target = normalizeToUTC(new Date(dateParam));
        uf = await prisma.uf_rates.findUnique({ where: { date: target } });
      } else {
        const today = normalizeToUTC(new Date());
        uf = await prisma.uf_rates.findUnique({ where: { date: today } });
      }

      // 🔹 Fallback: si no hay UF del día, toma la última disponible
      if (!uf) {
        uf = await prisma.uf_rates.findFirst({ orderBy: { date: 'desc' } });
        if (!uf) {
          return res.status(404).json({ message: 'No hay datos UF disponibles' });
        }
      }

      return res.status(200).json({
        uf_value: parseFloat(uf.uf_value.toString()),
        date: uf.date.toISOString().slice(0, 10),
      });
    } catch (e: any) {
      console.error('UF fetch error:', e);
      return res.status(500).json({ message: 'Error al obtener UF' });
    }
  }

  // 🔹 Otros métodos → error
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
