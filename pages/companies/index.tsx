// File: pages/companies/index.tsx
import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Card, Table, Button, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const fetcher = (url: string) => fetch(url).then(res => res.json());

type Company = { 
  id: number; 
  name: string; 
  rut?: string; 
  address?: string; 
};

export default function CompaniesPage() {
  const router = useRouter();
  const { data: companies, isLoading } = useSWR<Company[]>('/api/companies', fetcher);

  const columns: ColumnsType<Company> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'RUT',
      dataIndex: 'rut',
      key: 'rut',
    },
    {
      title: 'Dirección',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => router.push(`/companies/${record.id}`)}
        >
          Ver
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
      <Card>
        <Title level={3}>Empresas</Title>
        <Table<Company>
          dataSource={companies}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 20 }}
        />
      </Card>
    </div>
  );
}
