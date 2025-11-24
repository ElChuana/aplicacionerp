const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main(){
  try{
    const rows = await prisma.$queryRawUnsafe("SELECT current_database() as db, inet_server_addr()::text as host, inet_server_port() as port, current_user as user");
    console.log(rows);
  } finally {
    await prisma.$disconnect();
  }
}
main().catch(e=>{ console.error(e); process.exit(1); });
