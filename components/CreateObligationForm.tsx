// File: components/CreateObligationForm.tsx
import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, DatePicker, Select, Button, message, Modal, Table } from 'antd';
import dayjs from 'dayjs';
import type { dte_documents } from '@prisma/client';

const { Option } = Select;

interface CreateObligationFormProps {
  onSubmit: any;
  companyId: number;
  initialValues?: {
    description?: string;
    amount?: number;
    currency?: string;
    startDate?: string;
  };
}

export const CreateObligationForm = ({ onSubmit, companyId, initialValues }: CreateObligationFormProps) => {
  const [form] = Form.useForm();

  // ---------- ESTADOS ----------
  const [providers, setProviders] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [costCenters, setCostCenters] = useState<any[]>([]);
  const [subAccounts, setSubAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<any>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [selectedProviderId, setSelectedProviderId] = useState<number | null>(null);
  const [availableDtes, setAvailableDtes] = useState<dte_documents[]>([]);
  const [suggestedCostCenterId, setSuggestedCostCenterId] = useState<number | null>(null);
  const [suggestedSubAccountId, setSuggestedSubAccountId] = useState<number | null>(null);
  const [userTouchedCostCenter, setUserTouchedCostCenter] = useState(false);
  const [userTouchedSubAccount, setUserTouchedSubAccount] = useState(false);

  // ---------- MODAL NUEVO TIPO ----------
  const [modalVisible, setModalVisible] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');
  const [newTypeDescription, setNewTypeDescription] = useState('');

  // ---------- MODAL NUEVO PROVEEDOR ----------
  const [providerModalVisible, setProviderModalVisible] = useState(false);
  const [newProviderName, setNewProviderName] = useState('');
  const [newProviderRut, setNewProviderRut] = useState('');
  const [newProviderEmail, setNewProviderEmail] = useState('');
  const [newProviderPhone, setNewProviderPhone] = useState('');

  // ---------- CARGA INICIAL ----------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [provRes, projRes, typeRes, ccRes] = await Promise.all([
          fetch(`/api/erp/providers?company=${companyId}`),
          fetch(`/api/erp/projects?company=${companyId}`),
          fetch(`/api/erp/obligation-types`),
          fetch(`/api/erp/cost-centers/simple`),
        ]);

        const [provData, projData, typeData, ccData] = await Promise.all([
          provRes.json(),
          projRes.json(),
          typeRes.json(),
          ccRes.json(),
        ]);

        setProviders(Array.isArray(provData) ? provData : []);
        setProjects(Array.isArray(projData) ? projData : []);
        setTypes(Array.isArray(typeData) ? typeData : []);
        setCostCenters(Array.isArray(ccData) ? ccData : []);
        
        // Aplicar valores iniciales si existen
        if (initialValues) {
          const formValues: any = {};
          if (initialValues.description) formValues.description = initialValues.description;
          if (initialValues.amount) formValues.amount = initialValues.amount;
          if (initialValues.currency) formValues.currency = initialValues.currency;
          if (initialValues.startDate) formValues.startDate = dayjs(initialValues.startDate);
          form.setFieldsValue(formValues);
        }
      } catch {
        message.error('Error al cargar datos iniciales');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [companyId, initialValues, form]);

  // ---------- CARGAR DTES ----------
  useEffect(() => {
    if (selectedProvider) {
      const fetchDtes = async () => {
        try {
          const response = await fetch(`/api/dte/list?unassigned=true&providerRut=${selectedProvider}`);
          if (!response.ok) throw new Error('Error fetching DTEs');
          const dtes = await response.json();
          setAvailableDtes(dtes);
        } catch {
          message.error('Error al cargar los DTEs disponibles');
        }
      };
      fetchDtes();
    }
  }, [selectedProvider]);

  // ---------- CARGAR PREFERENCIAS DE PROVEEDOR ----------
  useEffect(() => {
    if (selectedProviderId) {
      const fetchPreferences = async () => {
        try {
          const response = await fetch(`/api/erp/providers/${selectedProviderId}/preference`);
          if (response.ok) {
            const prefs = await response.json();
            if (prefs.cost_center_id) {
              setSuggestedCostCenterId(prefs.cost_center_id);
              // Solo autocompletar si el usuario no ha tocado el campo
              if (!userTouchedCostCenter) {
                form.setFieldsValue({ costCenterId: prefs.cost_center_id });
              }
              // Cargar subcuentas para ese centro de costo
              const subRes = await fetch(`/api/erp/sub-accounts?cost_center_id=${prefs.cost_center_id}`);
              const subData = await subRes.json();
              setSubAccounts(Array.isArray(subData) ? subData : []);
              
              if (prefs.sub_account_id) {
                setSuggestedSubAccountId(prefs.sub_account_id);
                if (!userTouchedSubAccount) {
                  form.setFieldsValue({ subAccountId: prefs.sub_account_id });
                }
              }
            }
          }
        } catch (error) {
          console.log('No se encontraron preferencias para este proveedor');
        }
      };
      fetchPreferences();
    }
  }, [selectedProviderId, form, userTouchedCostCenter, userTouchedSubAccount]);

  // ---------- CREAR NUEVO TIPO ----------
  const handleCreateType = async () => {
    if (!newTypeName.trim()) {
      message.warning('Debe ingresar un nombre');
      return;
    }

    try {
      const res = await fetch('/api/erp/obligation-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTypeName,
          description: newTypeDescription,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        message.error(err.message || 'Error al crear tipo');
        return;
      }

      const created = await res.json();
      message.success('Tipo de obligación creado');
      setModalVisible(false);
      setNewTypeName('');
      setNewTypeDescription('');

      const refreshed = await fetch('/api/erp/obligation-types').then((r) => r.json());
      setTypes(Array.isArray(refreshed) ? refreshed : []);

      setTimeout(() => {
        form.setFieldsValue({ typeId: created.id });
        form.validateFields(['typeId']).catch(() => {});
      }, 0);
    } catch {
      message.error('Error de red');
    }
  };

  // ---------- CREAR NUEVO PROVEEDOR ----------
  const handleCreateProvider = async () => {
    if (!newProviderName.trim() || !newProviderRut.trim()) {
      message.warning('Debe ingresar al menos nombre y RUT');
      return;
    }

    try {
      const res = await fetch('/api/erp/providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProviderName,
          rut: newProviderRut,
          contact_email: newProviderEmail || null,
          contact_phone: newProviderPhone || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        message.error(err.message || 'Error al crear proveedor');
        return;
      }

      const created = await res.json();
      message.success('Proveedor creado exitosamente');
      setProviderModalVisible(false);
      setNewProviderName('');
      setNewProviderRut('');
      setNewProviderEmail('');
      setNewProviderPhone('');

      const refreshed = await fetch(`/api/erp/providers?company=${companyId}`).then((r) => r.json());
      setProviders(Array.isArray(refreshed) ? refreshed : []);

      setTimeout(() => {
        form.setFieldsValue({ providerId: created.id });
        setSelectedProvider(created.rut);
        form.validateFields(['providerId']).catch(() => {});
      }, 0);
    } catch {
      message.error('Error de red');
    }
  };

  // ---------- FORMATEAR RUT ----------
  const formatRut = (value: string) => {
    // Remover caracteres no numéricos excepto 'k' o 'K'
    const cleaned = value.replace(/[^0-9kK]/g, '');
    
    if (cleaned.length === 0) return '';
    
    // Separar cuerpo y dígito verificador
    const body = cleaned.slice(0, -1);
    const dv = cleaned.slice(-1).toUpperCase();
    
    if (body.length === 0) return dv;
    
    // Formatear cuerpo con puntos
    const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return `${formattedBody}-${dv}`;
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatRut(rawValue);
    setNewProviderRut(formatted);
  };

  // ---------- SUBMIT ----------
  const handleDteSelect = (dte: dte_documents) => {
    form.setFieldsValue({
      amount: Number(dte.total_amount),
      currency: 'CLP',
      startDate: dayjs(dte.issue_date),
      selectedDteId: dte.id
    });
  };

  const handleFinish = async (vals: any) => {
    try {
      // Crear la obligación
      const obligation = await onSubmit(vals);

      // Si hay un DTE seleccionado, vincularlo
      if (vals.selectedDteId) {
        const linkResponse = await fetch('/api/dte/link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dteId: vals.selectedDteId,
            obligationId: obligation.id
          })
        });

        if (!linkResponse.ok) {
          throw new Error('Error linking DTE');
        }

        message.success('DTE vinculado exitosamente');
      }

    } catch (error) {
      message.error('Error al procesar la obligación');
      throw error;
    }
  };

  const handleFinishFailed = ({ errorFields }: any) => {
    if (errorFields?.length) {
      const first = errorFields[0];
      const msg =
        (first?.errors && first.errors[0]) ||
        'Complete los campos obligatorios';
      message.error(msg);
      form.scrollToField(first.name);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        initialValues={{
          startDate: dayjs(),
          currency: 'CLP',
          amount: 0,
          recurrence: 'ninguna',
        }}
      >
        {/* PROVEEDOR */}
        <Form.Item
          label="Proveedor"
          name="providerId"
          rules={[{ required: true, message: 'Seleccione un proveedor' }]}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <Select
              placeholder="Proveedor existente"
              style={{ flex: 1 }}
              optionFilterProp="children"
              showSearch
              onChange={(val) => {
                const provider = providers.find(p => p.id === val);
                setSelectedProvider(provider?.rut || '');
                setSelectedProviderId(val);
                form.setFieldsValue({ providerId: val });
                if (selectedType?.requires_dte && provider?.rut) {
                  // Cargar DTEs disponibles para el nuevo proveedor
                  fetch(`/api/dte/list?unassigned=true&providerRut=${provider.rut}`)
                    .then(res => res.json())
                    .then(dtes => setAvailableDtes(dtes))
                    .catch(() => message.error('Error al cargar DTEs'));
                }
              }}
            >
              {providers.map((p) => (
                <Option key={p.id} value={p.id}>
                  {p.name}
                </Option>
              ))}
            </Select>
            <Button onClick={() => setProviderModalVisible(true)}>+ Nuevo</Button>
          </div>
        </Form.Item>

        {/* PROYECTO */}
        <Form.Item
          label="Proyecto"
          name="projectId"
          rules={[{ required: true, message: 'Seleccione un proyecto' }]}
        >
          <Select
            placeholder="Seleccionar proyecto"
            optionFilterProp="children"
            showSearch
            onChange={(val) => form.setFieldsValue({ projectId: val })}
          >
            {projects.map((pr) => (
              <Option key={pr.id} value={pr.id}>
                {pr.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* TIPO DE OBLIGACIÓN */}
        <Form.Item
          label="Tipo de Obligación"
          name="typeId"
          rules={[{ required: true, message: 'Seleccione un tipo de obligación' }]}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <Select
              placeholder="Seleccionar tipo"
              style={{ flex: 1 }}
              optionFilterProp="children"
              showSearch
              onChange={(val) => {
                const type = types.find(t => t.id === val);
                setSelectedType(type);
                form.setFieldsValue({ typeId: val });
                if (type?.requires_dte && selectedProvider) {
                  // Recargar DTEs disponibles
                  fetch(`/api/dte/list?unassigned=true&providerRut=${selectedProvider}`)
                    .then(res => res.json())
                    .then(dtes => setAvailableDtes(dtes))
                    .catch(() => message.error('Error al cargar DTEs'));
                }
              }}
            >
              {types.map((t) => (
                <Option key={t.id} value={t.id}>
                  {t.name}
                </Option>
              ))}
            </Select>
            <Button type="primary" onClick={() => setModalVisible(true)}>
              + Nuevo
            </Button>
          </div>
        </Form.Item>

        {/* TABLA DE DTES */}
        {selectedType?.requires_dte && availableDtes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">DTEs Disponibles</h3>
            <Table
              dataSource={availableDtes}
              columns={[
                {
                  title: 'Folio',
                  dataIndex: 'folio',
                  key: 'folio',
                },
                {
                  title: 'Tipo',
                  dataIndex: 'type',
                  key: 'type',
                },
                {
                  title: 'Fecha Emisión',
                  dataIndex: 'issue_date',
                  key: 'issue_date',
                  render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
                },
                {
                  title: 'Monto Total',
                  dataIndex: 'total_amount',
                  key: 'amount',
                  render: (amount: number) => new Intl.NumberFormat('es-CL', {
                    style: 'currency',
                    currency: 'CLP'
                  }).format(amount),
                },
                {
                  title: 'Acciones',
                  key: 'actions',
                  render: (_: any, record: dte_documents) => (
                    <Button onClick={() => handleDteSelect(record)}>Seleccionar</Button>
                  ),
                },
              ]}
              rowKey="id"
              pagination={false}
              scroll={{ x: true }}
              size="small"
              className="w-full"
            />
          </div>
        )}

        {/* DESCRIPCIÓN */}
        <Form.Item label="Descripción" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* MONTO */}
        <Form.Item
          label="Monto"
          name="amount"
          rules={[{ required: true, message: 'Ingrese un monto' }]}
        >
          <InputNumber<number>
            style={{ width: '100%' }}
            min={0}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            parser={value => Number(value?.replace(/\$\s?|(\.)/g, '') || '0') as 0}
            controls={false}
            className="w-full"
          />
        </Form.Item>

        {/* MONEDA */}
        <Form.Item
          label="Moneda"
          name="currency"
          rules={[{ required: true, message: 'Seleccione una moneda' }]}
        >
          <Select>
            <Option value="CLP">CLP</Option>
            <Option value="USD">USD</Option>
            <Option value="UF">UF</Option>
          </Select>
        </Form.Item>

        {/* FECHAS */}
        <Form.Item
          label="Fecha de Inicio"
          name="startDate"
          rules={[{ required: true, message: 'Seleccione la fecha de inicio' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Fecha de Vencimiento" name="dueDate">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        {/* CENTRO DE COSTO */}
        <Form.Item
          label={
            <span>
              Centro de Costo {suggestedCostCenterId && form.getFieldValue('costCenterId') === suggestedCostCenterId && (
                <span style={{ marginLeft: 8 }}><span style={{ background:'#e6f4ff', color:'#0958d9', padding:'2px 6px', borderRadius:4, fontSize:12 }}>Sugerido</span></span>
              )}
            </span>
          }
          name="costCenterId"
          rules={[{ required: true, message: 'Seleccione un centro de costo' }]}
        >
          <Select
            placeholder="Seleccionar centro de costo"
            optionFilterProp="children"
            showSearch
            onChange={async (val) => {
              setUserTouchedCostCenter(true);
              form.setFieldsValue({ costCenterId: val, subAccountId: undefined });
              setSubAccounts([]);
              if (val) {
                try {
                  const res = await fetch(`/api/erp/sub-accounts?cost_center_id=${val}`);
                  const data = await res.json();
                  setSubAccounts(Array.isArray(data) ? data : []);
                } catch {
                  message.error('Error al cargar subcuentas');
                }
              }
            }}
          >
            {costCenters.map((cc) => (
              <Option key={cc.id} value={cc.id}>
                {cc.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* SUBCUENTA */}
        <Form.Item
          label={
            <span>
              Subcuenta {suggestedSubAccountId && form.getFieldValue('subAccountId') === suggestedSubAccountId && (
                <span style={{ marginLeft: 8 }}><span style={{ background:'#e6f4ff', color:'#0958d9', padding:'2px 6px', borderRadius:4, fontSize:12 }}>Sugerido</span></span>
              )}
            </span>
          }
          name="subAccountId"
          rules={[{ required: true, message: 'Seleccione una subcuenta' }]}
        >
          <Select
            placeholder="Seleccionar subcuenta"
            optionFilterProp="children"
            showSearch
            disabled={subAccounts.length === 0}
            onChange={() => setUserTouchedSubAccount(true)}
          >
            {subAccounts.map((sub) => (
              <Option key={sub.id} value={sub.id}>
                {sub.code} - {sub.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* RECURRENCIA */}
        <Form.Item
          label="Recurrencia"
          name="recurrence"
        >
          <Select>
            <Option value="ninguna">Ninguna</Option>
            <Option value="semanal">Semanal</Option>
            <Option value="mensual">Mensual</Option>
            <Option value="anual">Anual</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Fin de Recurrencia" name="recurrenceEnd">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        {/* DTE SELECCIONADO */}
        <Form.Item name="selectedDteId" hidden>
          <Input />
        </Form.Item>

        {/* BOTÓN FINAL */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Crear Obligación
          </Button>
        </Form.Item>
      </Form>

      {/* MODAL NUEVO TIPO */}
      <Modal
        title="Nuevo tipo de obligación"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleCreateType}
        okText="Crear"
        cancelText="Cancelar"
      >
        <Input
          placeholder="Nombre del tipo"
          value={newTypeName}
          onChange={(e) => setNewTypeName(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <Input.TextArea
          placeholder="Descripción (opcional)"
          value={newTypeDescription}
          onChange={(e) => setNewTypeDescription(e.target.value)}
          rows={3}
        />
      </Modal>

      {/* MODAL NUEVO PROVEEDOR */}
      <Modal
        title="Nuevo proveedor"
        open={providerModalVisible}
        onCancel={() => setProviderModalVisible(false)}
        onOk={handleCreateProvider}
        okText="Crear"
        cancelText="Cancelar"
      >
        <Input
          placeholder="Nombre del proveedor *"
          value={newProviderName}
          onChange={(e) => setNewProviderName(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <Input
          placeholder="RUT (ej: 12.345.678-9) *"
          value={newProviderRut}
          onChange={handleRutChange}
          maxLength={12}
          style={{ marginBottom: 12 }}
        />
        <Input
          placeholder="Email (opcional)"
          value={newProviderEmail}
          onChange={(e) => setNewProviderEmail(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <Input
          placeholder="Teléfono (opcional)"
          value={newProviderPhone}
          onChange={(e) => setNewProviderPhone(e.target.value)}
        />
      </Modal>
    </>
  );
};
