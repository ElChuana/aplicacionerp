import React from 'react';
import { Table, Tag } from 'antd';
import { useRouter } from 'next/router';
import type { ColumnsType } from 'antd/es/table';

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
      width: 200,
      ellipsis: true,
      fixed: 'left'
    },
    { 
      title: 'Fecha Inicio', 
      dataIndex: 'startDate', 
      key: 'startDate',
      width: 120,
      sorter: (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime() 
    },
    { 
      title: 'Vencimiento', 
      dataIndex: 'dueDate', 
      key: 'dueDate',
      width: 120,
      sorter: (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() 
    },
    { 
      title: 'Monto', 
      dataIndex: 'amount', 
      key: 'amount', 
      width: 120,
      align: 'right',
      render: (val: string) => {
        const num = Number(val);
        return isNaN(num) ? val : num.toLocaleString('es-CL');
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
      title: 'Balance', 
      dataIndex: 'balance', 
      key: 'balance', 
      width: 120,
      align: 'right',
      render: (val: string) => {
        const num = Number(val);
        return isNaN(num) ? val : num.toLocaleString('es-CL');
      }
    },
    { 
      title: 'Descripción', 
      dataIndex: 'description', 
      key: 'description',
      width: 250,
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
      pagination={{ pageSize: 10 }}
      onRow={record => ({
        onClick: () => {
          // Validar que el id existe antes de navegar
          if (!record.id) {
            console.error('ID de obligación no encontrado:', record);
            return;
          }
          // Construye ruta usando objeto para interpolar [id]
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
