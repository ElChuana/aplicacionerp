// File: pages/api/erp/obligations/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { addWeeks, addMonths, addYears, isAfter } from 'date-fns';

const prisma = new PrismaClient();

// Util para parsear "YYYY-MM-DD" de forma segura como Date (00:00 local)
function parseISODate(d?: string | null): Date | null {
  if (!d) return null;
  // Fuerza a medianoche local para evitar issues de zona horaria
  const [y, m, day] = d.split('-').map(Number);
  if (!y || !m || !day) return null;
  const dt = new Date(y, m - 1, day, 0, 0, 0, 0);
  return isNaN(dt.getTime()) ? null : dt;
}

// Normaliza strings variados a 'semanal' | 'mensual' | 'anual' | 'ninguna'
function normalizeRecurrence(s?: string | null): 'semanal' | 'mensual' | 'anual' | 'ninguna' {
  if (!s) return 'ninguna';
  const v = s.toLowerCase().trim();
  if (['semanal', 'weekly', 'week'].includes(v)) return 'semanal';
  if (['mensual', 'monthly', 'month'].includes(v)) return 'mensual';
  if (['anual', 'anualidad', 'yearly', 'annual', 'year'].includes(v)) return 'anual';
  if (['ninguna', 'none', 'no', 'sin', ''].includes(v)) return 'ninguna';
  // fallback
  return 'ninguna';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // ===================== GET =====================
  if (method === 'GET') {
    const raw = req.query.company;
    const companyId = Array.isArray(raw) ? Number(raw[0]) : Number(raw);
    if (isNaN(companyId) || companyId <= 0) {
      return res.status(400).json({ message: 'Parámetro company inválido o faltante' });
    }
    try {
      // Requiere la vista obligations_summary creada en la BD
      const rows: any[] = await prisma.$queryRaw`
        SELECT
          id,
          provider_name,
          project_name,
          type_name,
          description,
          amount_original::float,
          currency,
          to_char(start_date, 'YYYY-MM-DD') AS start_date,
          to_char(due_date, 'YYYY-MM-DD') AS due_date,
          paid_amount::float,
          balance::float,
          status,
          created_at
        FROM obligations_summary
        WHERE company_id = ${companyId}
        ORDER BY start_date ASC, created_at DESC
      `;

      const result = rows.map((o: any) => ({
        id: String(o.id), // Asegura conversión a string desde bigint
        providerName: o.provider_name,
        projectName: o.project_name,
        typeName: o.type_name,
        description: o.description,
        amount: o.amount_original, // deja número (el front lo formatea)
        currency: o.currency,
        startDate: o.start_date,
        dueDate: o.due_date,
        balance: o.balance,        // deja número
        status: o.status,
      }));
      return res.status(200).json(result);
    } catch (error) {
      console.error('GET /api/obligations error:', error);
      return res.status(500).json({ message: 'Error interno al obtener obligaciones' });
    }
  }

  // ===================== POST =====================
  if (method === 'POST') {
    try {
      // Acepta camelCase o snake_case
      const project_id = Number(req.body.project_id ?? req.body.projectId);
      const type_id = Number(req.body.type_id ?? req.body.typeId);
      const provider_id = Number(req.body.provider_id ?? req.body.providerId);

      const rawAmount = req.body.amount_original ?? req.body.amount;
      const amount_original =
        typeof rawAmount === 'string' ? parseFloat(rawAmount.replace(/\./g, '').replace(',', '.')) : Number(rawAmount);

      if (
        isNaN(project_id) || project_id <= 0 ||
        isNaN(type_id)    || type_id    <= 0 ||
        isNaN(provider_id)|| provider_id<= 0 ||
        isNaN(amount_original) || amount_original <= 0
      ) {
        return res.status(400).json({
          message: 'project_id, type_id, provider_id y amount_original son obligatorios y numéricos',
        });
      }

      const currency: string = (req.body.currency ?? 'CLP').toString();

      // Fechas (formato esperado "YYYY-MM-DD")
      const firstStartDate =
        parseISODate(req.body.start_date ?? req.body.startDate) ?? new Date();
      const firstDueDate =
        parseISODate(req.body.due_date ?? req.body.dueDate) ?? firstStartDate;

      // Recurrencia normalizada
      const recurrence = normalizeRecurrence(req.body.recurrence);

      // Determinar fecha término
      let endDate: Date | null = null;
      const providedEnd = parseISODate(req.body.recurrence_end ?? req.body.recurrenceEnd);
      if (recurrence !== 'ninguna') {
        if (providedEnd) {
          endDate = providedEnd;
        } else {
          // Por defecto según tipo de recurrencia:
          // - Anual: hasta el 2099
          // - Mensual: máximo 2 años (24 meses)
          // - Semanal: máximo 1 año (52 semanas)
          const base = firstDueDate ?? firstStartDate;
          if (recurrence === 'anual') {
            endDate = new Date(2099, 11, 31); // 31 de diciembre de 2099
          } else if (recurrence === 'mensual') {
            endDate = addYears(base, 2);
          } else if (recurrence === 'semanal') {
            endDate = addYears(base, 1);
          }
        }
      }

      // Construcción del batch
      type Row = {
        project_id: number;
        type_id: number;
        provider_id: number;
        description: string | null;
        amount_original: any; // Prisma Decimal compatible
        currency: string;
        start_date: Date;
        due_date: Date | null;
      };

      const description: string | null = (req.body.description ?? null) || null;

      const batch: Row[] = [];
      if (recurrence === 'ninguna') {
        // Obligación única
        batch.push({
          project_id,
          type_id,
          provider_id,
          description,
          amount_original,
          currency,
          start_date: firstStartDate,
          due_date: firstDueDate,
        });
      } else {
        // Recurrente
        let currentStart = firstStartDate;
        let currentDue = firstDueDate;
        
        // Límite de seguridad según tipo de recurrencia
        // Anual: hasta 75 años (2025 -> 2099)
        // Mensual: 24 meses, Semanal: 52 semanas
        const maxIterations = recurrence === 'anual' ? 75 : recurrence === 'mensual' ? 24 : 52;
        let iterations = 0;

        // Loop hasta endDate (inclusive)
        while (!isAfter(currentStart, endDate!) && iterations < maxIterations) {
          batch.push({
            project_id,
            type_id,
            provider_id,
            description,
            amount_original,
            currency,
            start_date: currentStart,
            due_date: currentDue,
          });

          if (recurrence === 'semanal') {
            currentStart = addWeeks(currentStart, 1);
            currentDue = addWeeks(currentDue, 1);
          } else if (recurrence === 'mensual') {
            currentStart = addMonths(currentStart, 1);
            currentDue = addMonths(currentDue, 1);
          } else if (recurrence === 'anual') {
            currentStart = addYears(currentStart, 1);
            currentDue = addYears(currentDue, 1);
          } else {
            break; // fallback
          }

          iterations++;
        }
      }

      // Persistencia
      const created = await Promise.all(
        batch.map((data) => prisma.obligations.create({ data }))
      );

      const result = created.map((r) => ({
        id: r.id.toString(),
        project_id: r.project_id,
        type_id: r.type_id,
        provider_id: r.provider_id,
        description: r.description,
        amount_original: parseFloat(r.amount_original.toString()),
        currency: r.currency,
        start_date: r.start_date.toISOString().slice(0, 10),
        due_date: r.due_date ? r.due_date.toISOString().slice(0, 10) : null,
        created_at: r.created_at.toISOString(),
      }));

      return res.status(201).json(result);
    } catch (error) {
      console.error('POST /api/obligations error:', error);
      return res.status(500).json({ message: 'Error interno al crear obligaciones' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
