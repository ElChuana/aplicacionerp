#!/usr/bin/env node
/*
  Script: scripts/generate_urmeneta_sql.js
  Reads the CSV "Productos_EDIFICIO_URMENETA (76).csv" and generates prisma/urmeneta.sql
  Inserts:
   - companies upsert (Inmobiliaria Urmeneta Spa)
   - projects upsert (code: urmeneta, name: Edificio Urmeneta, address/comuna as specified)
   - units inserts (departamentos: Productos Principales; estacionamientos: Productos Secundarios)
   - unit_prices inserts (P. Lista for all deptos; P. Venta cuando exista)
*/
const fs = require('fs');
const path = require('path');

const CSV_PATH = path.resolve(__dirname, '..', 'Productos_EDIFICIO_URMENETA (76).csv');
const OUT_PATH = path.resolve(__dirname, '..', 'prisma', 'urmeneta.sql');

const COMPANY_NAME = 'Inmobiliaria Urmeneta Spa';
const COMPANY_RUT = '76.899.435-8';
const COMPANY_ADDRESS = 'Rosario Norte 555, Las Condes';

const PROJECT_CODE = 'urmeneta';
const PROJECT_NAME = 'Edificio Urmeneta';
const PROJECT_ADDRESS = 'Urmeneta 32';
const PROJECT_COMUNA = 'San Bernardo';

function parseDecimal(val) {
  if (!val || val.trim() === '' || val.trim() === '--') return null;
  // replace comma decimal separator with dot
  return parseFloat(val.replace(/\./g, '').replace(',', '.'));
}

function mapStatus(s) {
  const m = (s || '').toLowerCase();
  if (m.includes('disponible')) return 'DISPONIBLE';
  if (m.includes('bloqueado')) return 'BLOQUEADO';
  if (m.includes('promes')) return 'RESERVADO'; // Promesado
  if (m.includes('escritur')) return 'VENDIDO';
  return 'DISPONIBLE';
}

function parsePrograma(p) {
  // e.g., "2D+2B" -> { bedrooms: 2, bathrooms: 2 }
  const res = { bedrooms: null, bathrooms: null };
  if (!p) return res;
  const d = p.match(/(\d+)\s*[dD]/);
  const b = p.match(/(\d+)\s*[bB]/);
  if (d) res.bedrooms = parseInt(d[1], 10);
  if (b) res.bathrooms = parseInt(b[1], 10);
  return res;
}

function sqlQuote(v) {
  if (v === null || v === undefined) return 'NULL';
  return "'" + String(v).replace(/'/g, "''") + "'";
}

function readCSV() {
  const raw = fs.readFileSync(CSV_PATH, 'utf8');
  const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0);

  // Find header for Productos Principales
  const headerIdx = lines.findIndex(l => l.toLowerCase().includes('cod;nombre') && l.toLowerCase().includes('p. lista'));
  if (headerIdx === -1) throw new Error('No header found for Productos Principales');

  const data = [];
  for (let i = headerIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    // Stop when section ends (many semicolons empty row or start of another section)
    if (line.startsWith(';;;;') || line.toLowerCase().includes('productos secundarios')) break;
    const cols = line.split(';');
    if (cols.length < 15) continue; // skip malformed

    const cod = cols[0].trim();
    const nombre = cols[1].trim();
    const orient = cols[2].trim();
    const piso = cols[3].trim();
    const m2Producto = cols[4].trim();
    const programa = cols[7].trim();
    const estado = cols[8].trim();
    const pLista = cols[9].trim();
    const pVenta = cols[10].trim();
    const supUtil = cols[12].trim();
    const supTerraza = cols[13].trim();
    const supTotal = cols[14].trim();

    // Build row object
    const { bedrooms, bathrooms } = parsePrograma(programa);
    const row = {
      cod,
      nombre,
      code: nombre, // Use "Nombre" as unit code
      name: nombre, // Nombre debe ser el número (sin prefijo)
      orientation: orient || null,
      floor: piso ? parseInt(piso, 10) : null,
      total_m2: parseDecimal(supTotal || m2Producto),
      covered_m2: parseDecimal(supUtil),
      terrace_m2: parseDecimal(supTerraza),
      bedrooms,
      bathrooms,
      status: mapStatus(estado),
      pLista: parseDecimal(pLista),
      pVenta: parseDecimal(pVenta),
    };

    // Only include rows that look like departamentos (have code/name and some surface)
    if (row.code && row.total_m2) data.push(row);
  }
  // Buscar sección de Productos Secundarios
  const secHeaderIdx = lines.findIndex(l => l.toLowerCase().includes('productos secundarios'));
  const parkings = [];
  if (secHeaderIdx !== -1) {
    // La línea siguiente debería ser el header de secundarios (Cod;Nombre;Asociado a;Estado)
    for (let i = secHeaderIdx + 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line || line.trim().length === 0) break;
      // cortar cuando ya no haya suficientes columnas o aparezcan separadores vacíos
      const cols = line.split(';');
      if (cols.length < 4) break;
      if (cols[0].toLowerCase() === 'cod' && cols[1].toLowerCase() === 'nombre') continue;

      const cod = (cols[0] || '').trim();
      const nombre = (cols[1] || '').trim(); // e.g., ESTACIONAMIENTO 03
      const estado = (cols[3] || '').trim();

      if (!nombre || !nombre.toLowerCase().includes('estacionamiento')) continue;

      const numMatch = nombre.match(/(\d{1,3})/);
      const numStr = numMatch ? numMatch[1] : cod || nombre;
      const code = `E${numStr}`;

      parkings.push({
        cod,
        nombre,
        code,
        name: numStr, // nombre como número puro
        status: mapStatus(estado),
      });
    }
  }

  return { depts: data, parkings };
}

function generateSQL(depts, parkings) {
  const parts = [];
  parts.push('BEGIN;');

  // Upsert company and get id
  parts.push(`-- Upsert company`);
  parts.push(`INSERT INTO companies (name, rut, address) VALUES (${sqlQuote(COMPANY_NAME)}, ${sqlQuote(COMPANY_RUT)}, ${sqlQuote(COMPANY_ADDRESS)})\n  ON CONFLICT (name) DO UPDATE SET rut = EXCLUDED.rut, address = EXCLUDED.address;`);
  parts.push(`WITH c AS (SELECT id FROM companies WHERE name = ${sqlQuote(COMPANY_NAME)})`);

  // Upsert project and get id via CTE chain
  parts.push(`, up as (INSERT INTO projects (company_id, code, name, address, comuna)\n    SELECT id, ${sqlQuote(PROJECT_CODE)}, ${sqlQuote(PROJECT_NAME)}, ${sqlQuote(PROJECT_ADDRESS)}, ${sqlQuote(PROJECT_COMUNA)} FROM c\n    ON CONFLICT (company_id, code) DO UPDATE SET name = EXCLUDED.name, address = EXCLUDED.address, comuna = EXCLUDED.comuna\n    RETURNING id)\nSELECT 1;`);

  // For readability, fetch project_id into a psql variable-like via a subselect per insert
  parts.push(`-- Insert departamentos`);
  depts.forEach((r, idx) => {
    const unitInsert = `WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = ${sqlQuote(COMPANY_NAME)} AND p.code = ${sqlQuote(PROJECT_CODE)}),\n  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)\n    SELECT project_id, ${sqlQuote(r.code)}, ${sqlQuote(r.name)}, 'DEPARTAMENTO', 'DISPONIBLE', ${r.bedrooms ?? 'NULL'}, ${r.bathrooms ?? 'NULL'}, ${r.total_m2 ?? 'NULL'}, ${r.covered_m2 ?? 'NULL'}, ${r.terrace_m2 ?? 'NULL'}, ${r.floor ?? 'NULL'}, ${sqlQuote(r.orientation)} FROM proj\n    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation\n    RETURNING id)`;
    const prices = [];
    if (r.pLista !== null) {
      prices.push(`INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', ${r.pLista}, CURRENT_DATE${r.pVenta !== null ? " - INTERVAL '1 day'" : ''}, 'Lista' FROM ins`);
    }
    if (r.pVenta !== null) {
      prices.push(`INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', ${r.pVenta}, CURRENT_DATE, 'Venta' FROM ins`);
    }
    // Join all statements in one CTE chain finishing with semicolon
    if (prices.length > 0) {
      parts.push(unitInsert + ',\n' + prices.map((p, i) => `  p${i+1} AS (${p})`).join(',\n') + '\nSELECT 1;');
    } else {
      parts.push(unitInsert + '\nSELECT 1 FROM ins;');
    }
  });

  // Estacionamientos
  if (parkings && parkings.length > 0) {
    parts.push(`\n-- Insert estacionamientos`);
    parkings.forEach(p => {
      const parkInsert = `WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = ${sqlQuote(COMPANY_NAME)} AND p.code = ${sqlQuote(PROJECT_CODE)}),\n  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)\n    SELECT project_id, ${sqlQuote(p.code)}, ${sqlQuote(p.name)}, 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj\n    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status\n    RETURNING id),\n  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)\nSELECT 1;`;
      parts.push(parkInsert);
    });
  }

  // CRM pending actions summary (no inserts here)
  const toReserve = depts.filter(r => r.status === 'RESERVADO').map(r => r.code);
  const toDeed = depts.filter(r => r.status === 'VENDIDO').map(r => r.code);
  if (toReserve.length || toDeed.length) {
    parts.push(`\n-- TODO CRM: Generar reservas/promesas/escrituras (no se insertan automáticamente)`);
    if (toReserve.length) {
      parts.push(`-- Unidades a RESERVAR (crear quotation + promise): ${toReserve.join(', ')}`);
    }
    if (toDeed.length) {
      parts.push(`-- Unidades ESCRITURADAS (crear deed sobre promise): ${toDeed.join(', ')}`);
    }
    parts.push(`-- Datos faltantes: client_id, fechas y montos en CLP. Indica si deseas crear clientes placeholder y monto basado en P. Venta (UF) convertido a CLP.`);
  }

  parts.push('COMMIT;');
  return parts.join('\n\n');
}

function main() {
  const { depts, parkings } = readCSV();
  console.log(`Found ${depts.length} departamentos rows.`);
  console.log(`Found ${parkings.length} estacionamientos rows.`);
  const sql = generateSQL(depts, parkings);
  fs.writeFileSync(OUT_PATH, sql, 'utf8');
  console.log(`Generated SQL at ${OUT_PATH}`);
}

main();
