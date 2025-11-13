// File: components/CostCenterDetail.tsx
import React from 'react';
import useSWR from 'swr';
import { Typography } from 'antd';
import moment from 'moment';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

type SubAgg = { name: string; totalCLP: number; totalUF: number };
interface DetailProps { id: number; company: string; showTotals?: boolean; }
interface CostCenterDetailData { subAccounts: SubAgg[]; movements: any[]; }

const fetcher = (url: string) => fetch(url).then(r => { if(!r.ok) throw new Error(r.statusText); return r.json(); });

export const CostCenterDetail: React.FC<DetailProps> = ({ id, company, showTotals }) => {
  const { data, error } = useSWR<CostCenterDetailData>(
     `/api/erp/cost-centers/${id}?company=${company}`,
    fetcher
  );
  if (error) return <Typography.Text type="danger">Error al cargar detalle</Typography.Text>;
  if (!data) return <Typography.Text>Cargando...</Typography.Text>;

  const cols: ColumnsType<any> = [
      {
      title: 'Subcuenta', 
      dataIndex: 'name', 
      key: 'name',
      width: '40%',
      ellipsis: true
      },
    { 
      title: 'CLP', 
      dataIndex: 'totalCLP', 
      key: 'totalCLP',
      align: 'right' as const,
      width: '30%',
      render: (v: number) => Math.round(v).toLocaleString('es-CL')
    },
    { 
      title: 'UF', 
      dataIndex: 'totalUF', 
      key: 'totalUF',
      align: 'right' as const,
      width: '30%',
      render: (v: number) => v.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
  ];

  const movCols: ColumnsType<any> = [
    { 
      title: 'Fecha',
      dataIndex: 'bank_date',
      width: '15%',
      render: (d: string) => moment(d).format('DD/MM/YYYY')
    },
    { 
      title: 'Descripción', 
      dataIndex: 'description', 
      key: 'description',
      width: '45%',
      ellipsis: true
    },
    { 
      title: 'Monto', 
      dataIndex: 'amount', 
      key: 'amount',
      width: '20%',
      align: 'right' as const,
      render: (v: number) => Math.round(v).toLocaleString('es-CL')
    },
    { 
      title: 'UF', 
      dataIndex: 'amountUF', 
      key: 'amountUF',
      width: '20%',
      align: 'right' as const,
      render: (v: number) => v.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
  ];

  // Totales generales
  const totalCLP = data.subAccounts.reduce((acc, s) => acc + (s.totalCLP ?? 0), 0);
  const totalUF = data.subAccounts.reduce((acc, s) => acc + (s.totalUF ?? 0), 0);

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <div style={{ minWidth: '100%' }}>
        <Typography.Title level={4}>Resumen Subcuentas</Typography.Title>
        {showTotals && (
          <div style={{ marginBottom: 12 }}>
            <Typography.Text strong>Total CLP: </Typography.Text>
            <Typography.Text>{Math.round(totalCLP).toLocaleString('es-CL')}</Typography.Text>
            <span style={{ marginLeft: 24 }} />
            <Typography.Text strong>Total UF: </Typography.Text>
            <Typography.Text>{totalUF.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography.Text>
          </div>
        )}
        <Table<SubAgg> 
          columns={cols} 
          dataSource={data.subAccounts} 
          rowKey="name" 
          pagination={false} 
          size="small"
          style={{ width: '100%' }}
          bordered
        />

        <Typography.Title level={4} style={{ marginTop: 24 }}>Movimientos</Typography.Title>
        <Table 
          columns={movCols} 
          dataSource={data.movements} 
          rowKey="id" 
          size="small"
          style={{ width: '100%' }}
          bordered
          pagination={{ 
            pageSize: 15,
            showSizeChanger: true,
            showTotal: (total) => `Total: ${total} movimientos`,
            style: { marginBottom: 0 }
          }}
        />
      </div>
    </div>
  );
};
