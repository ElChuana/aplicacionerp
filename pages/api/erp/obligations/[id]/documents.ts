// File: pages/api/erp/obligations/[id]/documents.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import prisma from '../../../../../lib/prisma';

type ErrorResponse = { error: string };
type Document = { id: number; file_name: string; file_path: string; uploaded_at: string };
	export const config = {
  api: { bodyParser: false },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'obligations');

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Document[] | Document | ErrorResponse>
) {
  const { id } = req.query;
  const obligationId = Array.isArray(id) ? Number(id[0]) : Number(id);
  if (isNaN(obligationId)) {
    return res.status(400).json({ error: 'ID de obligación inválido' });
  }

  if (req.method === 'GET') {
    try {
      const docs = await prisma.obligation_documents.findMany({
        where: { obligation_id: obligationId },
        orderBy: { uploaded_at: 'desc' },
      });
      const result: Document[] = docs.map(d => ({
        id: d.id,
        file_name: d.file_name,
        file_path: d.file_path,
        uploaded_at: d.uploaded_at.toISOString(),
      }));
      return res.status(200).json(result);
    } catch (e: any) {
      console.error(e);
      return res.status(500).json({ error: 'Error al listar documentos' });
    }
  }

  if (req.method === 'POST') {
    ensureDir(uploadDir);
  const form = new IncomingForm({ multiples: false, uploadDir, keepExtensions: true });
  form.parse(req, async (err: any, fields: any, files: any) => {
      if (err || !files.file) {
        console.error(err);
        return res.status(400).json({ error: 'Error al procesar archivo' });
      }
      try {
        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        const origName = file.originalFilename || path.basename(file.filepath);
        const newName = `${Date.now()}-${origName}`;
        const destPath = path.join(uploadDir, String(obligationId));
        ensureDir(destPath);
        const finalPath = path.join(destPath, newName);
        fs.renameSync(file.filepath, finalPath);
        const publicPath = `/uploads/obligations/${obligationId}/${newName}`;
        const doc = await prisma.obligation_documents.create({
          data: {
            obligation_id: obligationId,
            file_name: origName,
            file_path: publicPath,
          }
        });
        return res.status(201).json({
          id: doc.id,
          file_name: doc.file_name,
          file_path: doc.file_path,
          uploaded_at: doc.uploaded_at.toISOString(),
        });
      } catch (e: any) {
        console.error(e);
        return res.status(500).json({ error: 'Error al guardar documento' });
      }
    });
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
