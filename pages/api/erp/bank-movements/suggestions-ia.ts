import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import OpenAI from 'openai';

// ⚙️ Inicializa cliente
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🧹 Limpieza de texto
function cleanText(text: string): string {
  return text
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, ' ')
    .replace(/\b(\d{4,})\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// 🔹 Similitud coseno
function cosine(a: number[], b: number[]): number {
  const dot = a.reduce((s, v, i) => s + v * b[i], 0);
  const normA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const normB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  return normA && normB ? dot / (normA * normB) : 0;
}

// 📦 Cargar modelo entrenado localmente
import fs from 'fs';
import path from 'path';
const modelPath = path.join(process.cwd(), 'data/suggestion_model.json');
let modelData: any[] = [];
if (fs.existsSync(modelPath)) {
  modelData = JSON.parse(fs.readFileSync(modelPath, 'utf8'));
  console.log(`✅ Modelo entrenado cargado con ${modelData.length} registros`);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    let { description } = req.query;
    if (typeof description !== 'string') {
      return res.status(400).json({ error: 'Descripción requerida' });
    }

    description = cleanText(description);
    if (!description) return res.status(400).json({ error: 'Descripción vacía' });

    if (!modelData.length) {
      return res.status(500).json({ error: 'Modelo entrenado no disponible' });
    }

    // 1️⃣ Generar embedding con OpenAI
    const embResp = await openai.embeddings.create({
      input: description,
      model: 'text-embedding-3-small',
    });
    const queryVec = embResp.data[0].embedding;

    // 2️⃣ Calcular similitud contra el modelo local
    const similitudes = modelData.map((r) => ({
      ...r,
      similarity: cosine(queryVec, r.embedding),
    }));

    similitudes.sort((a, b) => b.similarity - a.similarity);
    const best = similitudes[0];

    if (!best || best.similarity < 0.60) {
      return res.status(200).json({
        sugerencia: null,
        confidence: best?.similarity || 0,
        reason: 'Sin coincidencias relevantes',
      });
    }

    // 3️⃣ Obtener subcuenta y centro
    const sub = await prisma.sub_accounts.findUnique({
      where: { id: best.sub_account_id },
      include: { cost_centers: true },
    });

    if (!sub) {
      return res.status(200).json({
        sugerencia: null,
        confidence: best.similarity,
        reason: 'Subcuenta no encontrada en BD',
      });
    }

    return res.status(200).json({
      sugerencia: {
        sub_account_id: sub.id,
        cost_center_id: sub.cost_centers?.id,
        sub_account_name: sub.name,
        cost_center_name: sub.cost_centers?.name,
      },
      confidence: best.similarity,
      reason: `Embedding OpenAI (${(best.similarity * 100).toFixed(1)}%)`,
    });
  } catch (error: any) {
    console.error('❌ Error en sugerencia IA OpenAI:', error);
    return res.status(500).json({ error: 'Error generando sugerencia IA con OpenAI' });
  }
}
