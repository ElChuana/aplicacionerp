const {PrismaClient}=require('@prisma/client');
const p=new PrismaClient();
(async()=>{
  const r=await p.$queryRaw`SELECT id,provider_name,cost_center_id,cost_center_name,sub_account_id,sub_account_name FROM obligations_summary WHERE company_id=1 ORDER BY id LIMIT 10`;
  console.log('Datos vista obligations_summary:');
  r.forEach(row => console.log(`ID=${row.id} | Provider=${row.provider_name} | CC_ID=${row.cost_center_id} | CC_Name=${row.cost_center_name} | SA_ID=${row.sub_account_id} | SA_Name=${row.sub_account_name}`));
  await p.$disconnect();
})();
