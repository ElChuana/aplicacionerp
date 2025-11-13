// pages/obligations/create.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { message, Typography, Spin } from 'antd';

const { Title } = Typography;

const CreateObligationForm = dynamic(
  () =>
    import('../../../components/CreateObligationForm').then((mod) => mod.CreateObligationForm),
  {
    ssr: false,
    loading: () => (
      <div style={{ textAlign: 'center', margin: '100px 0' }}>
        <Spin tip="Cargando formulario…" />
      </div>
    ),
  }
);

const CreateObligationPage: React.FC = () => {
  const router = useRouter();

  // Esperar a que Next.js cargue el query
  const companyParam = Array.isArray(router.query.company)
    ? router.query.company[0]
    : router.query.company;

  // fallback: si no hay query aún, no renderizar nada hasta tenerlo
  if (!companyParam) {
    return (
      <div style={{ textAlign: 'center', margin: '100px 0' }}>
        <Spin tip="Cargando empresa…" />
      </div>
    );
  }

  const companyId = Number(companyParam);
  if (isNaN(companyId)) {
    message.error('ID de empresa inválido');
    return null;
  }

  const handleSubmit = async (vals: any) => {
    const payload = {
      project_id: Number(vals.projectId),
      type_id: Number(vals.typeId),
      provider_id: Number(vals.providerId),
      description: vals.description,
      amount_original: Number(vals.amount),
      currency: vals.currency,
      start_date: vals.startDate?.format('YYYY-MM-DD'),
      due_date: vals.dueDate?.format('YYYY-MM-DD') ?? undefined,
      recurrence: vals.recurrence || 'ninguna',
      recurrence_end: vals.recurrenceEnd?.format('YYYY-MM-DD') ?? null,
    };

    console.log('Payload que se envía:', payload);

    try {
      const res = await fetch('/api/erp/obligations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, company: companyId }),
      });

      const data = await res.json();
      
      if (res.ok) {
        const count = data.length;
        const recurrenceType = vals.recurrence || 'ninguna';
        
        if (recurrenceType === 'ninguna') {
          message.success('Obligación creada exitosamente');
        } else {
          message.success(`Se crearon ${count} obligaciones recurrentes (${recurrenceType})`);
        }
        
        router.push(`/erp/obligations?company=${companyId}`);
        return data[0]; // Retornar la primera obligación creada para el flujo de DTEs
      } else {
        message.error(data.message || 'Error al crear obligaciones');
        throw new Error(data.message || 'Error al crear obligaciones');
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      message.error(err.message || 'Error de red');
      throw err;
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <Title level={3}>Crear Obligación</Title>
      <CreateObligationForm onSubmit={handleSubmit} companyId={companyId} />
    </div>
  );
};

export default CreateObligationPage;
