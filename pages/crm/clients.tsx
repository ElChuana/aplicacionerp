import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Typography, message, Modal, Form, Input, Select, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ClientsTable from '../../components/ClientsTable';

const { Title, Text } = Typography;

export default function ClientsPage() {
  const router = useRouter();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [createForm] = Form.useForm();
  const [tableKey, setTableKey] = useState(0);

  const handleView = (client: any) => {
    router.push(`/crm/clients/${client.id}`);
  };

  const handleEdit = (client: any) => {
    message.info(`Editar cliente: ${client.name}`);
  };

  const handleCreate = async (values: any) => {
    try {
      // Obtener company_id del query string
      const companyId = router.query.company || 1;
      
      // Construir nombre completo si es persona
      const fullName = values.client_type === 'PERSONA'
        ? `${values.first_name} ${values.last_name}`.trim()
        : values.name;

      const response = await fetch('/api/crm/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          company_id: Number(companyId),
          name: fullName,
        }),
      });

      if (response.ok) {
        message.success('Cliente creado exitosamente');
        setCreateModalVisible(false);
        createForm.resetFields();
        setTableKey(prev => prev + 1);
      } else {
        const error = await response.json();
        message.error(error.error || 'Error al crear cliente');
      }
    } catch (error) {
      message.error('Error al crear cliente');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Gestión de Clientes</Title>
          <Text type="secondary">Administra la cartera de clientes inmobiliarios</Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setCreateModalVisible(true)}
        >
          Nuevo Cliente
        </Button>
      </div>
      
      <ClientsTable 
        key={tableKey}
        onView={handleView}
        onEdit={handleEdit}
      />

      {/* Modal para crear cliente */}
      <Modal
        title="Crear Nuevo Cliente"
        open={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false);
          createForm.resetFields();
        }}
        onOk={() => createForm.submit()}
        width={700}
      >
        <Form
          form={createForm}
          layout="vertical"
          onFinish={handleCreate}
          initialValues={{ client_type: 'PERSONA' }}
        >
          <Form.Item
            name="client_type"
            label="Tipo de Cliente"
            rules={[{ required: true, message: 'Seleccione el tipo de cliente' }]}
          >
            <Select placeholder="Seleccione tipo">
              <Select.Option value="PERSONA">Persona Natural</Select.Option>
              <Select.Option value="EMPRESA">Empresa</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.client_type !== currentValues.client_type}
          >
            {({ getFieldValue }) => {
              const clientType = getFieldValue('client_type');
              
              if (clientType === 'PERSONA') {
                return (
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="first_name"
                        label="Nombre"
                        rules={[{ required: true, message: 'Ingrese el nombre' }]}
                      >
                        <Input placeholder="Juan" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="last_name"
                        label="Apellido"
                        rules={[{ required: true, message: 'Ingrese el apellido' }]}
                      >
                        <Input placeholder="Pérez" />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              } else {
                return (
                  <Form.Item
                    name="name"
                    label="Razón Social"
                    rules={[{ required: true, message: 'Ingrese la razón social' }]}
                  >
                    <Input placeholder="Empresa SpA" />
                  </Form.Item>
                );
              }
            }}
          </Form.Item>

          <Form.Item
            name="rut"
            label="RUT"
            rules={[{ required: true, message: 'Ingrese el RUT' }]}
          >
            <Input placeholder="12.345.678-9" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="email" label="Email">
                <Input type="email" placeholder="correo@ejemplo.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Teléfono">
                <Input placeholder="+56 9 1234 5678" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="address" label="Dirección">
            <Input placeholder="Calle 123" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="comuna" label="Comuna">
                <Input placeholder="Las Condes" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="region" label="Región">
                <Input placeholder="Región Metropolitana" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="billing_address" label="Dirección de Facturación">
            <Input placeholder="Si es diferente a la dirección principal" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
