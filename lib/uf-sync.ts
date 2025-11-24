// File: lib/uf-sync.ts
import prisma from './prisma';

const CMF_API_KEY = process.env.CMF_API_KEY!;
const CMF_BASE_URL = 'https://api.cmfchile.cl/api-sbifv3/recursos_api/uf';

/**
 * 🔹 Sincroniza la UF desde hace 10 años hasta hoy (initial=true)
 * o solo el día anterior (initial=false).
 */
export async function syncUfRates(initial = false) {
  const today = new Date();
  const toISO = (d: Date) => d.toISOString().slice(0, 10);
  const ranges: { start: Date; end: Date }[] = [];

  if (initial) {
    // 🔹 Rango mensual (10 años hacia atrás)
    const start = new Date();
    start.setFullYear(start.getFullYear() - 10);
    start.setDate(1);

    for (let y = start.getFullYear(); y <= today.getFullYear(); y++) {
      for (let m = 0; m < 12; m++) {
        const first = new Date(y, m, 1);
        if (first > today) break;
        const last = new Date(y, m + 1, 0);
        if (last > today) last.setTime(today.getTime());
        ranges.push({ start: first, end: last });
      }
    }
  } else {
    // 🔹 Solo día anterior
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    ranges.push({ start: yesterday, end: today });
  }

  const inserted: { date: string; value: number }[] = [];
  const failed: string[] = [];

  for (const { start, end } of ranges) {
    // Detectar si es un rango que cubre el mes completo para usar el endpoint optimizado /uf/{year}/{month}
    const isFullMonth =
      start.getDate() === 1 &&
      start.getMonth() === end.getMonth() &&
      end.getDate() === new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
    let url: string;
    if (isFullMonth) {
      const year = start.getFullYear();
      const monthStr = String(start.getMonth() + 1).padStart(2, '0');
      url = `${CMF_BASE_URL}/${year}/${monthStr}?apikey=${CMF_API_KEY}&formato=json`;
      console.log(`🔄 Descargando UF (mes completo) ${year}-${monthStr}`);
    } else {
      url = `${CMF_BASE_URL}?apikey=${CMF_API_KEY}&formato=json&fecha_inicio=${toISO(start)}&fecha_fin=${toISO(end)}`;
      console.log(`🔄 Descargando UF (rango) ${toISO(start)} → ${toISO(end)}`);
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`⚠️ Error ${response.status} al descargar UF de ${toISO(start)} a ${toISO(end)}`);
        failed.push(`${toISO(start)} → ${toISO(end)} (${response.status})`);
        continue;
      }

      const data = await response.json();
      const entries = data.UFs || data.UF || [];
      if (!Array.isArray(entries)) {
        console.warn(`⚠️ Formato inesperado, claves: ${Object.keys(data).join(', ')}`);
        continue;
      }

      console.log(`   ↪️ Registros recibidos: ${entries.length}`);

      if (entries.length === 0) {
        console.warn(`⚠️ Sin datos para ${toISO(start)} a ${toISO(end)}`);
        continue;
      }

      for (const { Fecha, Valor } of entries) {
        let date: Date;
        if (/^\d{2}-\d{2}-\d{4}$/.test(Fecha)) {
          const [dd, mm, yyyy] = Fecha.split('-');
          date = new Date(`${yyyy}-${mm}-${dd}T00:00:00Z`);
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(Fecha)) {
          date = new Date(`${Fecha}T00:00:00Z`);
        } else {
          date = new Date(Fecha);
        }
        if (isNaN(date.getTime())) continue;
        const ufValue = parseFloat(Valor.replace(/\./g, '').replace(',', '.'));
        if (!ufValue || isNaN(ufValue)) continue;

        await prisma.uf_rates.upsert({
          where: { date },
          create: { date, uf_value: ufValue },
          update: { uf_value: ufValue },
        });
        inserted.push({ date: toISO(date), value: ufValue });
      }

      // 🔹 Espera ligera para no saturar CMF API
      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      console.error(`❌ Error procesando rango ${toISO(start)} → ${toISO(end)}:`, err);
      failed.push(`${toISO(start)} → ${toISO(end)} (error)`);
    }
  }

  console.log(`✅ Sincronización UF completada: ${inserted.length} registros actualizados.`);
  if (failed.length > 0) console.warn(`⚠️ Rangos fallidos: ${failed.length}`);

  return { total: inserted.length, failed };
}
