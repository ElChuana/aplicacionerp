#!/usr/bin/env node
// Elimina subcuenta antigua 'Post Venta' (id=46) si no tiene obligaciones.
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const usage = await prisma.obligations.count({ where: { sub_account_id: 46 } });
  if (usage > 0) {
    console.log(`No se puede eliminar: todavía ${usage} obligaciones apuntan a id=46`);
  } else {
    const sa = await prisma.sub_accounts.findUnique({ where: { id: 46 } });
    if (!sa) {
      console.log('Subcuenta id=46 ya no existe.');
    } else {
      await prisma.sub_accounts.delete({ where: { id: 46 } });
      console.log('Subcuenta Post Venta (id=46) eliminada.');
    }
  }
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });