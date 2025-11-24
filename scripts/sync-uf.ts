// Ajuste import: removemos la extensión .js para permitir ejecución con ts-node sobre TypeScript
// Import con extensión explícita para compatibilidad ts-node ESM
import { syncUfRates } from '../lib/uf-sync';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Cargar primero .env.local (Railway) luego fallback .env
try {
  const root = path.join(__dirname, '..');
  const envLocal = path.join(root, '.env.local');
  if (fs.existsSync(envLocal)) {
    dotenv.config({ path: envLocal });
  }
  dotenv.config();
  console.log('[UF SYNC] DATABASE_URL destino:', process.env.DATABASE_URL?.slice(0,60)+'...');
} catch (e) {
  console.warn('[UF SYNC] No se pudo cargar variables de entorno:', e);
}

(async () => {
  console.log('🔄 Iniciando sincronización completa de UF desde CMF...');
  try {
    await syncUfRates(true);
    console.log('✅ Sincronización completada correctamente.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al sincronizar UF:', err);
    process.exit(1);
  }
})();
