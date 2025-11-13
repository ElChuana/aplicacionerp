import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🔹 Limpieza básica
function cleanText(text: string): string {
  return text
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, ' ')
    .replace(/\b(\d{4,})\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// 🔹 Conversión segura para BigInt
function replacer(key: string, value: any) {
  return typeof value === 'bigint' ? Number(value) : value;
}

async function main() {
  console.log('📡 Extrayendo movimientos clasificados...');
  const movimientos: any[] = await prisma.$queryRawUnsafe(`
    SELECT bm.id, bm.description, bm.sub_account_id, sa.cost_center_id
    FROM bank_movements bm
    JOIN sub_accounts sa ON bm.sub_account_id = sa.id
    WHERE bm.sub_account_id IS NOT NULL
  `);

  if (!movimientos.length) {
    console.error('⚠️ No hay movimientos con subcuenta asignada.');
    process.exit(1);
  }

  console.log(`✅ ${movimientos.length} movimientos encontrados`);
  const data: any[] = [];

  for (let i = 0; i < movimientos.length; i++) {
    const mov = movimientos[i];
    const text = cleanText(mov.description || '');
    if (!text) continue;

    const embResp = await openai.embeddings.create({
      input: text,
      model: 'text-embedding-3-small',
    });

    const embedding = embResp.data[0].embedding;
    data.push({
      id: Number(mov.id),
      description: text,
      sub_account_id: Number(mov.sub_account_id),
      cost_center_id: Number(mov.cost_center_id),
      embedding,
    });

    if ((i + 1) % 25 === 0) console.log(`   → Procesados ${i + 1}/${movimientos.length}`);
  }

  const outDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outFile = path.join(outDir, 'suggestion_model.json');
  fs.writeFileSync(outFile, JSON.stringify(data, replacer, 2));
  console.log(`💾 Modelo actualizado con embeddings OpenAI: ${outFile}`);
}

main()
  .catch((e) => {
    console.error('❌ Error al entrenar:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
