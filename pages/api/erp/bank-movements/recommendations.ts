// File: pages/api/erp/bank-movements/recommendations.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// Utilidades para coincidencia por nombre de proveedor
function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/[^a-z0-9\s]/g, ' ') // quita puntuación
    .replace(/\s+/g, ' ') // colapsa espacios
    .trim();
}

function providerCoreTokens(provider?: string): string[] {
  if (!provider) return [];
  const legalWords = new Set([
    'sa', 's.a', 'spa', 's.p.a', 'ltda', 'limitada', 'eirl', 'e.i.r.l',
    'cia', 'cia.', 'comercial', 'inmobiliaria', 'constructora', 'servicios',
    'empresa', 'empresas', 'sociedad', 'y', 'de', 'la', 'el'
  ]);
  const norm = normalizeText(provider);
  const tokens = norm.split(' ').filter(t => t && !legalWords.has(t) && t.length >= 3);
  return tokens;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Método ${req.method} no permitido` });
  }

  try {
    // Parámetros
    const obligationIdRaw = req.query.obligationId
      ? (Array.isArray(req.query.obligationId) ? req.query.obligationId[0] : req.query.obligationId)
      : undefined;

    if (!obligationIdRaw) {
      return res.status(400).json({ message: 'Falta parámetro obligationId' });
    }

    const obligationId = BigInt(obligationIdRaw);

    // Obtener datos de la obligación desde la vista para tener el balance calculado
    const obRows = await prisma.$queryRaw<any[]>`
      SELECT
        id,
        provider_name,
        company_id,
        balance::float,
        to_char(due_date,'YYYY-MM-DD') AS due_date
      FROM obligations_summary
      WHERE id = ${obligationId};
    `;

    if (obRows.length === 0) {
      return res.status(404).json({ message: 'Obligación no encontrada' });
    }

    const obData = obRows[0];
    const balance = Number(obData.balance);
    const providerName = obData.provider_name;
    const dueDate = obData.due_date ? new Date(obData.due_date) : null;
    const companyId = obData.company_id;

    // Obtener cuentas bancarias de la empresa
    const accounts = await prisma.bank_accounts.findMany({
      where: { company_id: companyId },
      select: { id: true },
    });
    const accountIds = accounts.map(a => a.id);

    if (accountIds.length === 0) {
      return res.status(200).json([]);
    }

    // Obtener movimientos ya asociados a esta obligación
    const matches = await prisma.movement_matches.findMany({
      where: { obligation_id: obligationId },
      select: { movement_id: true },
    });
    const excludedMovementIds = matches.map(m => m.movement_id);

    // Consultar movimientos no asociados
    const movements = await prisma.bank_movements.findMany({
      where: {
        bank_account_id: { in: accountIds },
        ...(excludedMovementIds.length > 0 && {
          id: { notIn: excludedMovementIds },
        }),
      },
      include: {
        bank_accounts: { select: { bank_name: true, account_no: true } },
        projects: { select: { name: true } },
        movement_matches: {
          include: {
            obligations: {
              select: { 
                sub_accounts: { 
                  select: { name: true, cost_centers: { select: { name: true } } } 
                } 
              }
            }
          }
        },
      },
      orderBy: { bank_date: 'desc' },
    });

    if (movements.length === 0) {
      return res.status(200).json([]);
    }

    // Calcular scores de recomendación
    const dueMonth = dueDate ? dueDate.getMonth() : null;
    const dueYear = dueDate ? dueDate.getFullYear() : null;
    const providerTokens = providerCoreTokens(providerName);

    console.log(`[recommendations] Obligación ${obligationId}: balance=${balance}, provider="${providerName}", dueDate=${dueDate?.toISOString().slice(0, 10)}`);
    console.log(`[recommendations] Provider tokens:`, providerTokens);

    const formatted = movements.map((m) => {
      const dateKey = m.bank_date.toISOString().slice(0, 10);
      const amount = m.debit ? parseFloat(m.debit.toString()) : m.credit ? parseFloat(m.credit.toString()) : 0;
      
      let suggestionScore = 0;
      let suggestionReason = '';

      // Prioridad 1: monto exacto (score = 100)
      if (amount === balance) {
        suggestionScore = 100;
        suggestionReason = 'exact_amount';
      } 
      // Prioridad 2: proveedor + mes (score = 50-80)
      else if (providerTokens.length > 0 && dueMonth !== null && dueYear !== null) {
        const movementDate = m.bank_date;
        if (movementDate.getMonth() === dueMonth && movementDate.getFullYear() === dueYear) {
          const descNorm = normalizeText(m.description || '');
          if (descNorm) {
            const descTokens = new Set(descNorm.split(' '));
            let matchedCount = 0;
            providerTokens.forEach(t => { 
              if (descTokens.has(t)) {
                matchedCount++;
                console.log(`[recommendations] Token match "${t}" in: "${m.description}"`);
              }
            });
            const tokenScore = matchedCount / providerTokens.length;
            
            if (tokenScore >= 0.4) {
              suggestionScore = 50 + Math.round(tokenScore * 30); // 50-80
              suggestionReason = 'provider_date';
              console.log(`[recommendations] Movement ${m.id}: tokenScore=${tokenScore.toFixed(2)}, suggestionScore=${suggestionScore}`);
            }
          }
        }
      }

      const matchedAmount = m.movement_matches.reduce(
        (sum, mm) => sum + parseFloat(mm.matched_amount.toString()),
        0
      );

      // Obtener clasificación de la primera obligación asociada (si existe)
      const firstMatch = m.movement_matches?.[0];
      const subAccount = firstMatch?.obligations?.sub_accounts;

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
        subAccountName: subAccount?.name || null,
        costCenterName: subAccount?.cost_centers?.name || null,
        matched: m.movement_matches.length > 0,
        matchedAmount,
        suggestionScore,
        suggestionReason,
      };
    });

    // Ordenar por score (mayor primero)
    formatted.sort((a, b) => b.suggestionScore - a.suggestionScore);

    console.log(`[recommendations] Devolviendo ${formatted.length} movimientos, top scores:`, 
      formatted.slice(0, 5).map(m => ({ id: m.id, score: m.suggestionScore, reason: m.suggestionReason, desc: m.description?.substring(0, 40) }))
    );

    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error en /api/erp/bank-movements/recommendations:', error);
    return res.status(500).json({ message: 'Error interno al obtener recomendaciones' });
  }
}
