const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  
  const dataLines = lines.slice(1);
  const rows = [];
  
  for (const line of dataLines) {
    const parts = line.split(';');
    if (parts.length < 8) continue;
    
    rows.push({
      tipo: parts[0].trim(),
      folio: parts[1].trim(),
      fecha: parts[2].trim(),
      proveedor: parts[3].trim(),
      exento: parseFloat(parts[4].replace(/\./g, '').replace(',', '.')),
      neto: parseFloat(parts[5].replace(/\./g, '').replace(',', '.')),
      iva: parseFloat(parts[6].replace(/\./g, '').replace(',', '.')),
      total: parseFloat(parts[7].replace(/\./g, '').replace(',', '.')),
    });
  }
  
  return rows;
}

function extractRutAndName(proveedor) {
  const match = proveedor.match(/^([\d\.\-K]+)\s+(.+)$/);
  if (match) {
    return {
      rut: match[1].trim(),
      name: match[2].trim(),
    };
  }
  return {
    rut: '',
    name: proveedor.trim(),
  };
}

function parseDateDDMMYYYY(dateStr) {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}

async function main() {
  console.log('🚀 Iniciando importación de facturas...\n');
  
  const csvPath = path.join(__dirname, '../csvinserts/facturasdeeneroajunio.csv');
  const rows = parseCSV(csvPath);
  
  console.log(`📄 ${rows.length} facturas encontradas en CSV\n`);
  
  // Extraer proveedores únicos
  const proveedoresMap = new Map();
  
  for (const row of rows) {
    const { rut, name } = extractRutAndName(row.proveedor);
    if (rut) {
      proveedoresMap.set(rut, { rut, name });
    }
  }
  
  console.log(`👥 ${proveedoresMap.size} proveedores únicos encontrados\n`);
  
  // Verificar proveedores existentes
  const existingProviders = await prisma.providers.findMany({
    where: {
      rut: {
        in: Array.from(proveedoresMap.keys()),
      },
    },
  });
  
  const existingRuts = new Set(existingProviders.map(p => p.rut));
  console.log(`✅ ${existingRuts.size} proveedores ya existen en la BD`);
  
  // Crear proveedores faltantes
  const newProviders = [];
  for (const [rut, data] of proveedoresMap) {
    if (!existingRuts.has(rut)) {
      newProviders.push(data);
    }
  }
  
  console.log(`➕ ${newProviders.length} proveedores nuevos a crear\n`);
  
  if (newProviders.length > 0) {
    console.log('Creando proveedores...');
    for (const provider of newProviders) {
      await prisma.providers.create({
        data: {
          name: provider.name,
          rut: provider.rut,
        },
      });
      console.log(`  ✓ ${provider.name} (${provider.rut})`);
    }
    console.log('');
  }
  
  // Obtener todos los proveedores actualizados
  const allProviders = await prisma.providers.findMany({
    where: {
      rut: {
        in: Array.from(proveedoresMap.keys()),
      },
    },
  });
  
  const providersByRut = new Map(allProviders.map(p => [p.rut, p]));
  
  // Obtener proyectos y tipos de obligación disponibles
  const projects = await prisma.projects.findMany({
    select: { id: true, name: true, code: true },
  });
  
  const obligationTypes = await prisma.obligation_types.findMany({
    select: { id: true, name: true },
  });
  
  console.log(`📊 Proyectos disponibles:`);
  projects.forEach(p => console.log(`  - ID ${p.id}: ${p.code} - ${p.name}`));
  console.log('');
  
  console.log(`📋 Tipos de obligación disponibles:`);
  obligationTypes.forEach(t => console.log(`  - ID ${t.id}: ${t.name}`));
  console.log('');
  
  // CONFIGURAR ESTOS VALORES:
  const PROJECT_ID = process.env.PROJECT_ID ? parseInt(process.env.PROJECT_ID) : 0;
  const OBLIGATION_TYPE_ID = process.env.OBLIGATION_TYPE_ID ? parseInt(process.env.OBLIGATION_TYPE_ID) : 0;
  
  if (PROJECT_ID === 0 || OBLIGATION_TYPE_ID === 0) {
    console.log('⚠️  Para crear las obligaciones, ejecuta:');
    console.log('');
    console.log('   PROJECT_ID=<id_proyecto> OBLIGATION_TYPE_ID=<id_tipo> node scripts/import-facturas-csv.js');
    console.log('');
    console.log('   Ejemplo: PROJECT_ID=1 OBLIGATION_TYPE_ID=2 node scripts/import-facturas-csv.js');
    console.log('');
    await prisma.$disconnect();
    return;
  }
  
  // Validar que existen
  const projectExists = projects.find(p => p.id === PROJECT_ID);
  const typeExists = obligationTypes.find(t => t.id === OBLIGATION_TYPE_ID);
  
  if (!projectExists) {
    console.log(`❌ Proyecto con ID ${PROJECT_ID} no existe`);
    await prisma.$disconnect();
    return;
  }
  
  if (!typeExists) {
    console.log(`❌ Tipo de obligación con ID ${OBLIGATION_TYPE_ID} no existe`);
    await prisma.$disconnect();
    return;
  }
  
  console.log(`📍 Proyecto seleccionado: ${projectExists.code} - ${projectExists.name}`);
  console.log(`📝 Tipo de obligación: ${typeExists.name}`);
  console.log('');
  
  // Crear obligaciones
  console.log('💰 Creando obligaciones...\n');
  
  let createdCount = 0;
  let errorCount = 0;
  
  for (const row of rows) {
    try {
      const { rut } = extractRutAndName(row.proveedor);
      const provider = providersByRut.get(rut);
      
      if (!provider) {
        console.log(`⚠️  Proveedor no encontrado: ${row.proveedor}`);
        errorCount++;
        continue;
      }
      
      const fecha = parseDateDDMMYYYY(row.fecha);
      
      let description = `${row.tipo} #${row.folio}`;
      
      await prisma.obligations.create({
        data: {
          project_id: PROJECT_ID,
          provider_id: provider.id,
          type_id: OBLIGATION_TYPE_ID,
          description: description,
          amount_original: row.total,
          currency: 'CLP',
          start_date: fecha,
          due_date: fecha,
          status: 'pendiente',
        },
      });
      
      createdCount++;
      
      if (createdCount % 10 === 0) {
        console.log(`  ✓ ${createdCount} obligaciones creadas...`);
      }
    } catch (error) {
      console.error(`❌ Error: ${row.tipo} #${row.folio}`, error.message);
      errorCount++;
    }
  }
  
  console.log('');
  console.log('═══════════════════════════════════════');
  console.log('✨ Importación completada');
  console.log(`  ✓ ${createdCount} obligaciones creadas`);
  if (errorCount > 0) {
    console.log(`  ⚠️  ${errorCount} errores`);
  }
  console.log('═══════════════════════════════════════');
  
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error('Error fatal:', error);
  prisma.$disconnect();
  process.exit(1);
});
