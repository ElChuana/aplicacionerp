import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id, company } = req.query;
  const movementId = Array.isArray(id) ? Number(id[0]) : Number(id);
  const companyId = Array.isArray(company) ? Number(company[0]) : Number(company);
  if (isNaN(movementId) || isNaN(companyId)) {
    return res.status(400).json({ message: 'Parámetros inválidos' });
  }

  try {
    const movement = await prisma.bank_movements.findUnique({
      where: { id: movementId },
      select: { id: true, debit: true, credit: true, currency: true, description: true, bank_date: true }
    });
    if (!movement) return res.status(404).json({ message: 'Movimiento no encontrado' });

    const matches = await prisma.movement_matches.findMany({
      where: { movement_id: movementId },
      select: { obligation_id: true, matched_amount: true }
    });

  let obligations: any[] = [];
    try {
      obligations = await prisma.$queryRaw<any[]>`SELECT
        id,
        provider_name,
        project_name,
        type_name,
        description,
        document_number,
        amount_original::float AS amount_original,
        currency,
        to_char(start_date, 'YYYY-MM-DD') AS start_date,
        to_char(due_date, 'YYYY-MM-DD') AS due_date,
        balance::float AS balance,
        status
      FROM obligations_summary
      WHERE company_id = ${companyId}
      ORDER BY created_at DESC`;
    } catch (viewErr) {
      console.warn('Vista obligations_summary no disponible, usando fallback directo.', viewErr);
      // Fallback: cargar obligaciones y calcular balance vía matches agregados
      const rawObls = await prisma.obligations.findMany({
        where: { projects: { company_id: companyId } },
        select: {
          id: true,
          description: true,
          document_number: true,
          amount_original: true,
          currency: true,
          provider_id: true,
          project_id: true,
          type_id: true,
          start_date: true,
          due_date: true,
          movement_matches: { select: { matched_amount: true } },
        },
        orderBy: { created_at: 'desc' }
      });
      obligations = rawObls.map(o => {
        const paid = o.movement_matches.reduce((s,m)=> s + parseFloat(m.matched_amount.toString()),0);
        const balance = parseFloat(o.amount_original.toString()) - paid;
        return {
          id: o.id,
          provider_name: '',
          project_name: '',
          type_name: '',
          description: o.description,
          document_number: o.document_number,
          amount_original: parseFloat(o.amount_original.toString()),
          currency: o.currency,
          start_date: o.start_date ? o.start_date.toISOString().split('T')[0] : null,
          due_date: o.due_date ? o.due_date.toISOString().split('T')[0] : null,
          balance,
          // Usar estados alineados a la tabla principal
          status: balance <= 0 ? 'pagada' : (o.due_date && o.due_date.getTime() < Date.now() ? 'vencida' : 'pendiente')
        };
      });
    }

    return res.status(200).json({
      movement: {
        id: String(movement.id),
        amount: parseFloat(((movement.debit ?? movement.credit ?? 0)).toString()),
        currency: movement.currency,
        description: movement.description,
        bank_date: movement.bank_date.toISOString().split('T')[0],
      },
      matches: matches.map(m => ({
        obligationId: String(m.obligation_id),
        matched_amount: parseFloat(m.matched_amount.toString()),
      })),
      obligations: obligations.map(o => ({
        id: String(o.id),
        providerName: o.provider_name,
        projectName: o.project_name,
        typeName: o.type_name,
        description: o.description,
        documentNumber: o.document_number,
        amount_original: o.amount_original,
        currency: o.currency,
        startDate: o.start_date,
        dueDate: o.due_date,
        balance: o.balance,
        status: o.status,
      })),
    });
  } catch (e: any) {
    console.error('GET /api/erp/bank-movements/[id]/obligations error', e);
    return res.status(500).json({ message: 'Error interno', detail: e?.message });
  }
}
