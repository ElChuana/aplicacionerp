// File: pages/api/erp/obligations/[id]/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import { Prisma } from '@prisma/client';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!['GET','PATCH'].includes(req.method || '')) {
    res.setHeader('Allow', ['GET','PATCH']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id } = req.query;
  const idNum = Array.isArray(id) ? Number(id[0]) : Number(id);
  if (isNaN(idNum)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    if (req.method === 'PATCH') {
      const body = req.body || {};
      const data: any = {};
      if (typeof body.description === 'string') data.description = body.description;
  if (body.amount_original != null && !isNaN(Number(body.amount_original))) data.amount_original = new Prisma.Decimal(Number(body.amount_original));
      if (typeof body.currency === 'string') data.currency = body.currency;
      if (typeof body.status === 'string') data.status = body.status;
      if (typeof body.start_date === 'string') data.start_date = new Date(body.start_date);
      if (body.due_date === null) data.due_date = null;
      else if (typeof body.due_date === 'string') data.due_date = new Date(body.due_date);

      // Clasificación (centro de costo / subcuenta)
      if (body.cost_center_id != null) {
        const ccId = Number(body.cost_center_id);
        if (!isNaN(ccId)) data.cost_center_id = ccId; else return res.status(400).json({ message: 'cost_center_id inválido' });
      }
      if (body.sub_account_id != null) {
        const saId = Number(body.sub_account_id);
        if (!isNaN(saId)) data.sub_account_id = saId; else return res.status(400).json({ message: 'sub_account_id inválido' });
      }

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'No hay campos válidos para actualizar' });
      }

      const updated = await prisma.obligations.update({
        where: { id: BigInt(idNum) },
        data,
      });
      return res.status(200).json({ ok: true, id: String(updated.id) });
    }
    // 1) Detalle de la obligación desde la vista
    const obRows = await prisma.$queryRaw<any[]>`
      SELECT
        id,
        provider_name,
        project_name,
        type_name,
        description,
        amount_original::float AS amount_original,
        currency,
        to_char(start_date,'YYYY-MM-DD') AS start_date,
        to_char(due_date,'YYYY-MM-DD') AS due_date,
        paid_amount::float AS paid_amount,
        credit_notes_total::float AS credit_notes_total,
        balance::float AS balance,
        status,
        cost_center_id,
        cost_center_name,
        sub_account_id,
        sub_account_code,
        sub_account_name
      FROM obligations_summary
      WHERE id = ${idNum};
    `;
    const [obRaw] = obRows;

    // 1.5) Notas de crédito DTE
    const dteNotes = await prisma.dte_documents.findMany({
      where: { obligation_id: BigInt(idNum), type: 'NOTA_CREDITO' },
      orderBy: { issue_date: 'desc' }
    });
    // 1.6) Notas de crédito internas
    const internalNotesRows = await prisma.$queryRaw<any[]>`
      SELECT id, amount::float AS amount, description, to_char(date,'YYYY-MM-DD') AS date, to_char(created_at,'YYYY-MM-DD') AS created_at
      FROM internal_credit_notes
      WHERE obligation_id = ${idNum}
      ORDER BY date DESC;
    `;

    // 2) Información del proveedor
    const providerRows = await prisma.$queryRaw<any[]>`
      SELECT p.id, p.name, p.rut, p.address, p.contact_name, p.contact_email, p.contact_phone
      FROM obligations o
      JOIN providers p ON o.provider_id = p.id
      WHERE o.id = ${idNum};
    `;
    const [providerRaw] = providerRows;

    // 3) Movimientos asociados con todos los campos requeridos
    const movementsRaw = await prisma.$queryRaw<any[]>`
      SELECT
        bm.id,
        to_char(bm.bank_date,'YYYY-MM-DD') AS bank_date,
        ba.bank_name,
        ba.account_no,
        bm.description,
        mm.matched_amount::float AS matched_amount,
        bm.currency
      FROM movement_matches mm
      JOIN bank_movements bm       ON mm.movement_id    = bm.id
      JOIN bank_accounts ba        ON bm.bank_account_id = ba.id
      WHERE mm.obligation_id = ${idNum}
      ORDER BY bm.bank_date DESC;
    `;

    // 4) Normalize types
    const obligation = {
      ...obRaw,
      id:               Number(obRaw.id),
      amount_original:  Number(obRaw.amount_original),
      paid_amount:      Number(obRaw.paid_amount),
      credit_notes_total: Number(obRaw.credit_notes_total ?? 0),
      balance:          Number(obRaw.balance),
      cost_center_id: obRaw.cost_center_id || null,
      cost_center_name: obRaw.cost_center_name || null,
      sub_account_id: obRaw.sub_account_id || null,
      sub_account_code: obRaw.sub_account_code || null,
      sub_account_name: obRaw.sub_account_name || null,
    };
    const provider = { ...providerRaw, id: Number(providerRaw.id) };
    const movements = (movementsRaw as any[]).map(m => ({
      id:            m.id.toString(),
      bank_date:     m.bank_date,
      accountName:   `${m.bank_name} ${m.account_no}`,
      description:   m.description || '',
      matched_amount: m.matched_amount,
      currency:      m.currency,
    }));

    // Unificar formato de notas de crédito
    const creditNotes = [
      ...dteNotes.map(n => ({
        id: Number(n.id),
        amount: Number(n.total_amount),
        description: `DTE NC Folio ${n.folio}`,
        date: n.issue_date.toISOString().slice(0,10),
        source: 'DTE'
      })),
      ...internalNotesRows.map(n => ({
        id: Number(n.id),
        amount: Number(n.amount),
        description: n.description || '',
        date: n.date,
        source: 'INTERNA'
      }))
    ];

    return res.status(200).json({ 
      obligation: { ...obligation }, 
      provider, 
      movements,
      creditNotes
    });
  } catch (error) {
    console.error('GET /api/obligations/[id] error:', error);
    return res.status(500).json({ message: 'Error interno al obtener detalle' });
  }
}
