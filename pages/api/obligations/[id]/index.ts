// File: pages/api/obligations/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id } = req.query;
  const idNum = Array.isArray(id) ? Number(id[0]) : Number(id);
  if (isNaN(idNum)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    // 1) Detalle de la obligación desde la vista
    const obRawResult = await prisma.$queryRaw<any[]>`
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
        balance::float AS balance,
        status
      FROM obligations_summary
      WHERE id = ${idNum};
    `;
    const obRaw = obRawResult[0];

    // 2) Información del proveedor
    const providerRawResult = await prisma.$queryRaw<any[]>`
      SELECT p.id, p.name, p.rut, p.address, p.contact_name, p.contact_email, p.contact_phone
      FROM obligations o
      JOIN providers p ON o.provider_id = p.id
      WHERE o.id = ${idNum};
    `;
    const providerRaw = providerRawResult[0];

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

    // 4) Notas de crédito internas asociadas
    const creditNotesRaw = await prisma.$queryRaw<any[]>`
      SELECT
        id,
        amount::float AS amount,
        description,
        to_char(date,'YYYY-MM-DD') AS date,
        to_char(created_at,'YYYY-MM-DD') AS created_at
      FROM internal_credit_notes
      WHERE obligation_id = ${idNum}
      ORDER BY date DESC;
    `;

    // 6) Normalize types
    const obligation = {
      ...obRaw,
      id:            Number(obRaw.id),
      amount_original: Number(obRaw.amount_original),
      paid_amount:   Number(obRaw.paid_amount),
      balance:       Number(obRaw.balance),
    };
    const provider = { ...providerRaw, id: Number(providerRaw.id) };
    const movements = movementsRaw.map(m => ({
      id:            m.id.toString(),
      bank_date:     m.bank_date,
      accountName:   `${m.bank_name} ${m.account_no}`,
      description:   m.description || '',
      matched_amount: m.matched_amount,
      currency:      m.currency,
    }));
    const creditNotes = creditNotesRaw.map(cn => ({
      id:          Number(cn.id),
      amount:      Number(cn.amount),
      description: cn.description || '',
      date:        cn.date,
      created_at:  cn.created_at,
    }));

    return res.status(200).json({ obligation, provider, movements, creditNotes });
  } catch (error) {
    console.error('GET /api/obligations/[id] error:', error);
    return res.status(500).json({ message: 'Error Internacionalo al obtener detalle' });
  }
}
