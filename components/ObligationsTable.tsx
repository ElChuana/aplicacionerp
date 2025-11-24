import React from 'react';
import { Table, Tag } from 'antd';
import { useRouter } from 'next/router';
import type { ColumnsType } from 'antd/es/table';

// Formateo consistente de números con separador de miles
function formatNumber(value: number): string {
  if (isNaN(value) || value == null) return "0";
  return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export interface ObligationRow {
  id: string;
  providerName: string;
  projectName: string;
  typeName: string;
  description?: string | null;
  amount: string;
  currency: string;
  startDate: string;
  dueDate: string;
  balance: string;
  creditNotesTotal?: number;
  costCenterId?: number | null;
  costCenterName?: string | null;
  subAccountId?: number | null;
  subAccountName?: string | null;
  status: 'pendiente' | 'vencida' | 'pagada';
}

interface Props {
  data: ObligationRow[];
  loading: boolean;
}

export const ObligationsTable: React.FC<Props> = ({ data, loading }) => {
  const router = useRouter();

  const columns: ColumnsType<ObligationRow> = [
    { 
      title: 'Proveedor', 
      dataIndex: 'providerName', 
      key: 'providerName',
      width: 280, // más espacio para nombres largos
      ellipsis: true,
      fixed: 'left'
    },
    { 
      title: 'Fecha Inicio', 
      dataIndex: 'startDate', 
      key: 'startDate',
      width: 120,
      sorter: (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      render: (date: string) => {
        if (!date) return '-';
        const d = new Date(date);
        return d.toLocaleDateString('es-CL', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        });
      }
    },
    { 
      title: 'Vencimiento', 
      dataIndex: 'dueDate', 
      key: 'dueDate',
      width: 120,
      sorter: (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      render: (date: string) => {
        if (!date) return '-';
        const d = new Date(date);
        return d.toLocaleDateString('es-CL', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        });
      }
    },
    { 
      title: 'Monto', 
      dataIndex: 'amount', 
      key: 'amount', 
      width: 120,
      align: 'right',
      render: (val: string) => {
        const num = Number(val);
        return isNaN(num) ? val : `$${formatNumber(num)}`;
      }
    },
    { 
      title: 'Moneda', 
      dataIndex: 'currency', 
      key: 'currency', 
      width: 80,
      align: 'center' 
    },
    {
      title: 'Notas Crédito',
      dataIndex: 'creditNotesTotal',
      key: 'creditNotesTotal',
      width: 140,
      align: 'right',
      render: (val: number) => {
        const num = Number(val || 0);
        return isNaN(num) || num === 0 ? '-' : `$${formatNumber(num)}`;
      }
    },
    { 
      title: 'Balance', 
      dataIndex: 'balance', 
      key: 'balance', 
      width: 120,
      align: 'right',
      render: (val: string) => {
        const num = Number(val);
        return isNaN(num) ? val : `$${formatNumber(num)}`;
      }
    },
    { 
      title: 'Centro de Costo', 
      dataIndex: 'costCenterName', 
      key: 'costCenterName',
      width: 180,
      ellipsis: true,
      render: (val: string | null) => val || '-'
    },
    { 
      title: 'Subcuenta', 
      dataIndex: 'subAccountName', 
      key: 'subAccountName',
      width: 180,
      ellipsis: true,
      render: (val: string | null) => val || '-'
    },
    { 
      title: 'Descripción', 
      dataIndex: 'description', 
      key: 'description',
      width: 400, // ampliar porcentaje visible de la descripción
      ellipsis: true 
    },
    { 
      title: 'Proyecto', 
      dataIndex: 'projectName', 
      key: 'projectName',
      width: 180,
      ellipsis: true 
    },
    { 
      title: 'Tipo', 
      dataIndex: 'typeName', 
      key: 'typeName',
      width: 150,
      ellipsis: true 
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: st => {
        const color = st === 'pagada' ? 'green' : st === 'vencida' ? 'red' : 'orange';
        return <Tag color={color}>{st}</Tag>;
      },
    },
  ];

  return (
    <Table<ObligationRow>
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 15 }}
      scroll={{ x: 'max-content', y: 'calc(100vh - 260px)' }}
      style={{ width: '100%' }}
      onRow={record => ({
        onClick: () => {
          if (!record.id) {
            console.error('ID de obligación no encontrado:', record);
            return;
          }
          // Ruta ERP correcta con query company si existe
            const rawCompany = router.query.company;
            const company = Array.isArray(rawCompany) ? rawCompany[0] : rawCompany;
            router.push({
              pathname: '/erp/obligations/[id]',
              query: { id: record.id, ...(company && { company }) },
            });
        },
        style: {
          cursor: 'pointer',
          backgroundColor:
            record.status === 'vencida' ? '#fff1f0' :
            record.status === 'pagada'  ? '#f6ffed' :
                                          '#fffbe6',
        },
      })}
    />
  );
};

export default ObligationsTable;
