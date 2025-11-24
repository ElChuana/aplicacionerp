const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function normName(s){
  return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
}

function normRut(s){
  return (s||'').toString().toUpperCase().replace(/\./g,'').replace(/\s+/g,'').replace(/-/g,'');
}

async function mergeByRut(){
  const all = await prisma.providers.findMany({ select: { id:true, name:true, rut:true } });
  const byRut = new Map();
  for(const p of all){
    if(!p.rut) continue;
    const key = normRut(p.rut);
    if(!byRut.has(key)) byRut.set(key, []);
    byRut.get(key).push(p);
  }
  const actions = [];
  for(const [rut, list] of byRut.entries()){
    if(list.length <= 1) continue;
    // canonical: menor id
    const sorted = list.slice().sort((a,b)=>a.id-b.id);
    const canonical = sorted[0];
    const dups = sorted.slice(1);
    actions.push({ rut, canonical, dups });
  }
  let movedTotal = 0, deletedTotal = 0;
  for(const act of actions){
    const dupIds = act.dups.map(d=>d.id);
    // mover obligaciones
    const moveRes = await prisma.$executeRawUnsafe(`UPDATE obligations SET provider_id=${act.canonical.id} WHERE provider_id IN (${dupIds.join(',')})`);
    movedTotal += moveRes || 0;
    // eliminar duplicados
    if(dupIds.length){
      const delRes = await prisma.$executeRawUnsafe(`DELETE FROM providers WHERE id IN (${dupIds.join(',')})`);
      deletedTotal += delRes || 0;
    }
    console.log(`✓ RUT ${act.rut}: movidas ${moveRes||0} obligaciones -> prov ${act.canonical.id}, borrados ${act.dups.length} proveedores`);
  }
  return { groups: actions.length, movedTotal, deletedTotal };
}

async function reportByName(){
  const all = await prisma.providers.findMany({ select: { id:true, name:true, rut:true } });
  const byNorm = new Map();
  for(const p of all){
    const key = normName(p.name);
    if(!byNorm.has(key)) byNorm.set(key, []);
    byNorm.get(key).push(p);
  }
  const candidates = [];
  for(const [key, list] of byNorm.entries()){
    if(list.length <= 1) continue;
    // si hay mezcla de con rut y sin rut, reportar
    const withRut = list.filter(x=>!!x.rut);
    const withoutRut = list.filter(x=>!x.rut);
    if(withRut.length && withoutRut.length){
      candidates.push({ norm:key, withRut, withoutRut });
    }
  }
  console.log(`\n🔎 Posibles duplicados por nombre (con RUT vs sin RUT) — ${candidates.length} grupos:`);
  for(const c of candidates){
    console.log(`  • ${c.norm}`);
    console.log(`    con RUT: ${c.withRut.map(x=>`#${x.id}(${x.rut})`).join(', ')}`);
    console.log(`    sin RUT: ${c.withoutRut.map(x=>`#${x.id}`).join(', ')}`);
  }
}

async function main(){
  console.log('🚀 Merge de proveedores por RUT (Railway)');
  const res = await mergeByRut();
  console.log(`\nResumen: grupos=${res.groups}, obligaciones movidas=${res.movedTotal}, proveedores borrados=${res.deletedTotal}`);
  await reportByName();
  await prisma.$disconnect();
}

main().catch(e=>{ console.error(e); prisma.$disconnect(); process.exit(1); });
