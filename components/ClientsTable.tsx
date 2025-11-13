import { Table, Tag, Button, Space, Input, Select, Card, Row, Col } from 'antd';
import { EditOutlined, EyeOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

interface Client {
  id: number;
  rut: string;
  name: string;
  email: string | null;
  phone: string | null;
  client_type: string;
  comuna: string | null;
  region: string | null;
  company: {
    id: number;
    name: string;
  };
  _count: {
    quotations: number;
    promises: number;
    receivables: number;
  };
  created_at: string;
}

interface ClientsTableProps {
  companyId?: number;
  onEdit?: (client: Client) => void;
  onView?: (client: Client) => void;
}

export default function ClientsTable({ companyId, onEdit, onView }: ClientsTableProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | undefined>();

  const fetchClients = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (companyId) params.append('companyId', companyId.toString());
      if (typeFilter) params.append('clientType', typeFilter);
      if (searchText) params.append('search', searchText);

      const response = await fetch(`/api/crm/clients?${params}`);
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos en cliente al montar
  useEffect(() => {
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClientTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      PERSONA_NATURAL: 'Persona Natural',
      PERSONA_JURIDICA: 'Persona Jurídica',
    };
    return labels[type] || type;
  };

  const columns: ColumnsType<Client> = [
    {
      title: 'RUT',
      dataIndex: 'rut',
      key: 'rut',
      width: 120,
      fixed: 'left',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (name: string) => (
        <Space>
          <UserOutlined />
          <span>{name}</span>
        </Space>
      ),
    },
    {
      title: 'Tipo',
      dataIndex: 'client_type',
      key: 'client_type',
      width: 150,
      render: (type: string) => (
        <Tag color={type === 'PERSONA_NATURAL' ? 'blue' : 'purple'}>
          {getClientTypeLabel(type)}
        </Tag>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
    },
    {
      title: 'Comuna',
      dataIndex: 'comuna',
      key: 'comuna',
      width: 130,
    },
    {
      title: 'Región',
      dataIndex: 'region',
      key: 'region',
      width: 150,
    },
    {
      title: 'Cotizaciones',
      key: 'quotations',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Tag color="geekblue">{record._count.quotations}</Tag>
      ),
    },
    {
      title: 'Promesas',
      key: 'promises',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Tag color="orange">{record._count.promises}</Tag>
      ),
    },
    {
      title: 'CxC',
      key: 'receivables',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <Tag color="red">{record._count.receivables}</Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          {onView && (
            <Button 
              type="link" 
              icon={<EyeOutlined />} 
              onClick={() => onView(record)}
              size="small"
            />
          )}
          {onEdit && (
            <Button 
              type="link" 
              icon={<EditOutlined />} 
              onClick={() => onEdit(record)}
              size="small"
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col flex="auto">
            <Input
              placeholder="Buscar por RUT, nombre o email..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={fetchClients}
              allowClear
            />
          </Col>
          <Col>
            <Select
              placeholder="Tipo de cliente"
              value={typeFilter}
              onChange={setTypeFilter}
              allowClear
              style={{ width: 180 }}
            >
              <Option value="PERSONA_NATURAL">Persona Natural</Option>
              <Option value="PERSONA_JURIDICA">Persona Jurídica</Option>
            </Select>
          </Col>
          <Col>
            <Button 
              type="primary" 
              onClick={fetchClients}
              loading={loading}
            >
              Buscar
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={clients}
          loading={loading}
          rowKey="id"
          scroll={{ x: 1600 }}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total) => `Total: ${total.toLocaleString('es-CL')} clientes`,
          }}
        />
      </Space>
    </Card>
  );
}
