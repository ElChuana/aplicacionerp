// File: pages/obligations/index.tsx
import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import {
  Spin,
  Typography,
  Button,
  Tabs,
  Calendar,
  Badge,
  Select,
  DatePicker,
  Space,
} from 'antd';
import type { Moment } from 'moment';
import { ObligationsTable, ObligationRow } from '../../../components/ObligationsTable';

const { Text, Title } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return res.json();
  });

const ObligationsPage: React.FC = () => {
  const router = useRouter();
  const companyParam = Array.isArray(router.query.company)
    ? router.query.company[0]
    : router.query.company;
  const companyId = companyParam ? Number(companyParam) : NaN;

  const shouldFetch = !isNaN(companyId);
  const { data, error } = useSWR<ObligationRow[]>(
    shouldFetch ? `/api/erp/obligations?company=${companyId}` : null,
    fetcher
  );

  // State hooks (always run)
  const [statusFilter, setStatusFilter] = useState<string>();
  const [providerFilter, setProviderFilter] = useState<string>();
  const [dateRange, setDateRange] = useState<[Moment, Moment] | null>(null);

  // Use data array or empty while loading (memoized para evitar cambios en deps)
  const baseData = useMemo(() => data ?? [], [data]);

  // Memoize filtered data
  const filteredData = useMemo(() => {
    let items = baseData;
    if (statusFilter) {
      items = items.filter(o => o.status === statusFilter);
    }
    if (providerFilter) {
      items = items.filter(o => o.providerName === providerFilter);
    }
    if (dateRange) {
      const [start, end] = dateRange;
      const startKey = start.format('YYYY-MM-DD');
      const endKey = end.format('YYYY-MM-DD');
      items = items.filter(o => {
        const dateKey = o.dueDate || o.startDate;
        return dateKey >= startKey && dateKey <= endKey;
      });
    }
    return items;
  }, [baseData, statusFilter, providerFilter, dateRange]);

  // Evitar hydration mismatch: no usar early-returns que dependan de router/query en SSR
  const isRouterReady = router.isReady;

  // Events grouping for calendar
  const eventsByDate: Record<string, ObligationRow[]> = {};
  baseData.forEach(o => {
    const key = o.dueDate || o.startDate;
    if (!eventsByDate[key]) eventsByDate[key] = [];
    eventsByDate[key].push(o);
  });

  const dateCellRender = (value: any) => {
    const key = value.format('YYYY-MM-DD');
    const list = eventsByDate[key] || [];
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {list.map(item => {
          // Validar que el id existe antes de renderizar
          if (!item.id) {
            console.warn('Obligación sin ID en calendario:', item);
            return null;
          }
          
          const hasValidId = item.id && String(item.id).trim() !== '';
          
          return (
            <li key={item.id} style={{ marginBottom: 4 }}>
              <Badge
                status={
                  item.status === 'vencida'
                    ? 'error'
                    : item.status === 'pagada'
                    ? 'success'
                    : 'warning'
                }
                text={`${item.providerName}: ${item.amount} ${item.currency}`}
                style={{ cursor: hasValidId ? 'pointer' : 'default' }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!hasValidId) {
                    console.error('No se puede navegar: ID inválido', item);
                    return;
                  }
                  router.push({
                    pathname: '/erp/obligations/[id]',
                    query: { id: String(item.id), company: companyId },
                  });
                }}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  // Provider options
  const providerOptions = Array.from(new Set(baseData.map(o => o.providerName))).map(p => ({ label: p, value: p }));

  let body: React.ReactNode = null;
  if (!isRouterReady) {
    body = <Spin tip="Cargando..." style={{ margin: '100px auto', display: 'block' }} />;
  } else if (!shouldFetch) {
    body = <Text type="warning">Debe seleccionar primero una compañía</Text>;
  } else if (error) {
    body = <Text type="danger">Error al cargar obligaciones: {error.message}</Text>;
  } else if (!data) {
    body = <Spin tip="Cargando obligaciones..." style={{ margin: '100px auto', display: 'block' }} />;
  } else {
    body = (
      <Tabs defaultActiveKey="list">
        <TabPane tab="Lista" key="list">
          <Space wrap style={{ marginBottom: 16 }}>
            <Select
              placeholder="Estado"
              style={{ width: 150 }}
              allowClear
              options={[
                { label: 'pendiente', value: 'pendiente' },
                { label: 'pagada', value: 'pagada' },
                { label: 'vencida', value: 'vencida' },
              ]}
              onChange={setStatusFilter}
            />
            <Select
              placeholder="Proveedor"
              style={{ width: 200 }}
              allowClear
              options={providerOptions}
              onChange={setProviderFilter}
            />
            <RangePicker onChange={dates => setDateRange(dates as [Moment, Moment] | null)} />
          </Space>
          <ObligationsTable data={filteredData} loading={false} />
        </TabPane>
        <TabPane tab="Calendario" key="calendar">
          <Calendar dateCellRender={dateCellRender} />
        </TabPane>
      </Tabs>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={3}>Obligaciones</Title>
        <Button type="primary" onClick={() => router.push(`/erp/obligations/create?company=${companyId}`)}>
          Nueva Obligación
        </Button>
      </div>
      {body}
    </div>
  );
};

export default ObligationsPage;