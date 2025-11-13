// File: pages/obligations/[id].tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import { Spin, Typography, Button, Alert, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ProviderInfo } from '../../../components/ProviderInfo';
import { ObligationDetailCard } from '../../../components/ObligationDetail';
import { MovementsSelectorDrawer } from '../../../components/MovementsSelectorDrawer';
import { Table } from 'antd';
import { ObligationDocuments } from '../../../components/ObligationDocuments';



const { Title } = Typography;

interface AssociatedMovement {
  id: string;
  bank_date: string;
  accountName: string;
  description: string;
  matched_amount: number;
  currency: string;
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

  if (!shouldFetch) return <Alert message="ID o compañía inválida" type="warning" />;
  if (error) return <Alert message={`Error: ${error.message}`} type="error" />;
  if (!data) return <Spin tip="Cargando detalle..." style={{ margin: '100px auto', display: 'block' }} />;

  const { obligation, provider, movements } = data;

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
      render: (date: string) => new Date(date).toLocaleDateString('es-CL')
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
  ];

  const openDrawer = () => {
    setSelectedIds([]);
    setDrawerVisible(true);
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
        
        <Title level={3} style={{ marginBottom: 24 }}>
          Detalle Obligación #{id}
        </Title>
        
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
    </>
  );
}
