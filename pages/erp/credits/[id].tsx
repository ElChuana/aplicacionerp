// File: pages/credits/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Descriptions, Spin, Typography, Card } from 'antd';
import { ObligationsTable, ObligationRow } from '../../../components/ObligationsTable';

type CreditDetail = {
  id: number;
  providerName: string;
  interest_rate_pct: number;
  start_date: string;
  end_date: string | null;
  amortization_scheme: string | null;
  interest_frequency: string;
  interest_type: string;
  capital_schedule: Array<{ period: string; percentage: number }>;
  obligations: ObligationRow[];
};

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  });

export default function CreditDetailPage() {
  const router = useRouter();
  const { id, company } = router.query;
  const companyId = Array.isArray(company) ? company[0] : company;
  const creditId = Array.isArray(id) ? id[0] : id;

  const { data, error } = useSWR<CreditDetail>(
    creditId ? `/api/erp/credits/${creditId}?company=${companyId}` : null,
    fetcher
  );

  if (error)
    return <Typography.Text type="danger">Error cargando crédito: {error.message}</Typography.Text>;
  if (!data)
    return <Spin tip="Cargando crédito..." style={{ marginTop: 50, textAlign: 'center' }} />;

  return (
    <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
      <Typography.Title level={3}>Detalle de Crédito #{data.id}</Typography.Title>
      
      <Card style={{ marginBottom: 24 }}>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Proveedor">{data.providerName}</Descriptions.Item>
          <Descriptions.Item label="Tasa Interés">{data.interest_rate_pct.toLocaleString('es-CL')}%</Descriptions.Item>
          <Descriptions.Item label="Fecha Inicio">{new Date(data.start_date).toLocaleDateString('es-CL')}</Descriptions.Item>
          <Descriptions.Item label="Fecha Término">{data.end_date ? new Date(data.end_date).toLocaleDateString('es-CL') : '-'}</Descriptions.Item>
          <Descriptions.Item label="Amortización">{data.amortization_scheme || '-'}</Descriptions.Item>
          <Descriptions.Item label="Frecuencia">{data.interest_frequency}</Descriptions.Item>
          <Descriptions.Item label="Tipo de Interés">{data.interest_type}</Descriptions.Item>
          <Descriptions.Item label="Plan de Capitalización" span={2}>
            {data.capital_schedule && data.capital_schedule.length > 0 ? (
              data.capital_schedule.map((cs: any) => (
                <div key={cs.period} style={{ marginBottom: 4 }}>
                  {new Date(cs.period).toLocaleDateString('es-CL')}: {cs.percentage.toLocaleString('es-CL')}%
                </div>
              ))
            ) : (
              <span>No hay plan de capitalización</span>
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      
      <div style={{ marginTop: 32 }}>
        <Typography.Title level={4} style={{ marginBottom: 16 }}>
          Obligaciones del Crédito ({data.obligations.length})
        </Typography.Title>
        <ObligationsTable data={data.obligations} loading={!data} />
      </div>
    </div>
  );
}

