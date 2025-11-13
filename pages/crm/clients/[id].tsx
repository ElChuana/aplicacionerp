import { useRouter } from 'next/router';
import { useState } from 'react';
import { Card, Descriptions, Tag, Tabs, Button, Space, Typography, Row, Col, Statistic, Timeline, Table, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { EditOutlined, PhoneOutlined, MailOutlined, HomeOutlined, PlusOutlined, FileTextOutlined, FileDoneOutlined, DollarOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ClientDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [contactForm] = Form.useForm();

  const { data: client, error, mutate } = useSWR(
    id ? `/api/crm/clients/${id}` : null,
    fetcher
  );

  const loading = !client && !error;

  const handleAddContact = async (values: any) => {
    try {
      const response = await fetch(`/api/crm/clients/${id}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Contacto registrado exitosamente');
        setContactModalVisible(false);
        contactForm.resetFields();
        mutate();
      } else {
        message.error('Error al registrar contacto');
      }
    } catch (error) {
      message.error('Error al registrar contacto');
    }
  };

  if (loading) return <div style={{ padding: '24px' }}>Cargando...</div>;
  if (error) return <div style={{ padding: '24px' }}>Error al cargar cliente</div>;
  if (!client) return <div style={{ padding: '24px' }}>Cliente no encontrado</div>;

  const getClientTypeLabel = (type: string) => {
    return type === 'PERSONA' ? 'Persona Natural' : 'Empresa';
  };

  const getQuotationStatusLabel = (status: string) => {
    const labels: Record<string, { text: string; color: string }> = {
      DRAFT: { text: 'Borrador', color: 'default' },
      SENT: { text: 'Enviada', color: 'blue' },
      ACCEPTED: { text: 'Aceptada', color: 'green' },
      REJECTED: { text: 'Rechazada', color: 'red' },
      EXPIRED: { text: 'Vencida', color: 'orange' },
    };
    return labels[status] || { text: status, color: 'default' };
  };

  const contactsColumns = [
    {
      title: 'Fecha',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 180,
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Contacto',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      width: 150,
      render: (role: string) => role || '-',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (email: string) => email || '-',
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      render: (phone: string) => phone || '-',
    },
    {
      title: 'Notas',
      dataIndex: 'notes',
      key: 'notes',
      ellipsis: true,
      render: (notes: string) => notes || '-',
    },
  ];

  const quotationsColumns = [
    {
      title: 'Número',
      dataIndex: 'number',
      key: 'number',
      width: 120,
    },
    {
      title: 'Proyecto',
      key: 'project',
      width: 200,
      render: (_: any, record: any) => record.projects?.name || '-',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        const { text, color } = getQuotationStatusLabel(status);
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: 150,
      align: 'right' as const,
      render: (total: number) => `$${total?.toLocaleString('es-CL') || 0}`,
    },
    {
      title: 'Fecha',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 120,
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 100,
      render: (_: any, record: any) => (
        <Button size="small" onClick={() => router.push(`/crm/quotations/${record.id}`)}>
          Ver
        </Button>
      ),
    },
  ];

  const promisesColumns = [
    {
      title: 'Número',
      dataIndex: 'promise_number',
      key: 'promise_number',
      width: 120,
    },
    {
      title: 'Proyecto',
      key: 'project',
      width: 200,
      render: (_: any, record: any) => record.projects?.name || '-',
    },
    {
      title: 'Fecha Promesa',
      dataIndex: 'promise_date',
      key: 'promise_date',
      width: 120,
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Pie',
      dataIndex: 'downpayment_amount',
      key: 'downpayment_amount',
      width: 150,
      align: 'right' as const,
      render: (amount: number) => `$${amount?.toLocaleString('es-CL') || 0}`,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: 150,
      align: 'right' as const,
      render: (total: number) => `$${total?.toLocaleString('es-CL') || 0}`,
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 100,
      render: (_: any, record: any) => (
        <Button size="small" onClick={() => router.push(`/crm/promises/${record.id}`)}>
          Ver
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Header */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <Space direction="vertical" size="small">
                <Space>
                  <Title level={2} style={{ margin: 0 }}>
                    {client.first_name && client.last_name 
                      ? `${client.first_name} ${client.last_name}` 
                      : client.name}
                  </Title>
                  <Tag color={client.client_type === 'PERSONA' ? 'blue' : 'purple'}>
                    {getClientTypeLabel(client.client_type)}
                  </Tag>
                </Space>
                <Text type="secondary">RUT: {client.rut || 'Sin RUT'}</Text>
              </Space>
            </div>
            <Button icon={<EditOutlined />} onClick={() => message.info('Editar cliente')}>
              Editar Cliente
            </Button>
          </div>

          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="Cotizaciones"
                value={client.quotations?.length || 0}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="Promesas"
                value={client.promises?.length || 0}
                prefix={<FileDoneOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="CxC"
                value={client.receivables?.length || 0}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="Contactos"
                value={client.contacts?.length || 0}
                prefix={<PhoneOutlined />}
              />
            </Col>
          </Row>
        </Card>

        {/* Información de Contacto */}
        <Card title="Información de Contacto">
          <Descriptions column={{ xs: 1, sm: 2, md: 3 }}>
            <Descriptions.Item label={<><MailOutlined /> Email</>}>
              {client.email || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={<><PhoneOutlined /> Teléfono</>}>
              {client.phone || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={<><HomeOutlined /> Dirección</>}>
              {client.address || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Comuna">
              {client.comuna || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Región">
              {client.region || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Dirección de Facturación" span={3}>
              {client.billing_address || '-'}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Tabs con detalles */}
        <Card>
          <Tabs
            defaultActiveKey="contacts"
            items={[
              {
                key: 'contacts',
                label: `Historial de Contactos (${client.contacts?.length || 0})`,
                children: (
                  <div>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setContactModalVisible(true)}
                      style={{ marginBottom: 16 }}
                    >
                      Registrar Contacto
                    </Button>
                    <Table
                      columns={contactsColumns}
                      dataSource={client.contacts || []}
                      rowKey="id"
                      pagination={{ pageSize: 10 }}
                      scroll={{ x: 1000 }}
                    />
                  </div>
                ),
              },
              {
                key: 'quotations',
                label: `Cotizaciones (${client.quotations?.length || 0})`,
                children: (
                  <Table
                    columns={quotationsColumns}
                    dataSource={client.quotations || []}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 1000 }}
                  />
                ),
              },
              {
                key: 'promises',
                label: `Promesas (${client.promises?.length || 0})`,
                children: (
                  <Table
                    columns={promisesColumns}
                    dataSource={client.promises || []}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 1000 }}
                  />
                ),
              },
              {
                key: 'timeline',
                label: 'Línea de Tiempo',
                children: (
                  <Timeline
                    items={[
                      ...(client.contacts?.map((contact: any) => ({
                        color: 'blue',
                        children: (
                          <div>
                            <Text strong>{dayjs(contact.created_at).format('DD/MM/YYYY HH:mm')}</Text>
                            <br />
                            <Text>Contacto con {contact.name}</Text>
                            {contact.notes && (
                              <>
                                <br />
                                <Text type="secondary">{contact.notes}</Text>
                              </>
                            )}
                          </div>
                        ),
                      })) || []),
                      ...(client.quotations?.map((quot: any) => ({
                        color: 'green',
                        children: (
                          <div>
                            <Text strong>{dayjs(quot.created_at).format('DD/MM/YYYY')}</Text>
                            <br />
                            <Text>Cotización #{quot.number} creada</Text>
                          </div>
                        ),
                      })) || []),
                      ...(client.promises?.map((prom: any) => ({
                        color: 'orange',
                        children: (
                          <div>
                            <Text strong>{dayjs(prom.promise_date).format('DD/MM/YYYY')}</Text>
                            <br />
                            <Text>Promesa #{prom.promise_number}</Text>
                          </div>
                        ),
                      })) || []),
                    ].sort((a: any, b: any) => {
                      const dateA = dayjs(a.children.props.children[0].props.children);
                      const dateB = dayjs(b.children.props.children[0].props.children);
                      return dateB.diff(dateA);
                    })}
                  />
                ),
              },
            ]}
          />
        </Card>
      </Space>

      {/* Modal para registrar contacto */}
      <Modal
        title="Registrar Contacto"
        open={contactModalVisible}
        onCancel={() => {
          setContactModalVisible(false);
          contactForm.resetFields();
        }}
        onOk={() => contactForm.submit()}
        width={600}
      >
        <Form
          form={contactForm}
          layout="vertical"
          onFinish={handleAddContact}
        >
          <Form.Item
            name="name"
            label="Nombre del Contacto"
            rules={[{ required: true, message: 'Ingrese el nombre del contacto' }]}
          >
            <Input placeholder="Ej: Juan Pérez" />
          </Form.Item>

          <Form.Item name="role" label="Rol/Cargo">
            <Input placeholder="Ej: Gerente General" />
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

          <Form.Item
            name="notes"
            label="Notas"
            rules={[{ required: true, message: 'Ingrese notas del contacto' }]}
          >
            <TextArea
              rows={4}
              placeholder="Describir el motivo del contacto, acuerdos, seguimientos, etc."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
