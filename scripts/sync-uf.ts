import { syncUfRates } from '../lib/uf-sync.js';

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
