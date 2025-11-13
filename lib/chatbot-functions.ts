// Funciones para consultar la base de datos desde el chatbot
import prisma from './prisma';

interface FunctionParams {
  company_id: number;
  cost_center_id?: number;
  unassigned?: boolean;
  date_from?: string;
  date_to?: string;
  status?: string;
  month?: number;
  year?: number;
}

export async function getCostCentersSummary(params: FunctionParams) {
  const { company_id } = params;
  
  // Obtener todos los centros de costo con subcuentas
  const costCenters = await prisma.cost_centers.findMany({
    include: {
      sub_accounts: true
    }
  });
  
  // Obtener movimientos que tienen subcuenta asignada
  const movements = await prisma.bank_movements.findMany({
    where: {
      bank_accounts: { company_id },
      sub_account_id: { not: null }
    },
    include: {
      sub_accounts: {
        include: {
          cost_centers: true
        }
      }
    }
  });
  
  // Agregar por centro de costo
  const summary = costCenters.map(cc => {
    const ccMovements = movements.filter(m => m.sub_accounts?.cost_center_id === cc.id);
    
    const totalCLP = ccMovements.reduce((sum, m) => {
      const amount = m.debit ? -Number(m.debit) : Number(m.credit || 0);
      return sum + amount;
    }, 0);
    
    return {
      id: cc.id,
      nombre: cc.name,
      totalCLP,
      subcuentas: cc.sub_accounts.length
    };
  });
  
  return summary.filter(s => s.totalCLP !== 0 || s.subcuentas > 0);
}

export async function getCostCenterDetail(params: FunctionParams) {
  const { company_id, cost_center_id } = params;
  
  if (!cost_center_id) {
    throw new Error('cost_center_id es requerido');
  }
  
  const costCenter = await prisma.cost_centers.findUnique({
    where: { id: cost_center_id },
    include: {
      sub_accounts: true
    }
  });
  
  if (!costCenter) {
    return { error: 'Centro de costo no encontrado' };
  }
  
  // Obtener IDs de subcuentas
  const subAccountIds = costCenter.sub_accounts.map(sa => sa.id);
  
  // Obtener movimientos de las subcuentas de este centro
  const movements = await prisma.bank_movements.findMany({
    where: {
      bank_accounts: { company_id },
      sub_account_id: { in: subAccountIds }
    },
    include: {
      sub_accounts: true
    },
    orderBy: { bank_date: 'desc' },
    take: 20
  });
  
  const totalCLP = movements.reduce((sum, m) => {
    const amount = m.debit ? -Number(m.debit) : Number(m.credit || 0);
    return sum + amount;
  }, 0);
  
  return {
    centro: costCenter.name,
    subcuentas: costCenter.sub_accounts.length,
    movimientos: movements.length,
    totalCLP,
    ultimosMovimientos: movements.slice(0, 5).map(m => ({
      fecha: m.bank_date,
      descripcion: m.description,
      monto: m.debit ? -Number(m.debit) : Number(m.credit || 0),
      subcuenta: m.sub_accounts?.name || 'Sin subcuenta'
    }))
  };
}

export async function getBankMovements(params: FunctionParams) {
  const { company_id, unassigned, date_from, date_to } = params;
  
  const where: any = {
    bank_accounts: { company_id }
  };
  
  if (unassigned) {
    where.sub_account_id = null;
  }
  
  if (date_from) {
    where.bank_date = { gte: new Date(date_from) };
  }
  
  if (date_to) {
    where.bank_date = { ...where.bank_date, lte: new Date(date_to) };
  }
  
  const movements = await prisma.bank_movements.findMany({
    where,
    include: {
      sub_accounts: {
        include: {
          cost_centers: true
        }
      }
    },
    orderBy: { bank_date: 'desc' },
    take: 50
  });
  
  const total = movements.reduce((sum, m) => {
    const amount = m.debit ? -Number(m.debit) : Number(m.credit || 0);
    return sum + amount;
  }, 0);
  
  return {
    cantidad: movements.length,
    total,
    sinAsignar: movements.filter(m => !m.sub_account_id).length,
    movimientos: movements.slice(0, 10).map(m => ({
      fecha: m.bank_date,
      descripcion: m.description?.substring(0, 50),
      monto: m.debit ? -Number(m.debit) : Number(m.credit || 0),
      centro: m.sub_accounts?.cost_centers?.name || 'Sin asignar'
    }))
  };
}

export async function getObligations(params: FunctionParams) {
  const { company_id, status = 'all' } = params;
  
  const where: any = {
    projects: { company_id }
  };
  
  if (status !== 'all') {
    where.status = status;
  }
  
  const obligations = await prisma.obligations.findMany({
    where,
    include: {
      providers: true,
      obligation_types: true,
      projects: {
        select: {
          name: true
        }
      }
    },
    orderBy: { created_at: 'desc' },
    take: 20
  });
  
  const totalAmount = obligations.reduce((sum, o) => sum + Number(o.amount_original || 0), 0);
  
  return {
    cantidad: obligations.length,
    totalMonto: totalAmount,
    obligaciones: obligations.slice(0, 10).map(o => ({
      id: Number(o.id),
      proveedor: o.providers?.name || 'Sin proveedor',
      tipo: o.obligation_types?.name || 'Sin tipo',
      proyecto: o.projects?.name || 'Sin proyecto',
      monto: Number(o.amount_original || 0),
      moneda: o.currency,
      estado: o.status,
      fecha: o.due_date
    }))
  };
}

export async function getMonthlySummary(params: FunctionParams) {
  const { company_id, month, year } = params;
  
  if (!month || !year) {
    throw new Error('month y year son requeridos');
  }
  
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  
  const movements = await prisma.bank_movements.findMany({
    where: {
      bank_accounts: { company_id },
      bank_date: {
        gte: startDate,
        lte: endDate
      }
    },
    include: {
      sub_accounts: {
        include: {
          cost_centers: true
        }
      }
    }
  });
  
  // Agrupar por centro de costo
  const byCostCenter: any = {};
  
  movements.forEach(m => {
    const centerName = m.sub_accounts?.cost_centers?.name || 'Sin asignar';
    if (!byCostCenter[centerName]) {
      byCostCenter[centerName] = { ingresos: 0, egresos: 0 };
    }
    
    const amount = Number(m.credit || 0) - Number(m.debit || 0);
    if (amount > 0) {
      byCostCenter[centerName].ingresos += amount;
    } else {
      byCostCenter[centerName].egresos += Math.abs(amount);
    }
  });
  
  const totalIngresos = Object.values(byCostCenter).reduce((sum: number, cc: any) => sum + cc.ingresos, 0);
  const totalEgresos = Object.values(byCostCenter).reduce((sum: number, cc: any) => sum + cc.egresos, 0);
  
  return {
    mes: month,
    año: year,
    totalIngresos,
    totalEgresos,
    balance: totalIngresos - totalEgresos,
    porCentro: Object.entries(byCostCenter).map(([name, data]: [string, any]) => ({
      centro: name,
      ingresos: data.ingresos,
      egresos: data.egresos,
      balance: data.ingresos - data.egresos
    }))
  };
}

// ========================================
// FUNCIONES CRM INMOBILIARIO
// ========================================

export async function getProjects(params: FunctionParams) {
  const { company_id, status } = params;
  
  const where: any = { company_id };
  
  if (status && status !== 'all') {
    where.status = status;
  }
  
  const projects = await prisma.projects.findMany({
    where,
    include: {
      _count: {
        select: { units: true }
      }
    },
    orderBy: { created_at: 'desc' }
  });
  
  return {
    cantidad: projects.length,
    proyectos: projects.map(p => ({
      id: p.id,
      codigo: p.code,
      nombre: p.name,
      tipo: p.project_type,
      estado: p.status,
      comuna: p.comuna,
      totalUnidades: p.total_units || p._count.units,
      pisos: p.floors,
      fechaEntrega: p.estimated_delivery,
      amenities: {
        piscina: p.has_pool,
        gym: p.has_gym,
        coworking: p.has_coworking,
        terraza: p.has_terrace,
        estacionamiento: p.has_parking
      }
    }))
  };
}

export async function getUnits(params: any) {
  const { project_id, status, unit_type } = params;
  
  const where: any = {};
  
  if (project_id) {
    where.project_id = project_id;
  }
  
  if (status && status !== 'all') {
    where.status = status;
  }
  
  if (unit_type && unit_type !== 'all') {
    where.unit_type = unit_type;
  }
  
  const units = await prisma.units.findMany({
    where,
    include: {
      projects: {
        select: {
          name: true,
          code: true
        }
      },
      unit_prices: {
        where: {
          valid_from: { lte: new Date() },
          OR: [
            { valid_to: null },
            { valid_to: { gte: new Date() } }
          ]
        },
        orderBy: { valid_from: 'desc' },
        take: 1
      }
    },
    orderBy: { created_at: 'desc' },
    take: 50
  });
  
  const disponibles = units.filter(u => u.status === 'DISPONIBLE').length;
  const vendidas = units.filter(u => u.status === 'VENDIDO').length;
  const reservadas = units.filter(u => u.status === 'RESERVADO').length;
  
  return {
    cantidad: units.length,
    disponibles,
    vendidas,
    reservadas,
    unidades: units.slice(0, 20).map(u => ({
      id: u.id,
      codigo: u.code,
      nombre: u.name,
      proyecto: u.projects?.name,
      tipo: u.unit_type,
      estado: u.status,
      dormitorios: u.bedrooms,
      baños: u.bathrooms,
      m2Cubiertos: u.covered_m2 ? Number(u.covered_m2) : null,
      m2Terraza: u.terrace_m2 ? Number(u.terrace_m2) : null,
      piso: u.floor,
      precio: u.unit_prices[0] ? {
        monto: Number(u.unit_prices[0].amount),
        moneda: u.unit_prices[0].currency
      } : null
    }))
  };
}

export async function getClients(params: any) {
  const { company_id, client_type } = params;
  
  const where: any = {};
  
  if (company_id) {
    where.company_id = company_id;
  }
  
  if (client_type && client_type !== 'all') {
    where.client_type = client_type;
  }
  
  const clients = await prisma.clients.findMany({
    where,
    include: {
      _count: {
        select: {
          quotations: true,
          promises: true
        }
      }
    },
    orderBy: { created_at: 'desc' },
    take: 50
  });
  
  return {
    cantidad: clients.length,
    clientes: clients.slice(0, 20).map(c => ({
      id: c.id,
      nombre: c.name,
      rut: c.rut,
      tipo: c.client_type,
      email: c.email,
      telefono: c.phone,
      cotizaciones: c._count.quotations,
      promesas: c._count.promises
    }))
  };
}

export async function getQuotations(params: any) {
  const { company_id, status, client_id } = params;
  
  const where: any = {};
  
  if (company_id) {
    where.company_id = company_id;
  }
  
  if (status && status !== 'all') {
    where.status = status;
  }
  
  if (client_id) {
    where.client_id = client_id;
  }
  
  const quotations = await prisma.quotations.findMany({
    where,
    include: {
      clients: {
        select: {
          name: true,
          rut: true
        }
      },
      quotation_items: {
        include: {
          units: {
            select: {
              name: true,
              code: true
            }
          }
        }
      }
    },
    orderBy: { created_at: 'desc' },
    take: 30
  });
  
  const totalMonto = quotations.reduce((sum, q) => sum + Number(q.total || 0), 0);
  
  return {
    cantidad: quotations.length,
    totalMonto,
    cotizaciones: quotations.slice(0, 15).map(q => ({
      id: Number(q.id),
      numero: q.number,
      cliente: q.clients?.name,
      rutCliente: q.clients?.rut,
      estado: q.status,
      montoTotal: Number(q.total || 0),
      moneda: q.currency,
      fechaValidez: q.valid_until,
      montoPie: Number(q.down_payment_amount || 0),
      unidades: q.quotation_items.map(item => ({
        unidad: item.units?.name,
        codigo: item.units?.code,
        precio: Number(item.unit_price)
      }))
    }))
  };
}

export async function getPromises(params: any) {
  const { company_id, status, client_id } = params;
  
  const where: any = {};
  
  if (company_id) {
    where.company_id = company_id;
  }
  
  if (status && status !== 'all') {
    where.status = status;
  }
  
  if (client_id) {
    where.client_id = client_id;
  }
  
  const promises = await prisma.promises.findMany({
    where,
    include: {
      clients: {
        select: {
          name: true,
          rut: true
        }
      },
      projects: {
        select: {
          name: true,
          code: true
        }
      }
    },
    orderBy: { created_at: 'desc' },
    take: 30
  });
  
  const totalPie = promises.reduce((sum, p) => sum + Number(p.downpayment_amount || 0), 0);
  const totalMonto = promises.reduce((sum, p) => sum + Number(p.total_amount || 0), 0);
  
  return {
    cantidad: promises.length,
    totalPie,
    totalMonto,
    vigentes: promises.filter(p => p.status === 'VIGENTE').length,
    cumplidas: promises.filter(p => p.status === 'CUMPLIDA').length,
    rescindidas: promises.filter(p => p.status === 'RESCINDIDA').length,
    promesas: promises.slice(0, 15).map(p => ({
      id: Number(p.id),
      numero: p.promise_number,
      cliente: p.clients?.name,
      rutCliente: p.clients?.rut,
      proyecto: p.projects?.name,
      estado: p.status,
      montoPie: Number(p.downpayment_amount || 0),
      montoTotal: Number(p.total_amount || 0),
      fechaPromesa: p.promise_date
    }))
  };
}

export async function getSalesReport(params: any) {
  const { company_id, project_id, date_from, date_to } = params;
  
  const where: any = {};
  
  if (company_id) {
    where.company_id = company_id;
  }
  
  if (project_id) {
    where.project_id = project_id;
  }
  
  if (date_from || date_to) {
    where.signature_date = {};
    if (date_from) where.signature_date.gte = new Date(date_from);
    if (date_to) where.signature_date.lte = new Date(date_to);
  }
  
  const promises = await prisma.promises.findMany({
    where: {
      ...where,
      status: { in: ['VIGENTE', 'CUMPLIDA'] }
    },
    include: {
      projects: {
        select: {
          name: true,
          code: true
        }
      }
    }
  });
  
  // Agrupar por proyecto
  const byProject: any = {};
  promises.forEach(p => {
    const projectName = p.projects?.name || 'Sin proyecto';
    if (!byProject[projectName]) {
      byProject[projectName] = {
        cantidad: 0,
        totalPie: 0,
        totalMonto: 0
      };
    }
    byProject[projectName].cantidad += 1;
    byProject[projectName].totalPie += Number(p.downpayment_amount || 0);
    byProject[projectName].totalMonto += Number(p.total_amount || 0);
  });
  
  const totalVentas = promises.length;
  const totalPie = promises.reduce((sum, p) => sum + Number(p.downpayment_amount || 0), 0);
  const totalMonto = promises.reduce((sum, p) => sum + Number(p.total_amount || 0), 0);
  
  return {
    totalVentas,
    totalPie,
    totalMonto,
    totalGeneral: totalMonto,
    porProyecto: Object.entries(byProject).map(([nombre, datos]: [string, any]) => ({
      proyecto: nombre,
      ventas: datos.cantidad,
      totalPie: datos.totalPie,
      totalMonto: datos.totalMonto,
      total: datos.totalMonto
    }))
  };
}

// Mapa de funciones disponibles
export const AVAILABLE_FUNCTIONS: Record<string, (params: any) => Promise<any>> = {
  get_cost_centers_summary: getCostCentersSummary,
  get_cost_center_detail: getCostCenterDetail,
  get_bank_movements: getBankMovements,
  get_obligations: getObligations,
  get_monthly_summary: getMonthlySummary,
  get_projects: getProjects,
  get_units: getUnits,
  get_clients: getClients,
  get_quotations: getQuotations,
  get_promises: getPromises,
  get_sales_report: getSalesReport
};

// ========================================
// MODO AVANZADO: Consultas dinámicas seguras (solo lectura)
// ========================================

const ALLOWED_DYNAMIC_SOURCES = ['obligations_summary', 'projects', 'clients'] as const;
type AllowedSource = typeof ALLOWED_DYNAMIC_SOURCES[number];

function sanitizeSql(sql: string): string {
  // Normalizar espacios
  return sql.trim().replace(/\s+/g, ' ');
}

function hasDangerousKeywords(sqlLower: string): boolean {
  const forbidden = /(insert|update|delete|alter|drop|create|grant|revoke|truncate|call|copy|execute|prepare|vacuum|analyze|refresh materialized view|\btransaction\b|\bbegin\b|\bcommit\b|\brollback\b)/i;
  return forbidden.test(sqlLower);
}

function extractFromSource(sqlLower: string): string | null {
  // Buscar FROM <identificador> [as alias]
  const m = sqlLower.match(/\bfrom\s+([a-zA-Z0-9_"\.]+)/);
  return m ? m[1].replace(/"/g, '') : null;
}

function hasJoin(sqlLower: string): boolean {
  return /\bjoin\b/i.test(sqlLower);
}

function ensureCompanyFilter(sql: string, table: AllowedSource, companyId: number): string {
  // Estas tablas/vistas tienen company_id directo
  const needsCompany = ['obligations_summary', 'projects', 'clients'].includes(table);
  if (!needsCompany) return sql;

  const lower = sql.toLowerCase();
  if (/\bcompany_id\b/.test(lower)) {
    return sql; // ya filtra por company_id
  }
  // Insertar WHERE o AND company_id = <id>
  if (/\bwhere\b/i.test(sql)) {
    return sql.replace(/\bwhere\b/i, match => `${match} company_id = ${companyId} AND `);
  }
  // Añadir WHERE al final antes de ORDER/LIMIT
  const idxOrder = sql.toLowerCase().indexOf(' order by');
  const idxLimit = sql.toLowerCase().indexOf(' limit ');
  const cut = Math.min(idxOrder > -1 ? idxOrder : sql.length, idxLimit > -1 ? idxLimit : sql.length);
  const head = sql.slice(0, cut);
  const tail = sql.slice(cut);
  return `${head} WHERE company_id = ${companyId}${tail}`;
}

function ensureLimit(sql: string, max = 100): string {
  const m = sql.match(/limit\s+(\d+)/i);
  if (!m) return `${sql} LIMIT ${max}`;
  const n = parseInt(m[1], 10);
  if (Number.isFinite(n) && n <= max) return sql;
  return sql.replace(/limit\s+\d+/i, `LIMIT ${max}`);
}

export async function runDynamicSql(params: { sql: string; company_id?: number }) {
  const companyId = params.company_id ?? 1;
  let sql = sanitizeSql(params.sql);
  const sqlLower = sql.toLowerCase();

  // Validaciones estrictas
  if (!sqlLower.startsWith('select')) {
    throw new Error('Solo se permiten consultas SELECT');
  }
  if (hasDangerousKeywords(sqlLower)) {
    throw new Error('Consulta rechazada por contener palabras clave peligrosas');
  }
  if (hasJoin(sqlLower)) {
    throw new Error('Por seguridad no se permiten JOIN en modo dinámico');
  }

  const source = extractFromSource(sqlLower);
  if (!source) {
    throw new Error('No se pudo identificar la tabla/vista en FROM');
  }

  const base = source.split('.').pop() as string; // manejar schema.table
  if (!ALLOWED_DYNAMIC_SOURCES.includes(base as AllowedSource)) {
    throw new Error(`Solo se permite consultar: ${ALLOWED_DYNAMIC_SOURCES.join(', ')}`);
  }

  // Forzar filtro por company_id cuando aplique
  sql = ensureCompanyFilter(sql, base as AllowedSource, companyId);
  // Forzar LIMIT 100
  sql = ensureLimit(sql, 100);

  // Ejecutar
  // Nota: usamos $queryRawUnsafe debido a SQL dinámico, tras validación anterior
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const rows = await (prisma as any).$queryRawUnsafe(sql);

  // Formatear respuesta básica
  const columns = rows && rows[0] ? Object.keys(rows[0]) : [];
  return {
    fuente: base,
    limite: 100,
    columnas: columns,
    filas: rows
  };
}

// Agregar a mapa de funciones disponibles
AVAILABLE_FUNCTIONS.run_dynamic_sql = runDynamicSql;
