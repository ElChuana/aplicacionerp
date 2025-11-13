// File: pages/erp/cost-centers/index.tsx
import React, { useState } from 'react';
import { Spin, Typography, Tabs } from 'antd';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { CostCentersSummary, CostCenterAgg } from '../../../components/CostCentersSummary';
import { UnassignedMovementsTable } from '../../../components/UnassignedMovementsTable';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  });

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0'];

export default function CostCentersPage() {
  const router = useRouter();
  const { company } = router.query;
  const [unit, setUnit] = useState<'CLP' | 'UF'>('CLP');

  const companyId = Array.isArray(company) ? company[0] : company;

  const summaryKey =
    router.isReady && companyId ? `/api/erp/cost-centers?company=${companyId}` : null;
  const unassignedKey =
    router.isReady && companyId
      ? `/api/bank-movements?company=${companyId}&unassigned=true`
      : null;

  const { data: summary, error: errSum } = useSWR<CostCenterAgg[]>(summaryKey, fetcher);
  const { data: unassigned, error: errUn } = useSWR<any[]>(unassignedKey, fetcher);

  if (!router.isReady || !summary || !unassigned) {
    return (
      <Spin
        tip="Cargando centros y movimientos..."
        style={{ marginTop: 50, textAlign: 'center' }}
      />
    );
  }
  if (errSum || errUn) {
    return <Text type="danger">Error cargando datos</Text>;
  }

  // Process summary to ensure values are shown correctly
  const processedSummary = summary.map(cc => ({
    ...cc,
    totalCLP: cc.totalCLP,
    totalUF: cc.totalUF
  }));

  // Totales generales
  const totalCLP = processedSummary.reduce((acc, cc) => acc + (cc.totalCLP ?? 0), 0);
  const totalUF = processedSummary.reduce((acc, cc) => acc + (cc.totalUF ?? 0), 0);

  // Filtramos "ingresos" y centros sin movimientos de los gráficos
  const dataForCharts = processedSummary.filter(cc => 
    cc.name.toLowerCase() !== 'ingresos' && 
    (cc.totalCLP !== 0 || cc.totalUF !== 0)
  );

  console.log('dataForCharts:', dataForCharts);

  // Datos para gráficos (todos los centros excepto ingresos)
  const chartData = dataForCharts.map((cc: CostCenterAgg) => ({
    name: cc.name,
    CLP: Math.abs(cc.totalCLP ?? 0),
    UF: Math.abs(cc.totalUF ?? 0),
  }));

  console.log('chartData:', chartData);
  console.log('unit:', unit);

  const pieData = dataForCharts.map((cc: CostCenterAgg) => ({
    name: cc.name,
    value: Math.abs(unit === 'CLP' ? (cc.totalCLP ?? 0) : (cc.totalUF ?? 0)),
  }));

  console.log('pieData:', pieData);

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <Title level={3}>Centros de Costo</Title>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Total CLP: </Text>
        <Text>{Math.round(totalCLP).toLocaleString('es-CL')}</Text>
        <span style={{ marginLeft: 24 }} />
        <Text strong>Total UF: </Text>
        <Text>{totalUF.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
      </div>
      {/* Totales resumen */}
      <CostCentersSummary
        data={processedSummary}
        onSelect={(id) =>
          router.push({ pathname: `/erp/cost-centers/${id}`, query: { company: companyId } })
        }
      />

      {/* Selector de unidad */}
      <Tabs
        activeKey={unit}
        onChange={(key) => setUnit(key as 'CLP' | 'UF')}
        style={{ marginTop: 24 }}
      >
        <TabPane tab="CLP" key="CLP" />
        <TabPane tab="UF" key="UF" />
      </Tabs>

      {/* Gráfico de barras */}
      <Title level={4}>Totales por Centro ({unit})</Title>
      {chartData.length > 0 ? (
        <div style={{ width: '100%', height: 300, marginBottom: 32 }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(v: number) => v.toLocaleString('es-CL')} />
              <Legend />
              <Bar dataKey={unit} fill="#8884d8">
                {chartData.map((_: unknown, index: number) => (
                  <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <Text>No hay datos para mostrar</Text>
      )}
      {/* Gráfico de torta */}
      <Title level={4}>Distribución de Totales</Title>
      {pieData.length > 0 ? (
        <div style={{ width: '100%', height: 300, marginBottom: 32 }}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }: { name: string; percent: number }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {pieData.map((_: unknown, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => v.toLocaleString('es-CL')} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <Text>No hay datos para mostrar</Text>
      )}

      {/* Movimientos sin centro */}
      <Title level={4} style={{ marginTop: 32 }}>
        Movimientos sin Centro de Costo
      </Title>
      <UnassignedMovementsTable data={unassigned} />
    </div>
  );
}
