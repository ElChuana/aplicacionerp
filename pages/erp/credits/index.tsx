// File: pages/credits/index.tsx
import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import useSWR from 'swr';
import { Table, Spin, Typography, Button } from 'antd';
import { useRouter } from 'next/router';

// Fetcher genérico
const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  });

type Credit = {
  id: number;
  providerName: string;
  interest_rate_pct: number;
  start_date: string;
  end_date: string | null;
  amortization_scheme: string | null;
  interest_frequency: string;
  interest_type: string;
  capital_schedule: Array<{ period: string; percentage: number }>;
};

export default function CreditsPage() {
  const router = useRouter();
  const { query } = router;
  const companyId = Array.isArray(query.company)
    ? Number(query.company[0])
    : Number(query.company);

  const { data, error, mutate } = useSWR<Credit[]>(
    companyId ? `/api/erp/credits?company=${companyId}` : null,
    fetcher
  );

  if (error) {
    return (
      <Typography.Text type="danger">
        Error cargando créditos: {error.message}
      </Typography.Text>
    );
  }
  if (!data) {
    return (
      <Spin
        tip="Cargando créditos..."
        style={{ marginTop: 50, textAlign: 'center' }}
      />
    );
  }

  // Generar filtros únicos
  const providerFilters = Array.from(new Set(data.map(c => c.providerName))).map(
    name => ({ text: name, value: name })
  );
  const frequencyFilters = Array.from(
    new Set(data.map(c => c.interest_frequency))
  ).map(f => ({ text: f, value: f }));
  const typeFilters = Array.from(
    new Set(data.map(c => c.interest_type))
  ).map(t => ({ text: t, value: t }));

  const columns: ColumnsType<Credit> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    {
      title: 'Proveedor',
      dataIndex: 'providerName',
      key: 'providerName',
      filters: providerFilters,
  onFilter: (value, record) => record.providerName === (value as string),
      width: 180,
    },
    {
      title: 'Tasa Interés (%)',
      dataIndex: 'interest_rate_pct',
      key: 'interest_rate_pct',
      render: (val: number) => `${val.toLocaleString('es-CL')}%`,
      sorter: (a, b) => a.interest_rate_pct - b.interest_rate_pct,
      width: 140,
    },
    {
      title: 'Fecha Inicio',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (val: string) => new Date(val).toLocaleDateString('es-CL'),
      sorter: (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
      width: 120,
    },
    {
      title: 'Fecha Término',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (val: string | null) => (val ? new Date(val).toLocaleDateString('es-CL') : '-'),
      sorter: (a, b) => {
        const ad = a.end_date ? new Date(a.end_date).getTime() : 0;
        const bd = b.end_date ? new Date(b.end_date).getTime() : 0;
        return ad - bd;
      },
      width: 120,
    },
    { title: 'Esquema', dataIndex: 'amortization_scheme', key: 'amortization_scheme', width: 160 },
    {
      title: 'Frecuencia',
      dataIndex: 'interest_frequency',
      key: 'interest_frequency',
      filters: frequencyFilters,
  onFilter: (value, record) => record.interest_frequency === (value as string),
      width: 120,
    },
    {
      title: 'Tipo',
      dataIndex: 'interest_type',
      key: 'interest_type',
      filters: typeFilters,
  onFilter: (value, record) => record.interest_type === (value as string),
      width: 120,
    },
  ];

  return (
    <div style={{
      padding: 0,
      margin: 0,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ padding: 24, flex: '0 0 auto' }}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Listado de Créditos
        </Typography.Title>
        <Button
          type="primary"
          style={{ marginTop: 16 }}
          onClick={() =>
            router.push({ pathname: '/erp/credits/create', query: { company: companyId } })
          }
        >
          Crear Crédito
        </Button>
      </div>

      <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
        <Table<Credit>
          dataSource={data}
          columns={columns}
          rowKey="id"
          pagination={false}
          scroll={{ x: '100%', y: 'calc(100vh - 160px)' }}
          onRow={record => ({
            onClick: () => router.push(`/erp/credits/${record.id}?company=${companyId}`),
            style: { cursor: 'pointer' },
          })}
          style={{ margin: 0 }}
          bordered
        />
      </div>
    </div>
  );
}