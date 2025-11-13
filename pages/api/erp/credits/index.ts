// File: pages/api/erp/credits/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { addMonths, differenceInDays, isBefore } from 'date-fns';
import prisma from '../../../../lib/prisma';

type ErrorResponse = { error: string };
type CreditResponse = {
  id: number;
  providerName: string;
  interest_rate_pct: number;
  start_date: string;
  end_date: string | null;
  amortization_scheme: string | null;
  interest_frequency: string;
  interest_type: string;
  capital_schedule: any;
};
type SuccessResponse = { creditId: number };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreditResponse[] | SuccessResponse | ErrorResponse>
) {
  // ===============================================
  // GET /api/credits: listar créditos filtrados por compañía
  // ===============================================
  if (req.method === 'GET') {
    try {
      const rawCompany = req.query.company;
      const companyId = rawCompany
        ? Number(Array.isArray(rawCompany) ? rawCompany[0] : rawCompany)
        : null;

      // ✅ CORRECCIÓN: filtra por projects.company_id
      const whereFilter = companyId
        ? { obligations: { some: { projects: { company_id: companyId } } } }
        : {};

      const credits = await prisma.credits.findMany({
        where: whereFilter,
        include: {
          obligations: {
            select: {
              providers: { select: { name: true } },
            },
          },
        },
        orderBy: { id: 'desc' },
      });

      const result: CreditResponse[] = credits.map((c) => ({
        id: Number(c.id),
        providerName: c.obligations[0]?.providers.name || '-',
        interest_rate_pct: Number(c.interest_rate_pct),
        start_date: c.start_date.toISOString().slice(0, 10),
        end_date: c.end_date ? c.end_date.toISOString().slice(0, 10) : null,
        amortization_scheme: c.amortization_scheme,
        interest_frequency: c.interest_frequency,
        interest_type: c.interest_type,
        capital_schedule: c.capital_schedule,
      }));

      return res.status(200).json(result);
    } catch (error: any) {
      console.error('GET /api/credits error:', error);
      return res
        .status(500)
        .json({ error: 'Error interno al obtener créditos' });
    }
  }

  // ===============================================
  // POST /api/credits: crear crédito y generar obligaciones
  // ===============================================
  if (req.method === 'POST') {
    try {
      const {
        projectId,
        providerId,
        typeId,
        amount,
        currency,
        interestRatePct,
        startDate: startDateStr,
        endDate: endDateStr,
        amortizationScheme,
        interestFrequency,
        interestType,
        capitalSchedule,
      } = req.body;

      // Validación de campos obligatorios
      if (
        projectId == null ||
        providerId == null ||
        typeId == null ||
        amount == null ||
        !currency ||
        interestRatePct == null ||
        !startDateStr ||
        !interestFrequency ||
        !interestType ||
        !Array.isArray(capitalSchedule)
      ) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }

      const start = new Date(startDateStr);
      const end = endDateStr ? new Date(endDateStr) : null;
      if (end && !isBefore(start, end)) {
        return res
          .status(400)
          .json({ error: 'endDate debe ser posterior a startDate' });
      }

      let principal = Number(amount);
      if (isNaN(principal) || principal <= 0) {
        return res.status(400).json({ error: 'Monto principal inválido' });
      }

      // Crear crédito
      const credit = await prisma.credits.create({
        data: {
          interest_rate_pct: Number(interestRatePct),
          start_date: start,
          end_date: end,
          amortization_scheme: amortizationScheme || null,
          interest_frequency: interestFrequency,
          capital_schedule: capitalSchedule,
          interest_type: interestType,
        },
      });

      // Mapeo de frecuencia en meses
      const freqMap: Record<string, number> = {
        mensual: 1,
        bimestral: 2,
        trimestral: 3,
        cuatrimestral: 4,
        semestral: 6,
        anual: 12,
      };
      const stepMonths = freqMap[interestFrequency] || 1;

      const obligationsData: Array<any> = [];

      // Generación de obligaciones de interés
      if (end) {
        let cursor = start;
        while (isBefore(cursor, end)) {
          const next = addMonths(cursor, stepMonths);
          if (!isBefore(cursor, next) || (end && next > end)) break;

          const days = differenceInDays(next, cursor);
          const yearDays = 365;
          let interestAmt =
            principal * (Number(interestRatePct) / 100) * (days / yearDays);
          if (interestType === 'compuesto') {
            interestAmt =
              principal *
              (Math.pow(1 + Number(interestRatePct) / 100, days / yearDays) - 1);
          }

          obligationsData.push({
            credit_id: credit.id,
            project_id: Number(projectId),
            provider_id: Number(providerId),
            type_id: Number(typeId),
            description: `Interés ${interestFrequency} (${cursor
              .toISOString()
              .slice(0, 10)} → ${next.toISOString().slice(0, 10)})`,
            amount_original: parseFloat(interestAmt.toFixed(2)),
            currency,
            start_date: cursor,
            due_date: next,
          });

          if (interestType === 'compuesto') principal += interestAmt;
          cursor = next;
        }
      }

      // Generación de obligaciones de capital según el plan
      for (const entry of capitalSchedule) {
        const pct = Number(entry.percentage);
        if (isNaN(pct) || pct <= 0) continue;
        const capAmt = parseFloat((Number(amount) * (pct / 100)).toFixed(2));
        obligationsData.push({
          credit_id: credit.id,
          project_id: Number(projectId),
          provider_id: Number(providerId),
          type_id: Number(typeId),
          description: `Amortización capital ${pct}%`,
          amount_original: capAmt,
          currency,
          start_date: start,
          due_date: new Date(entry.period),
        });
      }

      // Insertar obligaciones generadas
      if (obligationsData.length > 0) {
        await prisma.obligations.createMany({ data: obligationsData });
      }

      return res.status(201).json({ creditId: Number(credit.id) });
    } catch (error: any) {
      console.error('POST /api/credits error:', error);
      return res
        .status(500)
        .json({ error: 'Error interno al crear crédito' });
    }
  }

  // ===============================================
  // MÉTODOS NO PERMITIDOS
  // ===============================================
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
