import type { NextApiRequest, NextApiResponse } from 'next';
import ExcelJS from 'exceljs';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { startDate, endDate, companyId, projectId } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ 
        error: 'Se requieren parámetros: startDate, endDate' 
      });
    }

    // Consultar movimientos bancarios con sus asociaciones a obligaciones
    const movements = await prisma.bank_movements.findMany({
      where: {
        bank_date: {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        },
        ...(companyId && { 
          bank_accounts: { company_id: Number(companyId) } 
        }),
        ...(projectId && { project_id: Number(projectId) }),
      },
      include: {
        bank_accounts: {
          select: {
            bank_name: true,
            account_no: true,
            companies: {
              select: {
                name: true,
              },
            },
          },
        },
        projects: {
          select: {
            name: true,
            code: true,
          },
        },
        movement_matches: {
          include: {
            obligations: {
              include: {
                providers: {
                  select: {
                    name: true,
                    rut: true,
                  },
                },
                obligation_types: {
                  select: {
                    name: true,
                  },
                },
                cost_centers: {
                  select: {
                    name: true,
                  },
                },
                sub_accounts: {
                  select: {
                    name: true,
                    code: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        bank_date: 'asc',
      },
    });

    // Consultar obligaciones del período (para incluir las no pagadas también)
    const obligations = await prisma.obligations.findMany({
      where: {
        OR: [
          {
            start_date: {
              gte: new Date(startDate as string),
              lte: new Date(endDate as string),
            },
          },
          {
            due_date: {
              gte: new Date(startDate as string),
              lte: new Date(endDate as string),
            },
          },
        ],
        ...(projectId && { project_id: Number(projectId) }),
        ...(companyId && {
          projects: {
            company_id: Number(companyId),
          },
        }),
      },
      include: {
        providers: {
          select: {
            name: true,
            rut: true,
          },
        },
        obligation_types: {
          select: {
            name: true,
          },
        },
        projects: {
          select: {
            name: true,
            code: true,
            companies: {
              select: {
                name: true,
              },
            },
          },
        },
        cost_centers: {
          select: {
            name: true,
          },
        },
        sub_accounts: {
          select: {
            name: true,
            code: true,
          },
        },
        movement_matches: {
          include: {
            bank_movements: {
              select: {
                id: true,
                bank_date: true,
                description: true,
                debit: true,
                credit: true,
              },
            },
          },
        },
      },
      orderBy: {
        due_date: 'asc',
      },
    });

    // Crear libro de Excel
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'ERP Inmobiliaria';
    workbook.created = new Date();

    // Hoja 1: Movimientos con Obligaciones
    const movementsSheet = workbook.addWorksheet('Movimientos y Obligaciones');

    // Estilos
    const headerStyle = {
      font: { bold: true, color: { argb: 'FFFFFFFF' } },
      fill: { type: 'pattern' as const, pattern: 'solid' as const, fgColor: { argb: 'FF0066CC' } },
      alignment: { vertical: 'middle' as const, horizontal: 'center' as const },
      border: {
        top: { style: 'thin' as const },
        left: { style: 'thin' as const },
        bottom: { style: 'thin' as const },
        right: { style: 'thin' as const },
      },
    };

    // Definir columnas
    movementsSheet.columns = [
      { header: 'Fecha Movimiento', key: 'mov_date', width: 15 },
      { header: 'Banco', key: 'bank', width: 20 },
      { header: 'Cuenta', key: 'account', width: 15 },
      { header: 'Proyecto', key: 'project', width: 20 },
      { header: 'Descripción Movimiento', key: 'mov_desc', width: 40 },
      { header: 'Débito', key: 'debit', width: 15 },
      { header: 'Crédito', key: 'credit', width: 15 },
      { header: 'Monto Asignado', key: 'assigned_amount', width: 15 },
      { header: 'Obligación N°', key: 'obl_number', width: 15 },
      { header: 'Tipo Obligación', key: 'obl_type', width: 20 },
      { header: 'Proveedor', key: 'provider', width: 30 },
      { header: 'RUT Proveedor', key: 'provider_rut', width: 15 },
      { header: 'Centro de Costo', key: 'cost_center', width: 20 },
      { header: 'Subcuenta', key: 'sub_account', width: 20 },
      { header: 'Fecha Obligación', key: 'obl_date', width: 15 },
      { header: 'Monto Obligación', key: 'obl_amount', width: 15 },
      { header: 'Estado Obligación', key: 'obl_status', width: 15 },
    ];

    // Aplicar estilo a encabezados
    movementsSheet.getRow(1).eachCell((cell) => {
      cell.style = headerStyle;
    });

    // Llenar datos de movimientos
    movements.forEach((movement) => {
      if (movement.movement_matches && movement.movement_matches.length > 0) {
        // Movimiento con obligaciones asociadas
        movement.movement_matches.forEach((match) => {
          const obligation = match.obligations;
          movementsSheet.addRow({
            mov_date: movement.bank_date,
            bank: movement.bank_accounts?.bank_name || '-',
            account: movement.bank_accounts?.account_no || '-',
            project: movement.projects?.name || '-',
            mov_desc: movement.description || '-',
            debit: Number(movement.debit) || 0,
            credit: Number(movement.credit) || 0,
            assigned_amount: Number(match.matched_amount) || 0,
            obl_number: obligation.id ? String(obligation.id) : '-',
            obl_type: obligation.obligation_types?.name || '-',
            provider: obligation.providers?.name || '-',
            provider_rut: obligation.providers?.rut || '-',
            cost_center: obligation.cost_centers?.name || '-',
            sub_account: obligation.sub_accounts?.name || '-',
            obl_date: obligation.due_date,
            obl_amount: Number(obligation.amount_original) || 0,
            obl_status: obligation.status || '-',
          });
        });
      } else {
        // Movimiento sin obligación asociada
        movementsSheet.addRow({
          mov_date: movement.bank_date,
          bank: movement.bank_accounts?.bank_name || '-',
          account: movement.bank_accounts?.account_no || '-',
          project: movement.projects?.name || '-',
          mov_desc: movement.description || '-',
          debit: Number(movement.debit) || 0,
          credit: Number(movement.credit) || 0,
          assigned_amount: 0,
          obl_number: '-',
          obl_type: '-',
          provider: '-',
          provider_rut: '-',
          cost_center: '-',
          sub_account: '-',
          obl_date: null,
          obl_amount: 0,
          obl_status: '-',
        });
      }
    });

    // Formatear columnas de números
    movementsSheet.getColumn('debit').numFmt = '#,##0';
    movementsSheet.getColumn('credit').numFmt = '#,##0';
    movementsSheet.getColumn('assigned_amount').numFmt = '#,##0';
    movementsSheet.getColumn('obl_amount').numFmt = '#,##0';

    // Formatear columnas de fechas
    movementsSheet.getColumn('mov_date').numFmt = 'dd/mm/yyyy';
    movementsSheet.getColumn('obl_date').numFmt = 'dd/mm/yyyy';

    // Hoja 2: Resumen de Obligaciones
    const obligationsSheet = workbook.addWorksheet('Obligaciones Detalladas');

    obligationsSheet.columns = [
      { header: 'Número', key: 'number', width: 15 },
      { header: 'Fecha Emisión', key: 'issue_date', width: 15 },
      { header: 'Fecha Vencimiento', key: 'due_date', width: 15 },
      { header: 'Tipo', key: 'type', width: 20 },
      { header: 'Proveedor', key: 'provider', width: 30 },
      { header: 'RUT', key: 'rut', width: 15 },
      { header: 'Proyecto', key: 'project', width: 20 },
      { header: 'Centro de Costo', key: 'cost_center', width: 20 },
      { header: 'Subcuenta', key: 'sub_account', width: 20 },
      { header: 'Monto Original', key: 'amount', width: 15 },
      { header: 'Monto Pagado', key: 'paid_amount', width: 15 },
      { header: 'Saldo', key: 'balance', width: 15 },
      { header: 'Estado', key: 'status', width: 15 },
      { header: 'Movimientos Asociados', key: 'movements', width: 50 },
    ];

    obligationsSheet.getRow(1).eachCell((cell) => {
      cell.style = headerStyle;
    });

    obligations.forEach((obligation) => {
      const totalPaid = obligation.movement_matches.reduce(
        (sum, match) => sum + (Number(match.matched_amount) || 0), 
        0
      );
      const balance = Number(obligation.amount_original || 0) - totalPaid;

      const movements = obligation.movement_matches
        .map((match) => {
          const mov = match.bank_movements;
          const amount = Number(match.matched_amount) || 0;
          return `${mov.bank_date.toISOString().split('T')[0]}: ${mov.description || 'Sin descripción'} ($${amount.toLocaleString('es-CL')})`;
        })
        .join(' | ');

      obligationsSheet.addRow({
        number: obligation.id ? String(obligation.id) : '-',
        issue_date: obligation.start_date,
        due_date: obligation.due_date,
        type: obligation.obligation_types?.name || '-',
        provider: obligation.providers?.name || '-',
        rut: obligation.providers?.rut || '-',
        project: obligation.projects?.name || '-',
        cost_center: obligation.cost_centers?.name || '-',
        sub_account: obligation.sub_accounts?.name || '-',
        amount: Number(obligation.amount_original) || 0,
        paid_amount: totalPaid,
        balance: balance,
        status: obligation.status || '-',
        movements: movements || 'Sin movimientos asociados',
      });
    });

    obligationsSheet.getColumn('amount').numFmt = '#,##0';
    obligationsSheet.getColumn('paid_amount').numFmt = '#,##0';
    obligationsSheet.getColumn('balance').numFmt = '#,##0';
    obligationsSheet.getColumn('issue_date').numFmt = 'dd/mm/yyyy';
    obligationsSheet.getColumn('due_date').numFmt = 'dd/mm/yyyy';

    // Hoja 3: Resumen
    const summarySheet = workbook.addWorksheet('Resumen');
    
    const totalDebit = movements.reduce((sum, m) => sum + (Number(m.debit) || 0), 0);
    const totalCredit = movements.reduce((sum, m) => sum + (Number(m.credit) || 0), 0);
    const totalObligations = obligations.reduce((sum, o) => sum + (Number(o.amount_original) || 0), 0);
    const totalAssigned = movements.reduce((sum, m) => {
      const matchesTotal = (m.movement_matches || []).reduce(
        (s, match) => s + (Number(match.matched_amount) || 0), 
        0
      );
      return sum + matchesTotal;
    }, 0);

    summarySheet.addRow(['Resumen del Período']);
    summarySheet.addRow(['Fecha Inicio:', startDate]);
    summarySheet.addRow(['Fecha Fin:', endDate]);
    summarySheet.addRow([]);
    summarySheet.addRow(['MOVIMIENTOS BANCARIOS']);
    summarySheet.addRow(['Total Movimientos:', movements.length]);
    summarySheet.addRow(['Total Débitos:', totalDebit]);
    summarySheet.addRow(['Total Créditos:', totalCredit]);
    summarySheet.addRow(['Balance:', totalCredit - totalDebit]);
    summarySheet.addRow([]);
    summarySheet.addRow(['OBLIGACIONES']);
    summarySheet.addRow(['Total Obligaciones:', obligations.length]);
    summarySheet.addRow(['Monto Total Obligaciones:', totalObligations]);
    summarySheet.addRow(['Monto Total Asignado:', totalAssigned]);
    summarySheet.addRow(['Pendiente por Asignar:', totalObligations - totalAssigned]);

    summarySheet.getColumn(1).width = 30;
    summarySheet.getColumn(2).width = 20;
    summarySheet.getColumn(2).numFmt = '#,##0';

    // Aplicar estilos al resumen
    summarySheet.getRow(1).font = { bold: true, size: 14 };
    summarySheet.getRow(5).font = { bold: true };
    summarySheet.getRow(11).font = { bold: true };

    // Generar archivo
    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=movimientos-obligaciones-${startDate}-${endDate}.xlsx`);
    res.send(buffer);

  } catch (error) {
    console.error('Error generating export:', error);
    res.status(500).json({ 
      error: 'Error al generar exportación', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
