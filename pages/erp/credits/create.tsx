// File: pages/credits/create.tsx
import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import {
  Form,
  InputNumber,
  DatePicker,
  Select,
  Button,
  Spin,
  Typography,
  message,
  Space,
  Row,
  Col,
  Input,
} from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  });

export default function CreateCreditPage() {
  const router = useRouter();
  const { company } = router.query;
  const companyId = Array.isArray(company) ? Number(company[0]) : Number(company);

  const { data: projects, error: errProj } = useSWR(
    companyId ? `/api/erp/projects?company=${companyId}` : null,
    fetcher
  );
  const { data: providers, error: errProv } = useSWR(
    companyId ? `/api/erp/providers?company=${companyId}` : null,
    fetcher
  );
  const { data: types, error: errType } = useSWR(`/api/erp/obligation-types`, fetcher);

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const cs =
        values.capitalSchedule?.map((item: any) => ({
          period: item.period.format('YYYY-MM-DD'),
          percentage: item.percentage,
        })) ?? [];

      // 🔹 Aseguramos conversión correcta del monto (quita puntos y coma)
      const cleanAmount =
        typeof values.amount === 'string'
          ? parseFloat(values.amount.replace(/\./g, '').replace(',', '.'))
          : values.amount;

      const payload = {
        projectId: Number(values.projectId),
        providerId: Number(values.providerId),
        typeId: Number(values.typeId),
        amount: cleanAmount,
        currency: values.currency,
        interestRatePct: values.interestRatePct,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate?.format('YYYY-MM-DD') || null,
        amortizationScheme: values.amortizationScheme,
        interestFrequency: values.interestFrequency,
        interestType: values.interestType,
        capitalSchedule: cs,
      };

      const res = await fetch('/api/erp/credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Error al crear crédito');
      }

      message.success('Crédito creado correctamente');
      router.push(`/erp/credits?company=${companyId}`);
    } catch (err: any) {
      message.error(`Error: ${err.message}`);
    }
  };

  if (!companyId) return <Text type="warning">Parámetro &quot;company&quot; inválido</Text>;
  if (errProj || errProv || errType)
    return <Text type="danger">Error cargando datos iniciales</Text>;
  if (!projects || !providers || !types)
    return <Spin tip="Cargando datos..." style={{ marginTop: 100 }} />;

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <Title level={3}>Crear Crédito</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* PROYECTO / PROVEEDOR / TIPO */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Proyecto"
              name="projectId"
              rules={[{ required: true, message: 'Selecciona proyecto' }]}
            >
              <Select placeholder="Proyecto">
                {projects.map((p: any) => (
                  <Option key={p.id} value={p.id}>
                    {p.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Proveedor"
              name="providerId"
              rules={[{ required: true, message: 'Selecciona proveedor' }]}
            >
              <Select placeholder="Proveedor">
                {providers.map((p: any) => (
                  <Option key={p.id} value={p.id}>
                    {p.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Tipo Obligación"
              name="typeId"
              rules={[{ required: true, message: 'Selecciona tipo' }]}
            >
              <Select placeholder="Tipo">
                {types.map((t: any) => (
                  <Option key={t.id} value={t.id}>
                    {t.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* MONTO / MONEDA / ESQUEMA */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Monto Principal"
              name="amount"
              rules={[{ required: true, message: 'Ingresa monto' }]}
            >
              <InputNumber<number>
                min={0}
                step={1000}
                style={{ width: '100%' }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                }
                parser={(value) => Number((value ?? '').toString().replace(/\./g, ''))}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Moneda"
              name="currency"
              rules={[{ required: true, message: 'Selecciona moneda' }]}
            >
              <Select>
                <Option value="CLP">CLP</Option>
                <Option value="UF">UF</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Esquema Amortización" name="amortizationScheme">
              <Input placeholder="Ej. francés, alemán..." />
            </Form.Item>
          </Col>
        </Row>

        {/* FECHAS */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Fecha Inicio"
              name="startDate"
              rules={[{ required: true, message: 'Selecciona inicio' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Fecha Término" name="endDate">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        {/* INTERÉS */}
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              label="Tasa Interés (%)"
              name="interestRatePct"
              rules={[{ required: true, message: 'Ingresa tasa' }]}
            >
              <InputNumber<number>
                min={0}
                max={100}
                step={0.01}
                style={{ width: '100%' }}
                formatter={(v) => `${v}`.replace('.', ',')}
                parser={(v) => Number((v ?? '').toString().replace(',', '.'))}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Frecuencia Interés"
              name="interestFrequency"
              rules={[{ required: true, message: 'Selecciona frecuencia' }]}
            >
              <Select placeholder="Frecuencia">
                <Option value="mensual">Mensual</Option>
                <Option value="bimestral">Bimestral</Option>
                <Option value="trimestral">Trimestral</Option>
                <Option value="cuatrimestral">Cuatrimestral</Option>
                <Option value="semestral">Semestral</Option>
                <Option value="anual">Anual</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Tipo Interés"
              name="interestType"
              rules={[{ required: true, message: 'Selecciona tipo' }]}
            >
              <Select>
                <Option value="simple">Simple</Option>
                <Option value="compuesto">Compuesto</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* PLAN DE AMORTIZACIÓN */}
        <Form.List name="capitalSchedule">
          {(fields, { add, remove }) => (
            <>
              <Button type="dashed" onClick={() => add()} block style={{ marginBottom: 16 }}>
                + Agregar Cuota de Capital
              </Button>
              {fields.map((field) => (
                <Space key={field.key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                  <Form.Item
                    {...field}
                    label="Fecha Cuota"
                    name={[field.name, 'period']}
                    rules={[{ required: true, message: 'Fecha requerida' }]}
                  >
                    <DatePicker />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="% Capital"
                    name={[field.name, 'percentage']}
                    rules={[{ required: true, message: '% requerido' }]}
                  >
                    <InputNumber<number>
                      min={0}
                      max={100}
                      step={0.1}
                      formatter={(v) => `${v}%`}
                      parser={(v) => Number((v ?? '').toString().replace('%', ''))}
                    />
                  </Form.Item>
                  <Button type="link" danger onClick={() => remove(field.name)}>
                    Eliminar
                  </Button>
                </Space>
              ))}
            </>
          )}
        </Form.List>

        {/* BOTONES */}
        <Form.Item>
          <Space>
            <Button onClick={() => router.back()}>Cancelar</Button>
            <Button type="primary" htmlType="submit">
              Crear Crédito
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
