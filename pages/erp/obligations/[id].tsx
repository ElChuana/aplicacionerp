// File: pages/obligations/[id].tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import { Spin, Typography, Button, Alert, message, Modal, Form, Input, DatePicker, Select, InputNumber, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ProviderInfo } from '../../../components/ProviderInfo';
import { ObligationDetailCard } from '../../../components/ObligationDetail';
import { MovementsSelectorDrawer } from '../../../components/MovementsSelectorDrawer';
import { Table } from 'antd';
import { ObligationDocuments } from '../../../components/ObligationDocuments';
import dayjs from 'dayjs';



const { Title } = Typography;

interface AssociatedMovement {
  id: string;
  bank_date: string;
  accountName: string;
  description: string;
  matched_amount: number;
  currency: string;
}

interface CreditNote {
  id: number;
  amount: number;
  description: string;
  date: string;
  created_at: string;
}

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  });

export default function ObligationPage() {
  const router = useRouter();
  const { id, company } = router.query;
  const comp = Array.isArray(company) ? company[0] : company;
  const companyId = comp ? Number(comp) : NaN;
  const shouldFetch = typeof id === 'string' && !isNaN(companyId);

  // Hooks SIEMPRE deben ejecutarse antes de cualquier return condicional.
  const { data, error } = useSWR(
    shouldFetch ? `/api/erp/obligations/${id}` : null,
    fetcher
  );
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { data: allMoves, error: errAll } = useSWR(
    drawerVisible && shouldFetch
      ? `/api/erp/bank-movements/recommendations?obligationId=${id}`
      : null,
    fetcher
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [form] = Form.useForm();
  const [costCenters, setCostCenters] = useState<any[]>([]);
  const [subAccounts, setSubAccounts] = useState<any[]>([]);
  const [loadingSubAccounts, setLoadingSubAccounts] = useState(false);

  // Efecto para cargar centros de costo: debe ejecutarse aunque aún no haya data
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/erp/cost-centers/simple');
        const json = await res.json();
        if (Array.isArray(json)) setCostCenters(json);
      } catch (e) {
        console.error('Error cargando centros de costo', e);
      }
    })();
  }, []);

  // Returns condicionales DESPUÉS de todos los hooks
  if (!shouldFetch) return <Alert message="ID o compañía inválida" type="warning" />;
  if (error) return <Alert message={`Error: ${error.message}`} type="error" />;
  if (!data) return <Spin tip="Cargando detalle..." style={{ margin: '100px auto', display: 'block' }} />;

  const { obligation, provider, movements, creditNotes } = data;

  // Validar que existan los datos
  if (!obligation) {
    return <Alert message="Obligación no encontrada" type="error" />;
  }

  // Columns for associated movements
  const assocColumns: ColumnsType<AssociatedMovement> = [
    { 
      title: 'Fecha', 
      dataIndex: 'bank_date', 
      key: 'bank_date',
      width: 120,
      render: (date: string) => dayjs(date).format('DD/MM/YYYY')
    },
    { 
      title: 'Cuenta', 
      dataIndex: 'accountName', 
      key: 'accountName',
      width: 200,
      ellipsis: true
    },
    { 
      title: 'Descripción', 
      dataIndex: 'description', 
      key: 'description',
      ellipsis: true,
      render: d => d || '-' 
    },
    {
      title: 'Monto Asociado',
      dataIndex: 'matched_amount',
      key: 'matched_amount',
      width: 150,
      align: 'right',
      render: v => v != null ? `$${Number(v).toLocaleString('es-CL')}` : '-',
    },
    { 
      title: 'Moneda', 
      dataIndex: 'currency', 
      key: 'currency', 
      width: 80,
      align: 'center', 
      render: c => c || '-' 
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 120,
      render: (_: any, rec) => (
        <Space>
          <Button danger size="small" onClick={() => unassignOne(rec.id)}>Quitar</Button>
        </Space>
      )
    }
  ];

  const openDrawer = () => {
    setSelectedIds([]);
    setDrawerVisible(true);
  };

  const openEdit = () => {
    setEditOpen(true);
    form.setFieldsValue({
      description: obligation.description || '',
      amount_original: obligation.amount_original,
      currency: obligation.currency,
      start_date: obligation.start_date ? dayjs(obligation.start_date) : null,
      due_date: obligation.due_date ? dayjs(obligation.due_date) : null,
      status: obligation.status,
      cost_center_id: obligation.cost_center_id || undefined,
      sub_account_id: obligation.sub_account_id || undefined,
    });
    if (obligation.cost_center_id) {
      fetchSubAccounts(obligation.cost_center_id);
    }
  };

  // (El useEffect que cargaba centros de costo se movió arriba para respetar reglas de hooks)

  const fetchSubAccounts = async (ccId: number) => {
    setLoadingSubAccounts(true);
    try {
      const res = await fetch(`/api/erp/sub-accounts?cost_center_id=${ccId}`);
      const data = await res.json();
      setSubAccounts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Error cargando subcuentas', e);
      setSubAccounts([]);
    } finally {
      setLoadingSubAccounts(false);
    }
  };

  const handleSave = async () => {
    try {
      const vals = await form.validateFields();
      const payload = {
        description: vals.description,
        amount_original: Number(vals.amount_original),
        currency: vals.currency,
        start_date: vals.start_date ? vals.start_date.format('YYYY-MM-DD') : undefined,
        due_date: vals.due_date ? vals.due_date.format('YYYY-MM-DD') : null,
        status: vals.status,
        cost_center_id: vals.cost_center_id ?? null,
        sub_account_id: vals.sub_account_id ?? null,
      };
      const resp = await fetch(`/api/erp/obligations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error(await resp.text());
      message.success('Obligación actualizada');
      setEditOpen(false);
      mutate(`/api/erp/obligations/${id}`);
    } catch (e: any) {
      if (e?.errorFields) return; // errores de formulario
      message.error(e.message || 'Error al actualizar');
    }
  };

  const unassignOne = async (movementId: string) => {
    try {
      const resp = await fetch(`/api/erp/obligations/${id}/associate`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movementIds: [movementId] }),
      });
      if (!resp.ok) throw new Error(await resp.text());
      message.success('Movimiento desasociado');
      mutate(`/api/erp/obligations/${id}`);
    } catch (e: any) {
      message.error(e.message || 'Error al desasociar');
    }
  };

  const handleAssociate = async (ids: string[]) => {
    if (!ids.length) {
      message.warning('Selecciona al menos un movimiento');
      return;
    }
    try {
      const res = await fetch(`/api/erp/obligations/${id}/associate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movementIds: ids }),
      });
      if (!res.ok) throw new Error(await res.text());
      message.success('Movimientos asociados');
      mutate(`/api/erp/obligations/${id}`);
      setDrawerVisible(false);
    } catch (e: any) {
      message.error(`Error: ${e.message}`);
    }
  };

  return (
    <>
      <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
        <Button onClick={() => router.back()} style={{ marginBottom: 16 }}>
          ← Volver
        </Button>
        
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <Title level={3} style={{ margin: 0 }}>Detalle Obligación #{id}</Title>
          <Button type="primary" onClick={openEdit}>Editar</Button>
        </div>
        
        {provider && <ProviderInfo provider={provider} />}
        
        <ObligationDetailCard obligation={obligation} />
        
        <div style={{ marginTop: 24, marginBottom: 16 }}>
          <Title level={4}>Documentos</Title>
          <ObligationDocuments obligationId={Number(id)} companyId={companyId} />
        </div>
        
        <div style={{ marginTop: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Title level={4} style={{ margin: 0 }}>Movimientos Bancarios Asociados</Title>
            <Button type="primary" onClick={openDrawer}>
              + Asociar Movimientos
            </Button>
          </div>
          
          <Table<AssociatedMovement>
            columns={assocColumns}
            dataSource={movements || []}
            rowKey="id"
            size="small"
            pagination={{ pageSize: 10, showTotal: (total) => `Total: ${total} movimientos` }}
            scroll={{ x: 'max-content' }}
            locale={{ emptyText: 'No hay movimientos asociados' }}
          />
        </div>

        <div style={{ marginTop: 32 }}>
          <Title level={4}>Notas de Crédito</Title>
          <Table<CreditNote>
            columns={[
              { 
                title: 'Fecha', 
                dataIndex: 'date', 
                key: 'date',
                width: 120,
                render: (date: string) => dayjs(date).format('DD/MM/YYYY')
              },
              { 
                title: 'Descripción', 
                dataIndex: 'description', 
                key: 'description',
                ellipsis: true,
                render: d => d || '-' 
              },
              {
                title: 'Monto',
                dataIndex: 'amount',
                key: 'amount',
                width: 150,
                align: 'right',
                render: (v: number) => `$${Number(v).toLocaleString('es-CL')}`,
              },
            ]}
            dataSource={creditNotes || []}
            rowKey="id"
            size="small"
            pagination={false}
            scroll={{ x: 'max-content' }}
            locale={{ emptyText: 'No hay notas de crédito asociadas' }}
          />
        </div>
      </div>
      
      <MovementsSelectorDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        data={allMoves || []}
        loading={drawerVisible && !allMoves && !errAll}
        balance={obligation.balance}
        selectedKeys={selectedIds}
        onSelectionChange={(keys) => setSelectedIds(keys.map(String))}
        onConfirm={handleAssociate}
      />

      <Modal
        title="Editar obligación"
        open={editOpen}
        onCancel={() => setEditOpen(false)}
        onOk={handleSave}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="description" label="Descripción">
            <Input placeholder="Descripción" />
          </Form.Item>
          <Form.Item name="amount_original" label="Monto" rules={[{ required: true, message: 'Ingrese monto' }]}> 
            <InputNumber<number>
              style={{ width: '100%' }}
              min={0}
              step={1000}
              formatter={(v) => (v != null ? String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '')}
              parser={(v) => Number((v || '0').replace(/\./g, ''))}
            />
          </Form.Item>
          <Form.Item name="currency" label="Moneda" rules={[{ required: true }]}> 
            <Select options={[{label:'CLP', value:'CLP'},{label:'UF', value:'UF'},{label:'USD', value:'USD'}]} />
          </Form.Item>
          <Form.Item name="status" label="Estado" rules={[{ required: true }]}> 
            <Select options={[{label:'pendiente', value:'pendiente'},{label:'pagada', value:'pagada'},{label:'vencida', value:'vencida'}]} />
          </Form.Item>
          <Form.Item name="start_date" label="Fecha inicio">
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item name="due_date" label="Fecha vencimiento">
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item name="cost_center_id" label="Centro de Costo" rules={[{ required: true, message: 'Seleccione centro de costo' }]}> 
            <Select
              placeholder="Centro de Costo"
              showSearch
              optionFilterProp="children"
              onChange={(val:number) => {
                form.setFieldsValue({ cost_center_id: val, sub_account_id: undefined });
                fetchSubAccounts(val);
              }}
              value={form.getFieldValue('cost_center_id')}
            >
              {costCenters.map(cc => <Select.Option key={cc.id} value={cc.id}>{cc.name}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="sub_account_id" label="Subcuenta" rules={[{ required: true, message: 'Seleccione subcuenta' }]}> 
            <Select
              placeholder={loadingSubAccounts ? 'Cargando...' : 'Subcuenta'}
              disabled={!form.getFieldValue('cost_center_id') || loadingSubAccounts}
              showSearch
              optionFilterProp="children"
              value={form.getFieldValue('sub_account_id')}
            >
              {subAccounts.map(sa => <Select.Option key={sa.id} value={sa.id}>{sa.code} - {sa.name}</Select.Option>)}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
