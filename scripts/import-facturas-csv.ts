import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface FacturaRow {
  tipo: string;
  folio: string;
  fecha: string;
  proveedor: string;
  exento: number;
  neto: number;
  iva: number;
  total: number;
}

function parseCSV(filePath: string): FacturaRow[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  
  // Saltar header
  const dataLines = lines.slice(1);
  
  const rows: FacturaRow[] = [];
  
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

function extractRutAndName(proveedor: string): { rut: string; name: string } {
  // Formato: "76.393.861-1 CAPACITACIONES LUIS FELIPE MERINO DE LA SOTTA  E.I.R.L."
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

function parseDateDDMMYYYY(dateStr: string): Date {
  // Formato: "24/02/2025"
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}

async function main() {
  console.log('🚀 Iniciando importación de facturas...\n');
  
  const csvPath = path.join(__dirname, '../csvinserts/facturasdeeneroajunio.csv');
  const rows = parseCSV(csvPath);
  
  console.log(`📄 ${rows.length} facturas encontradas en CSV\n`);
  
  // Extraer proveedores únicos
  const proveedoresMap = new Map<string, { rut: string; name: string }>();
  
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
  const newProviders: Array<{ rut: string; name: string }> = [];
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
  
  const providersByRut = new Map(allProviders.map(p => [p.rut!, p]));
  
  // Obtener proyectos y tipos de obligación disponibles
  const projects = await prisma.projects.findMany({
    select: { id: true, name: true, code: true },
  });
  
  const obligationTypes = await prisma.obligation_types.findMany({
    select: { id: true, name: true },
  });
  
  console.log(`📊 Proyectos disponibles:`);
  projects.forEach(p => console.log(`  - ${p.code}: ${p.name} (ID: ${p.id})`));
  console.log('');
  
  console.log(`📋 Tipos de obligación disponibles:`);
  obligationTypes.forEach(t => console.log(`  - ${t.name} (ID: ${t.id})`));
  console.log('');
  
  // Preguntar por el proyecto y tipo de obligación
  console.log('⚠️  ATENCIÓN: Necesitas especificar manualmente:');
  console.log('  1. El ID del proyecto al que pertenecen estas facturas');
  console.log('  2. El ID del tipo de obligación (probablemente "Factura" o similar)');
  console.log('');
  console.log('Debes editar este script y configurar PROJECT_ID y OBLIGATION_TYPE_ID');
  console.log('');
  
  // CONFIGURAR ESTOS VALORES:
  const PROJECT_ID = 0; // ⚠️ CAMBIAR por el ID del proyecto correcto
  const OBLIGATION_TYPE_ID = 0; // ⚠️ CAMBIAR por el ID del tipo de obligación correcto
  
  if (PROJECT_ID === 0 || OBLIGATION_TYPE_ID === 0) {
    console.log('❌ Por favor configura PROJECT_ID y OBLIGATION_TYPE_ID en el script');
    console.log('   Ejecuta de nuevo después de configurar los valores');
    await prisma.$disconnect();
    return;
  }
  
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
      
      // Determinar descripción según tipo
      let description = `${row.tipo} #${row.folio} - ${provider.name}`;
      
      await prisma.obligations.create({
        data: {
          project_id: PROJECT_ID,
          provider_id: provider.id,
          type_id: OBLIGATION_TYPE_ID,
          description: description,
          amount_original: row.total,
          currency: 'CLP',
          start_date: fecha,
          due_date: fecha, // Puedes ajustar esto según necesites
          status: 'pendiente',
        },
      });
      
      createdCount++;
      
      if (createdCount % 10 === 0) {
        console.log(`  ✓ ${createdCount} obligaciones creadas...`);
      }
    } catch (error) {
      console.error(`❌ Error al crear obligación: ${row.tipo} #${row.folio}`, error);
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
