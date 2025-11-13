import { Table, Tag, Button, Space, Input, Select, Card, Row, Col, Statistic, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;
const { TabPane } = Tabs;

interface Unit {
  id: number;
  code: string;
  unit_type: string;
  floor: number | null;
  surface_total: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  status: string;
  current_price: number | null;
  current_price_uf: number | null;
  project: {
    id: number;
    name: string;
    code: string;
  };
}

interface UnitsTableProps {
  projectId?: number;
  onEdit?: (unit: Unit) => void;
  onView?: (unit: Unit) => void;
}

export default function UnitsTable({ projectId, onEdit: _onEdit, onView: _onView }: UnitsTableProps) {
  const router = useRouter();
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [typeFilter, setTypeFilter] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<'primary' | 'secondary'>('primary');

  const fetchUnits = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (projectId) params.append('projectId', projectId.toString());
      if (statusFilter) params.append('status', statusFilter);
      if (typeFilter) params.append('unitType', typeFilter);
      
      // Agregar filtro de company desde el router query
      const companyId = router.query.company as string;
      if (companyId) params.append('companyId', companyId);

      const response = await fetch(`/api/crm/units?${params}`);
      const data = await response.json();
      setUnits(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching units:', error);
      setUnits([]);
    } finally {
      setLoading(false);
    }
  }, [projectId, statusFilter, typeFilter, router.query.company]);

  // Cargar datos al montar y cuando cambie el filtro de company
  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      DISPONIBLE: 'success',
      RESERVADA: 'warning',
      VENDIDA: 'error',
      BLOQUEADA: 'default',
    };
    return colors[status] || 'default';
  };

  const getUnitTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      DEPARTAMENTO: 'Depto',
      ESTACIONAMIENTO: 'Estac',
      BODEGA: 'Bodega',
      CASA: 'Casa',
      LOCAL: 'Local',
      OFICINA: 'Oficina',
    };
    return labels[type] || type;
  };

  const columns: ColumnsType<Unit> = [
    {
      title: 'Código',
      dataIndex: 'code',
      key: 'code',
      fixed: 'left',
      width: 100,
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: 'Proyecto',
      key: 'project',
      width: 150,
      render: (_, record) => record.project.name,
    },
    {
      title: 'Tipo',
      dataIndex: 'unit_type',
      key: 'unit_type',
      width: 100,
      render: (type: string) => (
        <Tag color="blue">{getUnitTypeLabel(type)}</Tag>
      ),
    },
    {
      title: 'Piso',
      dataIndex: 'floor',
      key: 'floor',
      width: 80,
      align: 'center',
      sorter: (a, b) => (a.floor || 0) - (b.floor || 0),
    },
    {
      title: 'Sup. Total',
      dataIndex: 'surface_total',
      key: 'surface_total',
      width: 100,
      align: 'right',
      render: (value: number | null) => value ? `${value.toLocaleString('es-CL')} m²` : '-',
    },
    {
      title: 'Dorm',
      dataIndex: 'bedrooms',
      key: 'bedrooms',
      width: 70,
      align: 'center',
    },
    {
      title: 'Baños',
      dataIndex: 'bathrooms',
      key: 'bathrooms',
      width: 70,
      align: 'center',
    },
    {
      title: 'Precio UF',
      dataIndex: 'current_price_uf',
      key: 'current_price_uf',
      width: 130,
      align: 'right',
      render: (value: number | null) => 
        value ? `${value.toLocaleString('es-CL')} UF` : '-',
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
  ];

  // Separar productos primarios y secundarios
  const primaryTypes = ['DEPARTAMENTO', 'CASA'];
  const secondaryTypes = ['ESTACIONAMIENTO', 'BODEGA'];

  // Filtrar por tipo de producto (primario/secundario) y búsqueda
  const filteredUnits = Array.isArray(units) ? units.filter(unit => {
    // Filtro por pestaña activa
    const isPrimary = primaryTypes.includes(unit.unit_type);
    const isSecondary = secondaryTypes.includes(unit.unit_type);
    
    if (activeTab === 'primary' && !isPrimary) return false;
    if (activeTab === 'secondary' && !isSecondary) return false;

    // Filtro por texto de búsqueda
    if (!searchText) return true;
    const search = searchText.toLowerCase();
    return (
      unit.code.toLowerCase().includes(search) ||
      unit.project.name.toLowerCase().includes(search) ||
      unit.project.code.toLowerCase().includes(search)
    );
  }) : [];

  // Estadísticas por pestaña
  const stats = {
    total: filteredUnits.length,
    disponibles: filteredUnits.filter(u => u.status === 'DISPONIBLE').length,
    reservadas: filteredUnits.filter(u => u.status === 'RESERVADA').length,
    vendidas: filteredUnits.filter(u => u.status === 'VENDIDA').length,
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Unidades" 
              value={stats.total}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Disponibles" 
              value={stats.disponibles}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Reservadas" 
              value={stats.reservadas}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Vendidas" 
              value={stats.vendidas}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Tabs 
          activeKey={activeTab} 
          onChange={(key) => setActiveTab(key as 'primary' | 'secondary')}
          style={{ marginBottom: 16 }}
        >
          <TabPane tab="Productos Principales" key="primary">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Row gutter={16}>
                <Col flex="auto">
                  <Input
                    placeholder="Buscar por código o proyecto..."
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    allowClear
                  />
                </Col>
                <Col>
                  <Select
                    placeholder="Estado"
                    value={statusFilter}
                    onChange={setStatusFilter}
                    allowClear
                    style={{ width: 150 }}
                  >
                    <Option value="DISPONIBLE">Disponible</Option>
                    <Option value="RESERVADA">Reservada</Option>
                    <Option value="VENDIDA">Vendida</Option>
                    <Option value="BLOQUEADA">Bloqueada</Option>
                  </Select>
                </Col>
                <Col>
                  <Select
                    placeholder="Tipo"
                    value={typeFilter}
                    onChange={setTypeFilter}
                    allowClear
                    style={{ width: 150 }}
                  >
                    <Option value="DEPARTAMENTO">Departamento</Option>
                    <Option value="CASA">Casa</Option>
                  </Select>
                </Col>
                <Col>
                  <Button 
                    type="primary" 
                    onClick={fetchUnits}
                    loading={loading}
                  >
                    Buscar
                  </Button>
                </Col>
              </Row>

              <Table
                columns={columns}
                dataSource={filteredUnits}
                loading={loading}
                rowKey="id"
                scroll={{ x: 1300 }}
                pagination={{
                  pageSize: 20,
                  showSizeChanger: true,
                  showTotal: (total) => `Total: ${total.toLocaleString('es-CL')} unidades`,
                }}
              />
            </Space>
          </TabPane>
          
          <TabPane tab="Productos Secundarios" key="secondary">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Row gutter={16}>
                <Col flex="auto">
                  <Input
                    placeholder="Buscar por código o proyecto..."
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    allowClear
                  />
                </Col>
                <Col>
                  <Select
                    placeholder="Estado"
                    value={statusFilter}
                    onChange={setStatusFilter}
                    allowClear
                    style={{ width: 150 }}
                  >
                    <Option value="DISPONIBLE">Disponible</Option>
                    <Option value="RESERVADA">Reservada</Option>
                    <Option value="VENDIDA">Vendida</Option>
                    <Option value="BLOQUEADA">Bloqueada</Option>
                  </Select>
                </Col>
                <Col>
                  <Select
                    placeholder="Tipo"
                    value={typeFilter}
                    onChange={setTypeFilter}
                    allowClear
                    style={{ width: 150 }}
                  >
                    <Option value="ESTACIONAMIENTO">Estacionamiento</Option>
                    <Option value="BODEGA">Bodega</Option>
                  </Select>
                </Col>
                <Col>
                  <Button 
                    type="primary" 
                    onClick={fetchUnits}
                    loading={loading}
                  >
                    Buscar
                  </Button>
                </Col>
              </Row>

              <Table
                columns={columns}
                dataSource={filteredUnits}
                loading={loading}
                rowKey="id"
                scroll={{ x: 1300 }}
                pagination={{
                  pageSize: 20,
                  showSizeChanger: true,
                  showTotal: (total) => `Total: ${total.toLocaleString('es-CL')} unidades`,
                }}
              />
            </Space>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
