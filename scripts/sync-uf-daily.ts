import { syncUfRates } from '../lib/uf-sync';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Prioridad a .env.local para apuntar a Railway en ejecución diaria
try {
  const root = path.join(__dirname, '..');
  const envLocal = path.join(root, '.env.local');
  if (fs.existsSync(envLocal)) dotenv.config({ path: envLocal });
  dotenv.config();
  console.log('[UF DAILY] DATABASE_URL destino:', process.env.DATABASE_URL?.slice(0,60)+'...');
} catch(e) {
  console.warn('[UF DAILY] No se pudo cargar variables de entorno:', e);
}

(async () => {
  console.log('[UF DAILY] Iniciando sincronización incremental UF (día anterior)...');
  try {
    const result = await syncUfRates(false);
    console.log(`[UF DAILY] Registros procesados: ${result.total}`);
    if (result.failed.length) {
      console.warn('[UF DAILY] Rangos fallidos:', result.failed.join(', '));
    }
    console.log('[UF DAILY] Finalizado correctamente.');
    process.exit(0);
  } catch (err) {
    console.error('[UF DAILY] Error en sincronización:', err);
    process.exit(1);
  }
})();
