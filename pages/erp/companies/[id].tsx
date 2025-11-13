// File: pages/companies/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Layout, Spin, Typography, Card, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Content } = Layout;
const { Title, Text } = Typography;
const fetcher = (url: string) => fetch(url).then(res => res.json());

type Company = { id: number; name: string; rut?: string; address?: string };
type Project = { id: number; code: string; name: string; created_at: string };
type BankAccount = { id: number; bank_name: string; account_no: string; currency: string };
type CostCenter = { name: string; totalCLP: number; totalUF: number };

export default function CompanyPage() {
  const router = useRouter();
  const { id } = router.query;
  const compId = Array.isArray(id) ? Number(id[0]) : Number(id);

  // Fetch data
  const { data: companies } = useSWR<Company[]>('/api/companies', fetcher);
  const companyInfo = companies?.find(c => c.id === compId);
  const { data: projects } = useSWR<Project[]>(
    compId ? `/api/erp/projects?company=${compId}` : null,
    fetcher
  );
  const { data: accounts } = useSWR<BankAccount[]>(
    compId ? `/api/erp/bank-accounts?company=${compId}` : null,
    fetcher
  );
  const { data: costCenters } = useSWR<CostCenter[]>(
    compId ? `/api/erp/cost-centers?company=${compId}` : null,
    fetcher
  );

  if (!router.isReady || !companyInfo || !projects || !accounts || !costCenters) {
    return <Spin tip="Cargando..." style={{ marginTop: 50, textAlign: 'center' }} />;
  }

  const projectCols: ColumnsType<Project> = [
    { title: 'Código', dataIndex: 'code', key: 'code' },
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Creado', dataIndex: 'created_at', key: 'created_at' },
  ];

  const accountCols: ColumnsType<BankAccount> = [
    { title: 'Banco', dataIndex: 'bank_name', key: 'bank_name' },
    { title: 'Cuenta', dataIndex: 'account_no', key: 'account_no' },
    { title: 'Moneda', dataIndex: 'currency', key: 'currency' },
  ];

  const costCols: ColumnsType<CostCenter> = [
    { title: 'Centro', dataIndex: 'name', key: 'name' },
    { title: 'Total CLP', dataIndex: 'totalCLP', key: 'totalCLP', render: v => v.toLocaleString('es-CL') },
    { title: 'Total UF', dataIndex: 'totalUF', key: 'totalUF', render: v => v.toLocaleString('es-CL', { minimumFractionDigits: 2 }) },
  ];

  return (
    <Content style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <Button onClick={() => router.back()} style={{ marginBottom: 16 }}>
        Volver
      </Button>
      <Card style={{ marginBottom: 24 }}>
        <Title level={3}>{companyInfo.name}</Title>
        {companyInfo.rut && <Text style={{ display: 'block' }}>RUT: {companyInfo.rut}</Text>}
        {companyInfo.address && <Text style={{ display: 'block' }}>Dirección: {companyInfo.address}</Text>}
      </Card>

      <Card title="Proyectos" style={{ marginBottom: 24 }}>
        <Table<Project>
          dataSource={projects}
          columns={projectCols}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Card title="Cuentas Bancarias" style={{ marginBottom: 24 }}>
        <Table<BankAccount>
          dataSource={accounts}
          columns={accountCols}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Card title="Centros de Costo" style={{ marginBottom: 24 }}>
        <Table<CostCenter>
          dataSource={costCenters}
          columns={costCols}
          rowKey="name"
          pagination={false}
        />
      </Card>
    </Content>
  );
}
