// File: pages/api/erp/bank-movements/import.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import Papa from 'papaparse';

export const config = {
  api: { bodyParser: false },
};

const prisma = new PrismaClient();

/**
 * 🔹 Solo acepta fechas en formato DD-MM-AA (ejemplo: 01-08-25)
 */
function parseFechaDDMMAA(fecha: string): Date | null {
  if (!fecha) return null;
  const clean = fecha.trim().replace(/\//g, '-');
  const match = clean.match(/^(\d{2})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const [_, dd, mm, yy] = match;
  const fullYear = 2000 + parseInt(yy, 10); // 25 → 2025
  const parsed = new Date(`${fullYear}-${mm}-${dd}T00:00:00`);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * 🔹 Limpia y convierte montos con puntos o comas.
 * Ejemplo: "7.000.000" → 7000000
 */
function parseMonto(valor: string | number): number {
  if (valor === undefined || valor === null) return 0;
  if (typeof valor === 'number') return valor;
  const clean = valor.replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, '');
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}

/**
 * 🔹 Endpoint: POST /api/bank-movements/import
 * Sube cartolas CSV y carga solo los movimientos nuevos.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  try {
    // Procesa el formulario con formidable
    const form = new IncomingForm();

    const [fields, files]: any = await new Promise((resolve, reject) => {
      form.parse(req, (err: any, f: any, fl: any) => (err ? reject(err) : resolve([f, fl])));
    });

    const bankAccountId = Number(fields.bankAccountId);
    if (!bankAccountId) return res.status(400).json({ error: 'Falta bankAccountId' });

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file?.filepath) return res.status(400).json({ error: 'Archivo no recibido' });

    // 🔹 Leer contenido CSV
    const content = fs.readFileSync(file.filepath, 'utf8');
  const parsed = Papa.parse(content, { header: true, skipEmptyLines: true });

    // 🔹 Parsear y limpiar datos
    type NewMovement = {
      bank_date: Date;
      description: string;
      debit: number;
      credit: number;
      currency: string;
      source: string;
      bank_account_id: number;
    };

    const movimientosRaw = (parsed.data as any[])
      .map((r) => ({
        bank_date: parseFechaDDMMAA(r.Fecha),
        description: (r.Descripcion || r.Descripción || '').trim(),
        debit: parseMonto(r.Cargo),
        credit: parseMonto(r.Abono),
        currency: 'CLP',
        source: 'cartola',
        bank_account_id: bankAccountId,
      }))
      .filter((r) => r.bank_date && (r.debit > 0 || r.credit > 0));

    const movimientos: NewMovement[] = movimientosRaw.map((m) => ({
      bank_date: m.bank_date as Date,
      description: m.description,
      debit: m.debit,
      credit: m.credit,
      currency: m.currency,
      source: m.source,
      bank_account_id: m.bank_account_id,
    }));

    if (movimientos.length === 0)
      return res.status(400).json({
        error: 'Archivo vacío o con formato inválido. Las fechas deben ser DD-MM-AA.',
      });

    // 🔹 Buscar duplicados
    const nuevos: typeof movimientos = [];
    for (const mov of movimientos) {
      const existe = await prisma.bank_movements.findFirst({
        where: {
          bank_account_id: mov.bank_account_id,
          bank_date: mov.bank_date!,
          description: mov.description,
          debit: mov.debit,
          credit: mov.credit,
        },
      });
      if (!existe) nuevos.push(mov);
    }

    // 🔹 Insertar nuevos movimientos
    if (nuevos.length > 0) {
      await prisma.bank_movements.createMany({
        data: nuevos,
        skipDuplicates: true,
      });
    }

    // 🔹 Respuesta JSON clara para el frontend
    return res.status(200).json({
      status: 'success',
      file: file.originalFilename || 'cartola.csv',
      totalFilas: movimientos.length,
      movimientosNuevos: nuevos.length,
      movimientosDuplicados: movimientos.length - nuevos.length,
      mensaje:
        nuevos.length > 0
          ? `✅ Se cargaron ${nuevos.length} movimientos nuevos (${movimientos.length - nuevos.length} duplicados).`
          : '⚠️ No se encontraron movimientos nuevos (todos ya estaban registrados).',
    });
  } catch (error: any) {
    console.error('Error al procesar cartola:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
