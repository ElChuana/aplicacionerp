// File: components/SubAccountForm.tsx
import React, { useState } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import useSWR from 'swr';

interface SubAccountFormProps {
  costCenterId?: number;
  companyId: string;
  onSuccess?: () => void;
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

export const SubAccountForm: React.FC<SubAccountFormProps> = ({ costCenterId, companyId, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Obtener lista de centros de costo
  const { data: costCenters } = useSWR<any[]>(
    `/api/erp/cost-centers?company=${companyId}`,
    fetcher
  );

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch('/api/erp/sub-accounts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cost_center_id: values.cost_center_id,
          name: values.name
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al crear subcuenta');
      }

      notification.success({
        message: 'Subcuenta creada',
        description: 'La subcuenta se ha creado exitosamente'
      });

      form.resetFields();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error.message || 'Error al crear subcuenta'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ cost_center_id: costCenterId }}
    >
      <Form.Item
        label="Centro de Costo"
        name="cost_center_id"
        rules={[{ required: true, message: 'Seleccione un centro de costo' }]}
      >
        <Select
          placeholder="Seleccione un centro de costo"
          disabled={!!costCenterId}
          loading={!costCenters}
        >
          {costCenters?.map(cc => (
            <Select.Option key={cc.id} value={cc.id}>
              {cc.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Nombre"
        name="name"
        rules={[
          { required: true, message: 'Ingrese el nombre de la subcuenta' },
          { max: 100, message: 'El nombre no puede superar 100 caracteres' }
        ]}
      >
        <Input placeholder="Ej: Gastos generales, Sueldos, etc." />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Crear Subcuenta
        </Button>
      </Form.Item>
    </Form>
  );
};
