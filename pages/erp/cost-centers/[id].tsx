// File: pages/erp/cost-centers/[id].tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Spin, Typography, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CostCenterDetail } from '../../../components/CostCenterDetail';
import { SubAccountForm } from '../../../components/SubAccountForm';

export default function CostCenterPage() {
  const router = useRouter();
  const { id, company } = router.query;
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Esperar a que el router esté listo
  if (!router.isReady) {
    return <Spin tip="Cargando centro de costo..." style={{ marginTop: 50, textAlign: 'center' }} />;
  }

  const centerId = Array.isArray(id) ? id[0] : id;
  const companyId = Array.isArray(company) ? company[0] : company;

  // Validar ID
  const numericId = Number(centerId);
  if (isNaN(numericId)) {
    return <Typography.Text type="danger">ID de centro inválido</Typography.Text>;
  }

  const handleSuccess = () => {
    setShowModal(false);
    setRefreshKey(prev => prev + 1); // Forzar recarga del detalle
  };

  return (
    <div style={{ padding: '24px 32px' }}>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Button onClick={() => router.back()}>
            Volver a Centros
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowModal(true)}>
            Nueva Subcuenta
          </Button>
        </div>
        <Typography.Title level={3}>Detalle Centro de Costo #{numericId}</Typography.Title>
        <CostCenterDetail key={refreshKey} id={numericId} company={companyId as string} showTotals />
        
        <Modal
          title="Crear Nueva Subcuenta"
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={null}
          width={500}
        >
          <SubAccountForm 
            costCenterId={numericId} 
            companyId={companyId as string}
            onSuccess={handleSuccess}
          />
        </Modal>
      </div>
    </div>
  );
}
