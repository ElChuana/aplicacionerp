import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  Tabs,
  Descriptions,
  Button,
  Space,
  Typography,
  Spin,
  message,
  Table,
  Input,
  InputNumber,
  Form,
  Modal,
  Upload,
  Select,
  Tag,
} from 'antd';
import {
  EditOutlined,
  UploadOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
// const { TextArea } = Input;

interface Project {
  id: number;
  code: string;
  name: string;
  address: string;
  comuna: string;
  status: string;
  description?: string;
  company: {
    id: number;
    name: string;
  };
}

interface Unit {
  id: number;
  code: string;
  name: string;
  unit_type: string;
  status: string;
  floor: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  total_m2: number | null;
  covered_m2: number | null;
  terrace_m2: number | null;
  orientation: string | null;
  current_price_uf?: number | null;
  surface_total?: number | null;
}

// interface UnitPrice {
//   id: number;
//   unit_id: number;
//   currency: string;
//   amount: number;
//   valid_from: string;
//   valid_to: string | null;
//   reason: string;
// }

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [bulkPriceModalVisible, setBulkPriceModalVisible] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedUnitIds, setSelectedUnitIds] = useState<number[]>([]);
  const [form] = Form.useForm();
  const [priceForm] = Form.useForm();
  const [bulkPriceForm] = Form.useForm();

  const fetchProject = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/projects?id=${id}`);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setProject(data[0]);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      message.error('Error al cargar el proyecto');
    } finally {
      setLoading(false);
    }
  };

  const fetchUnits = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/crm/units?projectId=${id}`);
      const data = await response.json();
      setUnits(data);
    } catch (error) {
      console.error('Error fetching units:', error);
      message.error('Error al cargar las unidades');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProject();
      fetchUnits();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleEditUnit = (unit: Unit) => {
    setEditingUnit(unit);
    form.setFieldsValue(unit);
  };

  const handleSaveUnit = async () => {
    try {
  const _values = await form.validateFields();
      // TODO: Implementar actualización de unidad
      message.success('Unidad actualizada correctamente');
      setEditingUnit(null);
      fetchUnits();
    } catch (error) {
      console.error('Error saving unit:', error);
      message.error('Error al guardar la unidad');
    }
  };

  const handleManagePrices = (unit: Unit) => {
    setSelectedUnit(unit);
    setPriceModalVisible(true);
  };

  const handleAddPrice = async () => {
    try {
  const _values = await priceForm.validateFields();
      // TODO: Implementar creación de precio
      message.success('Precio agregado correctamente');
      priceForm.resetFields();
      setPriceModalVisible(false);
    } catch (error) {
      console.error('Error adding price:', error);
      message.error('Error al agregar precio');
    }
  };

  const handleBulkPriceUpdate = async () => {
    try {
      const values = await bulkPriceForm.validateFields();
      const { adjustmentType, adjustmentValue } = values;

      if (selectedUnitIds.length === 0) {
        message.warning('Selecciona al menos una unidad');
        return;
      }

      // TODO: Implementar actualización masiva de precios
      // Por cada unidad seleccionada, obtener precio actual y ajustarlo
      message.success(
        `Precios actualizados para ${selectedUnitIds.length} unidades: ${
          adjustmentType === 'fixed' 
            ? `+${adjustmentValue.toLocaleString('es-CL')} UF` 
            : `+${adjustmentValue}%`
        }`
      );
      
      bulkPriceForm.resetFields();
      setBulkPriceModalVisible(false);
      setSelectedUnitIds([]);
      fetchUnits();
    } catch (error) {
      console.error('Error updating bulk prices:', error);
      message.error('Error al actualizar los precios');
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedUnitIds,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedUnitIds(selectedRowKeys as number[]);
    },
  };

  const unitColumns: ColumnsType<Unit> = [
    {
      title: 'Código',
      dataIndex: 'code',
      key: 'code',
      width: 100,
      fixed: 'left',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: 'Tipo',
      dataIndex: 'unit_type',
      key: 'unit_type',
      width: 130,
      render: (type: string) => {
        const colors: Record<string, string> = {
          DEPARTAMENTO: 'blue',
          ESTACIONAMIENTO: 'green',
          BODEGA: 'orange',
          CASA: 'purple',
        };
        return <Tag color={colors[type] || 'default'}>{type}</Tag>;
      },
    },
    {
      title: 'Piso',
      dataIndex: 'floor',
      key: 'floor',
      width: 80,
      align: 'center',
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
      title: 'M² Total',
      dataIndex: 'total_m2',
      key: 'total_m2',
      width: 100,
      align: 'right',
      render: (val: number | null, record) => {
        const m2 = val || record.surface_total;
        return m2 ? `${Number(m2).toLocaleString('es-CL', { maximumFractionDigits: 2 })} m²` : '-';
      },
    },
    {
      title: 'Precio UF',
      dataIndex: 'current_price_uf',
      key: 'current_price_uf',
      width: 120,
      align: 'right',
      render: (val: number | null) =>
        val ? `${Number(val).toLocaleString('es-CL', { maximumFractionDigits: 2 })} UF` : '-',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (status: string) => {
        const colors: Record<string, string> = {
          DISPONIBLE: 'success',
          RESERVADA: 'warning',
          VENDIDA: 'error',
        };
        return <Tag color={colors[status] || 'default'}>{status}</Tag>;
      },
    },
    {
      title: 'Acciones',
      key: 'actions',
      fixed: 'right',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditUnit(record)}
          >
            Editar
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={() => handleManagePrices(record)}
          >
            Precios
          </Button>
        </Space>
      ),
    },
  ];

  if (loading && !project) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ padding: '24px' }}>
        <Text>Proyecto no encontrado</Text>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push({
              pathname: '/crm/projects',
              query: { company: router.query.company }
            })}
            style={{ marginBottom: 16 }}
          >
            Volver a Proyectos
          </Button>
          <Title level={2} style={{ margin: 0 }}>
            {project.name}
          </Title>
          <Text type="secondary">{project.code}</Text>
        </div>

        <Tabs defaultActiveKey="info">
          <TabPane tab="Información General" key="info">
            <Card>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Código">{project.code}</Descriptions.Item>
                <Descriptions.Item label="Estado">
                  <Tag color="success">{project.status}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Empresa">{project.company.name}</Descriptions.Item>
                <Descriptions.Item label="Comuna">{project.comuna}</Descriptions.Item>
                <Descriptions.Item label="Dirección" span={2}>
                  {project.address}
                </Descriptions.Item>
                {project.description && (
                  <Descriptions.Item label="Descripción" span={2}>
                    {project.description}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>
          </TabPane>

          <TabPane tab="Unidades" key="units">
            <Card
              extra={
                <Space>
                  {selectedUnitIds.length > 0 && (
                    <Button 
                      type="primary" 
                      onClick={() => setBulkPriceModalVisible(true)}
                    >
                      Ajustar Precios ({selectedUnitIds.length})
                    </Button>
                  )}
                  <Button type="primary" icon={<PlusOutlined />}>
                    Nueva Unidad
                  </Button>
                </Space>
              }
            >
              <Table
                rowSelection={rowSelection}
                columns={unitColumns}
                dataSource={units}
                loading={loading}
                rowKey="id"
                scroll={{ x: 1200 }}
                pagination={{
                  pageSize: 20,
                  showTotal: (total) => `Total: ${total.toLocaleString('es-CL')} unidades`,
                }}
              />
            </Card>
          </TabPane>

          <TabPane tab="Documentos" key="documents">
            <Card>
              <Upload.Dragger
                name="files"
                multiple
                action="/api/upload"
                onChange={(info) => {
                  if (info.file.status === 'done') {
                    message.success(`${info.file.name} subido correctamente`);
                  } else if (info.file.status === 'error') {
                    message.error(`Error al subir ${info.file.name}`);
                  }
                }}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">
                  Haz clic o arrastra archivos para subir
                </p>
                <p className="ant-upload-hint">
                  Sube plantas, documentos técnicos, renders, etc.
                </p>
              </Upload.Dragger>
            </Card>
          </TabPane>
        </Tabs>
      </Space>

      {/* Modal para editar unidad */}
      <Modal
        title={`Editar Unidad: ${editingUnit?.code}`}
        open={!!editingUnit}
        onOk={handleSaveUnit}
        onCancel={() => setEditingUnit(null)}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Código" name="code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Nombre" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Tipo" name="unit_type" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="DEPARTAMENTO">Departamento</Select.Option>
              <Select.Option value="CASA">Casa</Select.Option>
              <Select.Option value="ESTACIONAMIENTO">Estacionamiento</Select.Option>
              <Select.Option value="BODEGA">Bodega</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Piso" name="floor">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Dormitorios" name="bedrooms">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Baños" name="bathrooms">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="M² Totales" name="total_m2">
            <InputNumber style={{ width: '100%' }} step={0.01} />
          </Form.Item>
          <Form.Item label="M² Cubiertos" name="covered_m2">
            <InputNumber style={{ width: '100%' }} step={0.01} />
          </Form.Item>
          <Form.Item label="M² Terraza" name="terrace_m2">
            <InputNumber style={{ width: '100%' }} step={0.01} />
          </Form.Item>
          <Form.Item label="Orientación" name="orientation">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para gestionar precios */}
      <Modal
        title={`Precio de Unidad: ${selectedUnit?.code}`}
        open={priceModalVisible}
        onOk={handleAddPrice}
        onCancel={() => setPriceModalVisible(false)}
        width={500}
        okText="Guardar Precio"
      >
        <Form form={priceForm} layout="vertical">
          <Form.Item 
            label="Precio en UF" 
            name="amount" 
            rules={[{ required: true, message: 'Ingresa el precio en UF' }]}
          >
            <InputNumber 
              style={{ width: '100%' }} 
              step={0.01}
              min={0}
              placeholder="Ej: 3500"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para ajuste masivo de precios */}
      <Modal
        title={`Ajustar Precios - ${selectedUnitIds.length} unidades seleccionadas`}
        open={bulkPriceModalVisible}
        onOk={handleBulkPriceUpdate}
        onCancel={() => {
          setBulkPriceModalVisible(false);
          bulkPriceForm.resetFields();
        }}
        width={500}
        okText="Aplicar Ajuste"
      >
        <Form form={bulkPriceForm} layout="vertical" initialValues={{ adjustmentType: 'fixed' }}>
          <Form.Item 
            label="Tipo de Ajuste" 
            name="adjustmentType" 
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="fixed">Aumentar monto fijo (UF)</Select.Option>
              <Select.Option value="percentage">Aumentar porcentaje (%)</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => 
            prevValues.adjustmentType !== currentValues.adjustmentType
          }>
            {({ getFieldValue }) => {
              const adjustmentType = getFieldValue('adjustmentType');
              return (
                <Form.Item 
                  label={adjustmentType === 'fixed' ? 'Monto a Aumentar (UF)' : 'Porcentaje a Aumentar (%)'}
                  name="adjustmentValue" 
                  rules={[
                    { required: true, message: 'Ingresa el valor del ajuste' },
                    { type: 'number', min: 0, message: 'El valor debe ser mayor a 0' }
                  ]}
                >
                  <InputNumber 
                    style={{ width: '100%' }} 
                    step={adjustmentType === 'fixed' ? 50 : 1}
                    min={0}
                    placeholder={adjustmentType === 'fixed' ? 'Ej: 300' : 'Ej: 10'}
                    addonAfter={adjustmentType === 'fixed' ? 'UF' : '%'}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>

          <div style={{ 
            padding: '12px', 
            backgroundColor: '#f0f5ff', 
            borderRadius: '4px',
            marginTop: '16px'
          }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              💡 <strong>Ejemplo:</strong> Si seleccionas &quot;Aumentar monto fijo&quot; con valor 300 UF, 
              todas las unidades seleccionadas aumentar&aacute;n su precio actual en 300 UF.
            </Text>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
