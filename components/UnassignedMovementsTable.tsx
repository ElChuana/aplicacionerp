// File: components/UnassignedMovementsTable.tsx
import React, { useState, useEffect } from 'react';
import { Card, Table, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export interface UnassignedMovement {
  id: string;
  bank_date: string;
  debit: number | null;
  credit: number | null;
  currency: string;
  source: string;
  import_date: string;
  accountName?: string | null;
  projectName?: string | null;
  subAccountName?: string | null;
  costCenterName?: string | null;
  description?: string | null;
  matched: boolean;
  balance: number;
  ufValue?: number | null;
  debitUf?: number | null;
  creditUf?: number | null;
}

interface Props {
  data: UnassignedMovement[];
  loading?: boolean;
}

export const UnassignedMovementsTable: React.FC<Props> = ({ data, loading = false }) => {
  const [tableData, setTableData] = useState<UnassignedMovement[]>([]);
  const [filterAccount, setFilterAccount] = useState<string>();
  const [filterProject, setFilterProject] = useState<string>();

  useEffect(() => {
    // 1) Filtrar solo movimientos sin centro de costo
    const withoutCC = data.filter(m => !m.costCenterName);

    // 2) Orden ascendente por fecha para cálculo de balance
    const asc = [...withoutCC].sort(
      (a, b) => new Date(a.bank_date).getTime() - new Date(b.bank_date).getTime()
    );

    // 3) Calcular saldo acumulado
    let runningBalance = 0;
    const withBalance = asc.map(m => {
      const abono = m.debit ?? 0;
      const cargo = m.credit ?? 0;
      runningBalance += abono - cargo;
      return { ...m, balance: runningBalance };
    });

    // 4) Orden descendente para mostrar más reciente primero
    const desc = [...withBalance].sort(
      (a, b) => new Date(b.bank_date).getTime() - new Date(a.bank_date).getTime()
    );

    // 5) Fila inicial de saldo
    const initialRow: UnassignedMovement = {
      id: 'initial',
      bank_date: '1900-01-01',
      debit: null,
      credit: null,
      currency: '',
      source: '',
      import_date: '',
      accountName: null,
      projectName: null,
      subAccountName: null,
      costCenterName: null,
      description: 'Saldo inicial',
      matched: false,
      balance: 0,
      ufValue: null,
    };

    // 6) Agregar inicial al final y aplicar filtros de cuenta/proyecto
    let finalData = [...desc, initialRow];
    if (filterAccount) finalData = finalData.filter(m => m.accountName === filterAccount || m.id === 'initial');
    if (filterProject) finalData = finalData.filter(m => m.projectName === filterProject || m.id === 'initial');

    setTableData(finalData);
  }, [data, filterAccount, filterProject]);

  const accountOptions = Array.from(new Set(
    data.map(m => m.accountName ?? '').filter(Boolean)
  )).map(a => ({ label: a, value: a }));

  const projectOptions = Array.from(new Set(
    data.map(m => m.projectName ?? '').filter(Boolean)
  )).map(p => ({ label: p, value: p }));

  const columns: ColumnsType<UnassignedMovement> = [
    {
      title: 'Fecha',
      dataIndex: 'bank_date',
      key: 'bank_date',
      width: 100,
      fixed: 'left',
      render: date =>
        date === '1900-01-01'
          ? 'Saldo inicial'
          : new Date(date).toLocaleDateString('es-CL', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }),
    },
    { 
      title: 'Cuenta', 
      dataIndex: 'accountName', 
      key: 'accountName',
      width: 150,
      ellipsis: true 
    },
    { 
      title: 'Origen', 
      dataIndex: 'source', 
      key: 'source',
      width: 100,
      ellipsis: true 
    },
    { 
      title: 'Importación', 
      dataIndex: 'import_date', 
      key: 'import_date',
      width: 120 
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      onCell: () => ({
        style: {
          whiteSpace: 'normal',
          wordBreak: 'break-word',
        },
      }),
      render: text => text || '-',
    },
    {
      title: 'Abono',
      dataIndex: 'debit',
      key: 'debit',
      width: 120,
      align: 'right',
      render: val => (val != null ? val.toLocaleString('es-CL') : '-'),
    },
    {
      title: 'Cargo',
      dataIndex: 'credit',
      key: 'credit',
      width: 120,
      align: 'right',
      render: val => (val != null ? val.toLocaleString('es-CL') : '-'),
    },
    {
      title: 'UF',
      key: 'uf',
      width: 100,
      align: 'right',
      render: (_text, record) => {
        const v = record.debitUf ?? record.creditUf ?? null;
        if (v == null || isNaN(v)) return '-';
        return v.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      },
    },
    {
      title: 'Saldo',
      dataIndex: 'balance',
      key: 'balance',
      width: 120,
      align: 'right',
      render: val => (val != null ? val.toLocaleString('es-CL') : '-'),
    },
    { 
      title: 'Centro de Costo', 
      dataIndex: 'costCenterName', 
      key: 'costCenterName',
      width: 200,
      ellipsis: true 
    },
  ];

  return (
    <Card size="small">
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <Select
          placeholder="Filtrar cuenta"
          style={{ minWidth: 160 }}
          options={accountOptions}
          allowClear
          onChange={setFilterAccount}
        />
        <Select
          placeholder="Filtrar proyecto"
          style={{ minWidth: 160 }}
          options={projectOptions}
          allowClear
          onChange={setFilterProject}
        />
      </div>
      <Table<UnassignedMovement>
        size="small"
        columns={columns}
        dataSource={tableData}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ y: '60vh' }}
        tableLayout="fixed"
      />
    </Card>
  );
};

export default UnassignedMovementsTable;
