import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// Lista de estados visibles en Kanban
export const LEAD_STATUSES = [
  'INGRESADO',
  'LLAMADO',
  'SEGUIMIENTO',
  'NEGOCIANDO',
  'DESCARTADO',
  'CONVERTIDO'
] as const;

type LeadStatus = typeof LEAD_STATUSES[number];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const rawCompany = req.query.company;
    const companyId = rawCompany ? Number(Array.isArray(rawCompany) ? rawCompany[0] : rawCompany) : null;
    try {
      // Uso de SQL directo mientras no se ejecute migración/generate
      const rows: any[] = await prisma.$queryRawUnsafe(
        `SELECT id, name, email, phone, source, status, notes, budget_clp, budget_uf, created_at
         FROM leads ${companyId ? 'WHERE company_id = $1' : ''} ORDER BY created_at DESC`,
         ...(companyId ? [companyId] : [])
      );
      return res.status(200).json(rows.map(r => ({
        id: r.id?.toString(),
        name: r.name,
        email: r.email,
        phone: r.phone,
        source: r.source,
        status: r.status,
        notes: r.notes,
        budget_clp: r.budget_clp != null ? parseFloat(r.budget_clp) : null,
        budget_uf: r.budget_uf != null ? parseFloat(r.budget_uf) : null,
        created_at: r.created_at,
      })));
    } catch (e: any) {
      console.error('GET /api/crm/leads error', e);
      return res.status(500).json({ message: 'Error interno (¿migración leads aplicada?)' });
    }
  }

  if (req.method === 'POST') {
    const { name, email, phone, source, status, notes, budgetCLP, budgetUF, companyId, projectId, clientId } = req.body;
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Nombre requerido' });
    }
    const normalizedStatus: LeadStatus = LEAD_STATUSES.includes((status || 'INGRESADO').toUpperCase()) ? (status || 'INGRESADO').toUpperCase() as LeadStatus : 'INGRESADO';
    try {
      const inserted: any[] = await prisma.$queryRawUnsafe(
        `INSERT INTO leads (name, email, phone, source, status, notes, budget_clp, budget_uf, company_id, project_id, client_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`,
         name, email || null, phone || null, source || null, normalizedStatus, notes || null,
         budgetCLP != null ? budgetCLP : null,
         budgetUF != null ? budgetUF : null,
         companyId || null,
         projectId || null,
         clientId || null
      );
      return res.status(201).json({ id: inserted[0].id.toString() });
    } catch (e: any) {
      console.error('POST /api/crm/leads error', e);
      return res.status(500).json({ message: 'Error interno (¿migración leads aplicada?)' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
