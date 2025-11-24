// File: components/CostCenterDetail.tsx
import React from 'react';
import useSWR from 'swr';
import { Typography, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

type SubAgg = { id: number; code: string | null; name: string; totalCLP: number; totalUF: number; obligationsCount: number };
type ObligationRow = {
  id: number;
  description: string | null;
  provider_name: string | null;
  amount_original: number;
  currency: string;
  start_date: string | null;
  due_date: string | null;
  status: string;
  sub_account_name: string | null;
};
interface DetailProps { id: number; company: string; showTotals?: boolean; }
interface CostCenterDetailData { subAccounts: SubAgg[]; obligations: ObligationRow[]; }

const fetcher = (url: string) => fetch(url).then(r => { if(!r.ok) throw new Error(r.statusText); return r.json(); });

export const CostCenterDetail: React.FC<DetailProps> = ({ id, company, showTotals }) => {
  const { data, error } = useSWR<CostCenterDetailData>(
     `/api/erp/cost-centers/${id}?company=${company}`,
    fetcher
  );
  if (error) return <Typography.Text type="danger">Error al cargar detalle</Typography.Text>;
  if (!data) return <Typography.Text>Cargando...</Typography.Text>;

  const cols: ColumnsType<SubAgg> = [
    {
      title: 'Subcuenta',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ellipsis: true,
      render: (_: any, r) => (
        <span>{r.code ? `${r.code} - ${r.name}` : r.name}</span>
      )
    },
    {
      title: 'Obligaciones',
      dataIndex: 'obligationsCount',
      key: 'obligationsCount',
      width: '10%',
      align: 'right',
      render: (v: number) => v.toLocaleString('es-CL')
    },
    {
      title: 'Total CLP',
      dataIndex: 'totalCLP',
      key: 'totalCLP',
      width: '30%',
      align: 'right',
      render: (v: number) => Math.round(v).toLocaleString('es-CL')
    },
    {
      title: 'Total UF',
      dataIndex: 'totalUF',
      key: 'totalUF',
      width: '30%',
      align: 'right',
      render: (v: number) => v.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
  ];

  const obligationCols: ColumnsType<ObligationRow> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    {
      title: 'Fecha Inicio',
      dataIndex: 'start_date',
      key: 'start_date',
      width: 120,
      render: (d: string | null) => d ? dayjs(d).format('DD/MM/YYYY') : '-'
    },
    {
      title: 'Vencimiento',
      dataIndex: 'due_date',
      key: 'due_date',
      width: 120,
      render: (d: string | null) => d ? dayjs(d).format('DD/MM/YYYY') : '-'
    },
    {
      title: 'Proveedor',
      dataIndex: 'provider_name',
      key: 'provider_name',
      width: 180,
      ellipsis: true,
      render: (v: string | null) => v || '-'
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      width: 240,
      ellipsis: true,
      render: (v: string | null) => v || '-'
    },
    {
      title: 'Monto',
      dataIndex: 'amount_original',
      key: 'amount_original',
      width: 140,
      align: 'right',
      render: (v: number, r) => `${r.currency === 'CLP' ? '$' : ''}${Math.round(v).toLocaleString('es-CL')}${r.currency !== 'CLP' ? ' ' + r.currency : ''}`
    },
    {
      title: 'Subcuenta',
      dataIndex: 'sub_account_name',
      key: 'sub_account_name',
      width: 180,
      ellipsis: true,
      render: (v: string | null) => v || '-'
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (s: string) => (
        <Tag color={s === 'pagada' ? 'green' : s === 'vencida' ? 'red' : 'gold'}>{s.toUpperCase()}</Tag>
      )
    }
  ];

  // Totales generales
  const totalCLP = data.subAccounts.reduce((acc, s) => acc + (s.totalCLP || 0), 0);
  const totalUF = data.subAccounts.reduce((acc, s) => acc + (s.totalUF || 0), 0);
  const totalObligations = data.subAccounts.reduce((acc, s) => acc + (s.obligationsCount || 0), 0);

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
            <span style={{ marginLeft: 24 }} />
            <Typography.Text strong>Obligaciones: </Typography.Text>
            <Typography.Text>{totalObligations.toLocaleString('es-CL')}</Typography.Text>
          </div>
        )}
        <Table<SubAgg> 
          columns={cols} 
          dataSource={data.subAccounts} 
          rowKey="id" 
          pagination={false} 
          size="small"
          style={{ width: '100%' }}
          bordered
        />
        <Typography.Title level={4} style={{ marginTop: 24 }}>Obligaciones del Centro</Typography.Title>
        <Table<ObligationRow>
          columns={obligationCols}
          dataSource={data.obligations}
          rowKey="id"
          size="small"
          style={{ width: '100%' }}
          bordered
          pagination={{
            pageSize: 15,
            showSizeChanger: true,
            showTotal: (total) => `Total: ${total.toLocaleString('es-CL')} obligaciones`,
            style: { marginBottom: 0 }
          }}
        />
      </div>
    </div>
  );
};
