import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Table, Button, Card, Typography, Tag, Statistic, Row, Col } from 'antd';
import { EyeOutlined, HomeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

interface Project {
  id: number;
  code: string;
  name: string;
  address: string;
  comuna: string;
  status: string;
  company: {
    id: number;
    name: string;
  };
  _count: {
    units: number;
  };
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const companyId = router.query.company as string;
      const params = new URLSearchParams();
      if (companyId) params.append('company', companyId);

      const response = await fetch(`/api/projects?${params}`);
      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.query.company) {
      fetchProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.company]);

  const columns: ColumnsType<Project> = [
    {
      title: 'Código',
      dataIndex: 'code',
      key: 'code',
      width: 120,
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Dirección',
      dataIndex: 'address',
      key: 'address',
      width: 200,
    },
    {
      title: 'Comuna',
      dataIndex: 'comuna',
      key: 'comuna',
      width: 150,
    },
    {
      title: 'Unidades',
      key: 'units',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Tag color="blue">{record._count.units}</Tag>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        const colors: Record<string, string> = {
          ACTIVO: 'success',
          EN_DESARROLLO: 'processing',
          FINALIZADO: 'default',
        };
        return <Tag color={colors[status] || 'default'}>{status}</Tag>;
      },
    },
    {
      title: 'Acciones',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() =>
            router.push({
              pathname: `/crm/projects/${record.id}`,
              query: { company: router.query.company },
            })
          }
        >
          Ver
        </Button>
      ),
    },
  ];

  const stats = {
    total: projects.length,
    activos: projects.filter(p => p.status === 'ACTIVO').length,
    totalUnits: projects.reduce((sum, p) => sum + p._count.units, 0),
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          <HomeOutlined /> Proyectos Inmobiliarios
        </Title>
        <Text type="secondary">Gestiona los proyectos de tu inmobiliaria</Text>
      </div>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Proyectos"
              value={stats.total}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Proyectos Activos"
              value={stats.activos}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Unidades"
              value={stats.totalUnits}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Table
          columns={columns}
          dataSource={projects}
          loading={loading}
          rowKey="id"
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total: ${total.toLocaleString('es-CL')} proyectos`,
          }}
        />
      </Card>
    </div>
  );
}
