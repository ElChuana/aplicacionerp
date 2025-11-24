const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  const dataLines = lines.slice(1);
  const rows = [];
  for (const line of dataLines) {
    const parts = line.split(';');
    if (parts.length < 8) continue;
    rows.push({
      tipo: parts[0].trim(),
      folio: parts[1].trim(),
      fecha: parts[2].trim(),
      proveedor: parts[3].trim(),
      exento: parseFloat(parts[4].replace(/\./g, '').replace(',', '.')) || 0,
      neto: parseFloat(parts[5].replace(/\./g, '').replace(',', '.')) || 0,
      iva: parseFloat(parts[6].replace(/\./g, '').replace(',', '.')) || 0,
      total: parseFloat(parts[7].replace(/\./g, '').replace(',', '.')) || 0,
    });
  }
  return rows;
}

function extractRutAndName(proveedor) {
  const match = proveedor.match(/^([\d\.\-Kk]+)\s+(.+)$/);
  if (match) {
    return { rut: match[1].trim().toUpperCase(), name: match[2].trim() };
  }
  return { rut: '', name: proveedor.trim() };
}

function parseDateDDMMYYYY(dateStr) {
  const [day, month, year] = dateStr.split('/').map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function classifyProvider(name, tipoDoc) {
  const n = name.toLowerCase();
  if (tipoDoc.startsWith('N/C')) return 'Nota de Crédito';
  if (n.includes('constructora') || n.includes('construccion') || n.includes('construcciones')) return 'Construcción';
  if (n.includes('arquitectura') || n.includes('diseno') || n.includes('diseño') || n.includes('arquitecto')) return 'Arquitectura';
  if (n.includes('capacitac')) return 'Capacitación';
  if (n.includes('estudio juridico') || n.includes('juridico') || n.includes('abogado')) return 'Asesoría Legal';
  if (n.includes('tributario') || n.includes('contable') || n.includes('contabilidad')) return 'Asesoría Tributaria';
  if (n.includes('seguro')) return 'Seguros';
  if (n.includes('orsan')) return 'Seguros de Crédito';
  if (n.includes('plan ok') || n.includes('nubox')) return 'Software';
  if (n.includes('banco')) return 'Gastos Bancarios';
  if (n.includes('tepille') || n.includes('seguridad')) return 'Seguridad';
  if (n.includes('sodimac') || n.includes('cencosud') || n.includes('homecenter') || n.includes('ferreter') || n.includes('kleber')) return 'Materiales y Retail';
  if (n.includes('orion')) return 'Seguros';
  if (n.includes('fenix')) return 'Servicios Varios';
  return 'Servicios Varios';
}

function sqlEscape(str) {
  return str.replace(/'/g, "''");
}

function formatCL(n) {
  const x = Math.round(n);
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

async function main() {
  const PROJECT_ID = 2; // Según tu instrucción anterior
  const csvPath = path.join(__dirname, '../csvinserts/facturasdeeneroajunio.csv');
  const outDir = path.join(__dirname, 'out');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const rows = parseCSV(csvPath);
  const enr = rows.map(r => {
    const { rut, name } = extractRutAndName(r.proveedor);
    const typeName = classifyProvider(name, r.tipo);
    const startDate = parseDateDDMMYYYY(r.fecha);
    return { ...r, rut, providerName: name, typeName, startDate };
  });

  const ruts = Array.from(new Set(enr.map(e => e.rut).filter(Boolean)));
  const providers = await prisma.providers.findMany({ where: { rut: { in: ruts } } });
  const providersByRut = new Map(providers.map(p => [p.rut, p]));

  const missingProviders = enr
    .map(e => ({ rut: e.rut, name: e.providerName }))
    .filter(e => e.rut && !providersByRut.has(e.rut))
    .reduce((acc, cur) => { acc.set(cur.rut, cur); return acc; }, new Map());

  // Proveedores inserts
  let providersSQL = '';
  if (missingProviders.size > 0) {
    providersSQL += '-- Proveedores faltantes\n';
    missingProviders.forEach(p => {
      providersSQL += `INSERT INTO providers (name, rut, created_at) SELECT '${sqlEscape(p.name)}', '${p.rut}', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='${p.rut}');\n`;
    });
  } else {
    providersSQL += '-- No hay proveedores nuevos\n';
  }
  fs.writeFileSync(path.join(outDir, 'providers_inserts.sql'), providersSQL, 'utf-8');

  // Duplicados de obligaciones: traer existentes por proveedor y rango fechas
  const minDate = '2025-01-01';
  const maxDate = '2025-06-30';
  const providerIds = providers.map(p => p.id);
  const existingObl = await prisma.obligations.findMany({
    where: {
      provider_id: { in: providerIds.length ? providerIds : [-1] },
      start_date: { gte: new Date(minDate), lte: new Date(maxDate) }
    },
    select: { provider_id: true, start_date: true, amount_original: true, description: true }
  });
  const dupKey = (pid, date, amount, desc) => `${pid}|${date}|${amount}|${desc||''}`;
  const existsSet = new Set(existingObl.map(o => dupKey(o.provider_id, o.start_date.toISOString().slice(0,10), Number(o.amount_original), o.description||'')));

  // Generar inserts de obligaciones agrupados por tipo sugerido
  let obligationsSQL = '';
  const byType = new Map();
  for (const e of enr) {
    if (!byType.has(e.typeName)) byType.set(e.typeName, []);
    byType.get(e.typeName).push(e);
  }

  obligationsSQL += `-- Proyecto destino: ${PROJECT_ID}\n`;
  obligationsSQL += `-- Tipos se resuelven por nombre con subquery. Si no existe, el INSERT no se ejecuta.\n\n`;

  for (const [typeName, list] of byType.entries()) {
    obligationsSQL += `-- Tipo: ${typeName} — ${list.length} docs\n`;
    for (const e of list) { 
      const desc = `${e.tipo} #${e.folio}`;
      const amount = e.tipo.startsWith('N/C') ? -Math.abs(e.total) : e.total;
      // SQL portable: resuelve provider_id y type_id por subquery y evita duplicados
      const rutEsc = sqlEscape(e.rut);
      const typeEsc = sqlEscape(typeName);
      const descEsc = sqlEscape(desc);
      obligationsSQL +=
        `INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)\n` +
        `SELECT ${PROJECT_ID},\n` +
        `       (SELECT p.id FROM providers p WHERE p.rut='${rutEsc}'),\n` +
        `       (SELECT t.id FROM obligation_types t WHERE t.name='${typeEsc}'),\n` +
        `       '${descEsc}', ${amount}, 'CLP', '${e.startDate}', '${e.startDate}', 'pendiente'\n` +
        `WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='${rutEsc}')\n` +
        `  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='${typeEsc}')\n` +
        `  AND NOT EXISTS (\n` +
        `    SELECT 1 FROM obligations o\n` +
        `    WHERE o.project_id=${PROJECT_ID}\n` +
        `      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='${rutEsc}')\n` +
        `      AND o.description='${descEsc}'\n` +
        `      AND o.start_date='${e.startDate}'\n` +
        `      AND o.amount_original=${amount}\n` +
        `  );\n`;
    }
    obligationsSQL += '\n';
  }

  fs.writeFileSync(path.join(outDir, 'obligations_inserts.sql'), obligationsSQL, 'utf-8');

  // Resumen en consola
  console.log('✅ Generado scripts/out/providers_inserts.sql');
  console.log('✅ Generado scripts/out/obligations_inserts.sql');

  // Extra: mostrar totales por tipo
  console.log('\n🧭 Resumen por tipo sugerido:');
  for (const [typeName, list] of byType.entries()) {
    const total = list.reduce((s, x) => s + (x.tipo.startsWith('N/C') ? -Math.abs(x.total) : x.total), 0);
    console.log(`  - ${typeName}: ${list.length} docs — $${formatCL(total)} CLP`);
  }

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); prisma.$disconnect(); process.exit(1); });
