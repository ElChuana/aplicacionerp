import { Table, Tag, Button, Space, Select, Card, Row, Col } from 'antd';
import { EditOutlined, EyeOutlined, FileTextOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
const { Option } = Select;

interface QuotationItem {
  unit: {
    code: string;
    unit_type: string;
  };
  price_clp: number;
  price_uf: number | null;
}

interface Quotation {
  id: number;
  quotation_number: string;
  quotation_date: string;
  valid_until: string | null;
  status: string;
  total_amount: number;
  client: {
    name: string;
    rut: string;
  };
  project: {
    name: string;
    code: string;
  };
  quotation_items: QuotationItem[];
  _count: {
    promises: number;
  };
  created_at: string;
}

interface QuotationsTableProps {
  companyId?: number;
  clientId?: number;
  projectId?: number;
  onEdit?: (quotation: Quotation) => void;
  onView?: (quotation: Quotation) => void;
}

export default function QuotationsTable({ 
  companyId, 
  clientId, 
  projectId, 
  onEdit, 
  onView 
}: QuotationsTableProps) {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (companyId) params.append('companyId', companyId.toString());
      if (clientId) params.append('clientId', clientId.toString());
      if (projectId) params.append('projectId', projectId.toString());
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/crm/quotations?${params}`);
      const data = await response.json();
      setQuotations(data);
    } catch (error) {
      console.error('Error fetching quotations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos en cliente al montar
  useEffect(() => {
    fetchQuotations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      BORRADOR: 'default',
      ENVIADA: 'processing',
      ACEPTADA: 'success',
      RECHAZADA: 'error',
      VENCIDA: 'warning',
    };
    return colors[status] || 'default';
  };

  const columns: ColumnsType<Quotation> = [
    {
      title: 'N° Cotización',
      dataIndex: 'quotation_number',
      key: 'quotation_number',
      width: 130,
      fixed: 'left',
      render: (number: string) => (
        <Space>
          <FileTextOutlined />
          <span>{number}</span>
        </Space>
      ),
    },
    {
      title: 'Fecha',
      dataIndex: 'quotation_date',
      key: 'quotation_date',
      width: 110,
      render: (date: string) => new Date(date).toLocaleDateString('es-CL'),
      sorter: (a, b) => new Date(a.quotation_date).getTime() - new Date(b.quotation_date).getTime(),
    },
    {
      title: 'Cliente',
      key: 'client',
      width: 200,
      render: (_, record) => (
        <div>
          <div>{record.client.name}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>{record.client.rut}</div>
        </div>
      ),
    },
    {
      title: 'Proyecto',
      key: 'project',
      width: 180,
      render: (_, record) => (
        <div>
          <div>{record.project.name}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>{record.project.code}</div>
        </div>
      ),
    },
    {
      title: 'Unidades',
      key: 'units',
      width: 150,
      render: (_, record) => (
        <div>
          {record.quotation_items.slice(0, 2).map((item, idx) => (
            <Tag key={idx} color="blue" style={{ marginBottom: 4 }}>
              {item.unit.code}
            </Tag>
          ))}
          {record.quotation_items.length > 2 && (
            <Tag>+{record.quotation_items.length - 2}</Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Monto Total',
      dataIndex: 'total_amount',
      key: 'total_amount',
      width: 140,
      align: 'right',
      render: (amount: number) => `$${amount.toLocaleString('es-CL')}`,
      sorter: (a, b) => a.total_amount - b.total_amount,
    },
    {
      title: 'Válida Hasta',
      dataIndex: 'valid_until',
      key: 'valid_until',
      width: 110,
      render: (date: string | null) => 
        date ? new Date(date).toLocaleDateString('es-CL') : '-',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Promesas',
      key: 'promises',
      width: 90,
      align: 'center',
      render: (_, record) => (
        <Tag color={record._count.promises > 0 ? 'success' : 'default'}>
          {record._count.promises}
        </Tag>
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
              disabled={record.status === 'ACEPTADA'}
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
            <Select
              placeholder="Estado"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              style={{ width: 200 }}
            >
              <Option value="BORRADOR">Borrador</Option>
              <Option value="ENVIADA">Enviada</Option>
              <Option value="ACEPTADA">Aceptada</Option>
              <Option value="RECHAZADA">Rechazada</Option>
              <Option value="VENCIDA">Vencida</Option>
            </Select>
          </Col>
          <Col>
            <Button 
              type="primary" 
              onClick={fetchQuotations}
              loading={loading}
            >
              Buscar
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={quotations}
          loading={loading}
          rowKey="id"
          scroll={{ x: 1500 }}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total) => `Total: ${total.toLocaleString('es-CL')} cotizaciones`,
          }}
        />
      </Space>
    </Card>
  );
}
