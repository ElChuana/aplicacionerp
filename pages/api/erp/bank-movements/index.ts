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

    // Búsqueda por descripción (?description= / ?q= )
    const rawDesc = (req.query.description || req.query.q) as string | string[] | undefined;
    const descriptionSearch = rawDesc
      ? (Array.isArray(rawDesc) ? rawDesc[0] : rawDesc).trim()
      : '';

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
        }),
        ...(descriptionSearch.length > 1 && {
          // Filtrar solo si hay más de 1 caracter para evitar consultas inútiles
          description: { contains: descriptionSearch, mode: 'insensitive' }
        })
      },
      include: {
        bank_accounts: { select: { bank_name: true, account_no: true } },
        projects: { select: { name: true } },
        movement_matches: true,
      },
      orderBy: { bank_date: 'desc' },
    });

    if (movements.length === 0) {
      return res.status(200).json([]); // No hay movimientos
    }

    // === Tasas UF por fecha ===
    // Se reemplaza "IN" por rango min-max para evitar problemas de timezone y casting Date
    const dateKeys = movements.map(m => {
      const d = m.bank_date;
      // Normalizar a YYYY-MM-DD (UTC) usando componentes para evitar desfase
      const yyyy = d.getUTCFullYear();
      const mm = String(d.getUTCMonth() + 1).padStart(2,'0');
      const dd = String(d.getUTCDate()).padStart(2,'0');
      return `${yyyy}-${mm}-${dd}`;
    });
    const uniqueDateKeys = Array.from(new Set(dateKeys));
    const minKey = uniqueDateKeys.reduce((a,b)=> a < b ? a : b);
    const maxKey = uniqueDateKeys.reduce((a,b)=> a > b ? a : b);

    const ufRates = await prisma.uf_rates.findMany({
      where: {
        date: {
          gte: new Date(minKey + 'T00:00:00.000Z'),
          lte: new Date(maxKey + 'T00:00:00.000Z')
        }
      }
    });

    // Si no recuperamos nada y hay fechas, intentar fallback individual por cada fecha
    let ufFallbackCount = 0;
    if (ufRates.length === 0 && uniqueDateKeys.length > 0) {
      const individually: { date: Date; uf_value: any }[] = [];
      for (const k of uniqueDateKeys) {
        const found = await prisma.uf_rates.findUnique({ where: { date: new Date(k+'T00:00:00.000Z') } });
        if (found) individually.push(found as any);
      }
      if (individually.length > 0) {
        ufFallbackCount = individually.length;
        (ufRates as any).push(...individually);
      }
    }

    // Construir dos mapas: uno usando UTC y otro usando toISOString directo (por si hay desfase de TZ)
    const ufMapUTC = new Map<string, number>();
    const ufMapISO = new Map<string, number>();
    for (const u of ufRates) {
      const yyyy = u.date.getUTCFullYear();
      const mm = String(u.date.getUTCMonth() + 1).padStart(2,'0');
      const dd = String(u.date.getUTCDate()).padStart(2,'0');
      const keyUTC = `${yyyy}-${mm}-${dd}`;
      const keyISO = u.date.toISOString().slice(0,10);
      const val = parseFloat(u.uf_value.toString());
      ufMapUTC.set(keyUTC, val);
      ufMapISO.set(keyISO, val);
    }

    // 🔎 Instrumentación temporal para depurar fechas UF no encontradas
    if (process.env.NODE_ENV !== 'production') {
      const missingBoth = uniqueDateKeys.filter(d => !ufMapUTC.has(d) && !ufMapISO.has(d));
      // Info de la base de datos (sanitizar credenciales)
      const dbUrl = process.env.DATABASE_URL || ''; 
      let dbInfo = ''; 
      try { 
        const u = new URL(dbUrl); 
        dbInfo = `${u.protocol}//${u.hostname}${u.port?':'+u.port:''}/${u.pathname.replace('/','')}`; 
      } catch {}
      console.log(`[bank-movements] DB origen: ${dbInfo}`);
      console.log(`[bank-movements] UF recuperadas=${ufRates.length} (fallback individuales=${ufFallbackCount}) | fechas únicas=${uniqueDateKeys.length} | faltantes(en ambos mapas)=${missingBoth.length}`);
      if (missingBoth.length) console.log('[bank-movements] Faltan UF para (primeras 15):', missingBoth.slice(0,15));
      if (ufRates[0]) console.log('[bank-movements] Ejemplo UF raw:', ufRates[0].date, 'iso=', ufRates[0].date.toISOString());
    }

    // === Formateo final para frontend ===
    const formatted = movements.map((m) => {
      const dateKey = (() => {
        const d = m.bank_date;
        const yyyy = d.getUTCFullYear();
        const mm = String(d.getUTCMonth() + 1).padStart(2,'0');
        const dd = String(d.getUTCDate()).padStart(2,'0');
        return `${yyyy}-${mm}-${dd}`;
      })();
      const matchedAmount = m.movement_matches.reduce(
        (sum, mm) => sum + parseFloat(mm.matched_amount.toString()),
        0
      );

      // Buscar UF en cualquiera de los dos mapas
      const ufVal = ufMapUTC.get(dateKey) ?? ufMapISO.get(dateKey) ?? null;
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
        matched: m.movement_matches.length > 0,
        matchedAmount,
        ufValue: ufVal,
        // Conversión directa a UF por conveniencia frontend
        debitUf: m.debit && ufVal ? parseFloat(m.debit.toString()) / ufVal : null,
        creditUf: m.credit && ufVal ? parseFloat(m.credit.toString()) / ufVal : null,
      };
    });

  console.log(`[bank-movements] Devolviendo ${formatted.length} movimientos para company=${companyId}${excludeObligation ? `, excludeObligation=${excludeObligation}` : ''}${descriptionSearch ? `, description~='${descriptionSearch}'` : ''}`);
    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error en /api/bank-movements:', error);
    return res.status(500).json({ message: 'Error interno al obtener movimientos' });
  }
}
