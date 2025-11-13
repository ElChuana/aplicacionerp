// File: lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { syncUfRates } from './uf-sync';

declare global {
  // En desarrollo, reutiliza la misma instancia
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

// Sincronizar UF si no está actualizada para hoy
(async function initUfSync() {
  try {
    const todayISO = new Date().toISOString().slice(0, 10);
    const ufToday = await prisma.uf_rates.findUnique({ where: { date: new Date(todayISO) } });
    if (!ufToday) {
      console.log('Sin UF para hoy, sincronizando últimos días...');
      await syncUfRates(false);
      console.log('UF actualizada para hoy');
    } else {
      console.log('UF de hoy ya existe en la base de datos, omitiendo sincronización');
    }
  } catch (e) {
    console.error('Error en sincronización de UF:', e);
  }
})();

export default prisma;