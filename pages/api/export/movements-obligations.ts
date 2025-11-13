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
          },
        },
        projects: {
          select: {
            name: true,
            code: true,
          },
        },
        sub_accounts: {
          select: {
            name: true,
            cost_centers: {
              select: {
                name: true,
              },
            },
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
        due_date: {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        },
        ...(companyId && { company_id: Number(companyId) }),
        ...(projectId && { project_id: Number(projectId) }),
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
          },
        },
        movement_matches: {
          include: {
            bank_movements: {
              select: {
                id: true,
                bank_date: true,
                description: true,
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
      { header: 'Proyecto', key: 'project', width: 20 },
      { header: 'Descripción Movimiento', key: 'mov_desc', width: 40 },
      { header: 'Centro Costo', key: 'cost_center', width: 20 },
      { header: 'Subcuenta', key: 'sub_account', width: 20 },
      { header: 'Débito', key: 'debit', width: 15 },
      { header: 'Crédito', key: 'credit', width: 15 },
      { header: 'Monto Asignado', key: 'assigned_amount', width: 15 },
      { header: 'Obligación N°', key: 'obl_number', width: 15 },
      { header: 'Tipo Obligación', key: 'obl_type', width: 20 },
      { header: 'Proveedor', key: 'provider', width: 30 },
      { header: 'RUT Proveedor', key: 'provider_rut', width: 15 },
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
      if (movement.movement_matches.length > 0) {
        // Movimiento con obligaciones asociadas
        movement.movement_matches.forEach((assoc) => {
          const obligation = assoc.obligations;
          movementsSheet.addRow({
            mov_date: movement.bank_date,
            bank: movement.bank_accounts?.bank_name || '-',
            project: movement.projects?.name || '-',
            mov_desc: movement.description || '-',
            cost_center: movement.sub_accounts?.cost_centers?.name || '-',
            sub_account: movement.sub_accounts?.name || '-',
            debit: Number(movement.debit) || 0,
            credit: Number(movement.credit) || 0,
            assigned_amount: Number(assoc.matched_amount) || 0,
            obl_number: obligation.id || '-',
            obl_type: obligation.obligation_types?.name || '-',
            provider: obligation.providers?.name || '-',
            provider_rut: obligation.providers?.rut || '-',
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
          project: movement.projects?.name || '-',
          mov_desc: movement.description || '-',
          cost_center: movement.sub_accounts?.cost_centers?.name || '-',
          sub_account: movement.sub_accounts?.name || '-',
          debit: Number(movement.debit) || 0,
          credit: Number(movement.credit) || 0,
          assigned_amount: 0,
          obl_number: '-',
          obl_type: '-',
          provider: '-',
          provider_rut: '-',
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
      { header: 'Monto Neto', key: 'net_amount', width: 15 },
      { header: 'Monto Bruto', key: 'gross_amount', width: 15 },
      { header: 'Estado', key: 'status', width: 15 },
      { header: 'Movimientos Asociados', key: 'movements', width: 50 },
    ];

    obligationsSheet.getRow(1).eachCell((cell) => {
      cell.style = headerStyle;
    });

    obligations.forEach((obligation) => {
      const movements = obligation.movement_matches
        .map((assoc) => {
          const mov = assoc.bank_movements;
          return `${mov.bank_date.toISOString().split('T')[0]}: ${mov.description} (${Number(assoc.matched_amount) || 0})`;
        })
        .join(' | ');

      obligationsSheet.addRow({
        number: obligation.id || '-',
        issue_date: obligation.due_date,
        due_date: obligation.due_date,
        type: obligation.obligation_types?.name || '-',
        provider: obligation.providers?.name || '-',
        rut: obligation.providers?.rut || '-',
        project: obligation.projects?.name || '-',
        net_amount: Number(obligation.amount_original) || 0,
        gross_amount: Number(obligation.amount_original) || 0,
        status: obligation.status || '-',
        movements: movements || 'Sin movimientos asociados',
      });
    });

    obligationsSheet.getColumn('net_amount').numFmt = '#,##0';
    obligationsSheet.getColumn('gross_amount').numFmt = '#,##0';
    obligationsSheet.getColumn('issue_date').numFmt = 'dd/mm/yyyy';
    obligationsSheet.getColumn('due_date').numFmt = 'dd/mm/yyyy';

    // Hoja 3: Resumen
    const summarySheet = workbook.addWorksheet('Resumen');
    
    const totalDebit = movements.reduce((sum, m) => sum + (Number(m.debit) || 0), 0);
    const totalCredit = movements.reduce((sum, m) => sum + (Number(m.credit) || 0), 0);
    const totalObligations = obligations.reduce((sum, o) => sum + (Number(o.amount_original) || 0), 0);
    const totalAssigned = movements.reduce((sum, m) => 
      sum + m.movement_matches.reduce((s, a) => s + (Number(a.matched_amount) || 0), 0), 0
    );

    summarySheet.addRow(['Resumen del Período']);
    summarySheet.addRow(['Fecha Inicio:', startDate]);
    summarySheet.addRow(['Fecha Fin:', endDate]);
    summarySheet.addRow([]);
    summarySheet.addRow(['MOVIMIENTOS BANCARIOS']);
    summarySheet.addRow(['Total Movimientos:', movements.length]);
    summarySheet.addRow(['Total Débitos:', Number(totalDebit)]);
    summarySheet.addRow(['Total Créditos:', Number(totalCredit)]);
    summarySheet.addRow(['Balance:', Number(totalCredit - totalDebit)]);
    summarySheet.addRow([]);
    summarySheet.addRow(['OBLIGACIONES']);
    summarySheet.addRow(['Total Obligaciones:', obligations.length]);
    summarySheet.addRow(['Monto Total Obligaciones:', Number(totalObligations)]);
    summarySheet.addRow(['Monto Total Asignado:', Number(totalAssigned)]);
    summarySheet.addRow(['Pendiente por Asignar:', Number(totalObligations - totalAssigned)]);

    summarySheet.getColumn(1).width = 30;
    summarySheet.getColumn(2).width = 20;
    summarySheet.getColumn(2).numFmt = '#,##0';

    // Generar archivo
    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=movimientos-obligaciones-${startDate}-${endDate}.xlsx`);
    res.send(buffer);

  } catch (error) {
    console.error('Error generating export:', error);
    res.status(500).json({ error: 'Error al generar exportación' });
  }
}
