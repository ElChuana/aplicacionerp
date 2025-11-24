import React, { useState } from 'react';
import { Typography, Button, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { LeadsKanban, LEAD_STATUSES } from '../../components/LeadsKanban';

const { Title, Text } = Typography;

export default function LeadsPage() {
  const [companyId] = useState<number | null>(null); // Ajustar si se maneja company en query
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleCreate = async () => {
    try {
      const vals = await form.validateFields();
      const res = await fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: vals.name,
          email: vals.email,
          phone: vals.phone,
          source: vals.source,
          status: vals.status,
          notes: vals.notes,
          budgetCLP: vals.budgetCLP,
          budgetUF: vals.budgetUF,
          companyId: companyId
        })
      });
      if (!res.ok) throw new Error(await res.text());
      message.success('Lead creado');
      form.resetFields();
      setOpen(false);
    } catch (e: any) {
      message.error(e.message || 'Error al crear lead');
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <Title level={3}>Leads CRM</Title>
      <Text type="secondary">Arrastra los leads entre columnas para actualizar su status.</Text>
      <div style={{ marginTop: 16, marginBottom: 16 }}>
        <Button type="primary" onClick={() => setOpen(true)}>+ Nuevo Lead</Button>
      </div>
      <LeadsKanban companyId={companyId} />
      <Modal open={open} onCancel={() => setOpen(false)} onOk={handleCreate} title="Crear Lead">
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Requerido' }]}> <Input /> </Form.Item>
          <Form.Item name="email" label="Email"> <Input type="email" /> </Form.Item>
          <Form.Item name="phone" label="Teléfono"> <Input /> </Form.Item>
          <Form.Item name="source" label="Fuente"> <Input placeholder="Ej: Facebook, Referido" /> </Form.Item>
          <Form.Item name="status" label="Status" initialValue="INGRESADO"> <Select options={LEAD_STATUSES.map(s => ({ value: s, label: s }))} /> </Form.Item>
          <Form.Item name="budgetCLP" label="Presupuesto CLP"> <InputNumber style={{ width: '100%' }} formatter={v => v ? v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''} parser={v => Number(v?.replace(/\./g,'')||'0')} /> </Form.Item>
          <Form.Item name="budgetUF" label="Presupuesto UF"> <InputNumber style={{ width: '100%' }} step={0.01} /> </Form.Item>
          <Form.Item name="notes" label="Notas"> <Input.TextArea rows={3} /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
