// File: pages/api/erp/bank-movements/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

/**
 * Convierte parámetros tipo ?account=1,2,3 a array de números
 */
function toNumberArray(input: string | string[] | undefined) {
  if (!input) return [];
  const raw = Array.isArray(input) ? input[0] : input;
  return raw
    .split(',')
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Método ${req.method} no permitido` });
  }

  try {
    // === Parámetros de entrada ===
    const companyId = Array.isArray(req.query.company)
      ? Number(req.query.company[0])
      : Number(req.query.company);

    const bankAccountIds = toNumberArray(
      (req.query.bank_account_id ??
        req.query.bank_account ??
        req.query.account) as string | string[] | undefined
    );

    // Parámetro para excluir movimientos ya asociados a una obligación
    const excludeObligation = req.query.excludeObligation
      ? (Array.isArray(req.query.excludeObligation) 
          ? req.query.excludeObligation[0] 
          : req.query.excludeObligation)
      : undefined;

    if (!companyId || isNaN(companyId)) {
      return res.status(400).json({ message: 'Falta parámetro company válido' });
    }

    // === Determinar cuentas bancarias a consultar ===
    let accountIds: number[] = [];
    if (bankAccountIds.length > 0) {
      accountIds = bankAccountIds;
    } else {
      const found = await prisma.bank_accounts.findMany({
        where: { company_id: companyId },
        select: { id: true },
      });
      accountIds = found.map((a) => a.id);
    }

    if (accountIds.length === 0) {
      return res.status(200).json([]); // Empresa sin cuentas aún
    }

    // === Obtener IDs de movimientos a excluir (si se especifica una obligación) ===
    let excludedMovementIds: bigint[] = [];
    if (excludeObligation) {
      const matches = await prisma.movement_matches.findMany({
        where: { obligation_id: BigInt(excludeObligation) },
        select: { movement_id: true },
      });
      excludedMovementIds = matches.map(m => m.movement_id);
      console.log(`[bank-movements] Excluyendo ${excludedMovementIds.length} movimientos asociados a obligación ${excludeObligation}`);
    }

    // === Consulta principal ===
    const movements = await prisma.bank_movements.findMany({
      where: { 
        bank_account_id: { in: accountIds },
        ...(excludedMovementIds.length > 0 && {
          id: { notIn: excludedMovementIds }
        })
      },
      include: {
        bank_accounts: { select: { bank_name: true, account_no: true } },
        projects: { select: { name: true } },
        sub_accounts: {
          select: { name: true, cost_centers: { select: { name: true } } },
        },
        movement_matches: true,
      },
      orderBy: { bank_date: 'desc' },
    });

    if (movements.length === 0) {
      return res.status(200).json([]); // No hay movimientos
    }

    // === Tasas UF por fecha ===
    const dates = Array.from(
      new Set(movements.map((m) => m.bank_date.toISOString().slice(0, 10)))
    );

    const ufRates = await prisma.uf_rates.findMany({
      where: { date: { in: dates.map((d) => new Date(d)) } },
    });

    const ufMap = new Map<string, number>(
      ufRates.map((u) => [
        u.date.toISOString().slice(0, 10),
        parseFloat(u.uf_value.toString()),
      ])
    );

    // === Formateo final para frontend ===
    const formatted = movements.map((m) => {
      const dateKey = m.bank_date.toISOString().slice(0, 10);
      const matchedAmount = m.movement_matches.reduce(
        (sum, mm) => sum + parseFloat(mm.matched_amount.toString()),
        0
      );

      return {
        id: m.id.toString(),
        bank_account_id: m.bank_account_id,
        bank_date: dateKey,
        debit: m.debit ? parseFloat(m.debit.toString()) : null,
        credit: m.credit ? parseFloat(m.credit.toString()) : null,
        currency: m.currency,
        source: m.source || null,
        import_date: m.import_date.toISOString().slice(0, 10),
        accountName: `${m.bank_accounts.bank_name} ${m.bank_accounts.account_no}`,
        projectName: m.projects?.name || null,
        description: m.description || null,
        subAccountName: m.sub_accounts?.name || null,
        costCenterName: m.sub_accounts?.cost_centers?.name || null,
        matched: m.movement_matches.length > 0,
        matchedAmount,
        ufValue: ufMap.get(dateKey) ?? null,
      };
    });

    console.log(`[bank-movements] Devolviendo ${formatted.length} movimientos para company=${companyId}${excludeObligation ? `, excludeObligation=${excludeObligation}` : ''}`);
    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error en /api/bank-movements:', error);
    return res.status(500).json({ message: 'Error interno al obtener movimientos' });
  }
}
