import React, { FC } from 'react';
import { Card, Descriptions, Tag, Button, message } from 'antd';
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { dte_documents } from '@prisma/client';

interface DteDetailProps {
  dte: dte_documents;
}

const DteDetail: FC<DteDetailProps> = ({ dte }) => {
  const formatAmount = (amount: any) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(Number(amount));
  };

  const dteTypeColor = {
    FACTURA: 'blue',
    BOLETA: 'green',
    NOTA_CREDITO: 'orange',
    NOTA_DEBITO: 'red'
  }[dte.type] || 'default';

  const downloadDocument = async (format: 'pdf' | 'xml') => {
    try {
      const response = await fetch(`/api/dte/${dte.id}/download?format=${format}`);
      
      if (!response.ok) {
        throw new Error('Error al descargar el documento');
      }

      // Obtener el blob del documento
      const blob = await response.blob();
      
      // Crear URL para descarga
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `DTE-${dte.type}-${dte.folio}.${format}`;
      document.body.appendChild(a);
      a.click();
      
      // Limpiar
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      message.error('Error al descargar el documento');
    }
  };

  return (
    <Card 
      title="Documento Tributario Electrónico (DTE)" 
      className="mb-4"
      extra={
        <div className="space-x-2">
          <Button 
            type="primary" 
            icon={<DownloadOutlined />} 
            onClick={() => downloadDocument('pdf')}
          >
            PDF
          </Button>
          <Button 
            icon={<FileTextOutlined />} 
            onClick={() => downloadDocument('xml')}
          >
            XML
          </Button>
        </div>
      }
    >
      <Descriptions bordered size="small">
        <Descriptions.Item label="Tipo" span={3}>
          <Tag color={dteTypeColor}>{dte.type}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Folio" span={3}>
          {dte.folio}
        </Descriptions.Item>
        <Descriptions.Item label="Emisor" span={3}>
          {dte.issuer_rut}
        </Descriptions.Item>
        <Descriptions.Item label="Receptor" span={3}>
          {dte.receiver_rut}
        </Descriptions.Item>
        <Descriptions.Item label="Fecha de Emisión" span={3}>
          {dayjs(dte.issue_date).format('DD/MM/YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Monto Neto">
          {formatAmount(dte.net_amount)}
        </Descriptions.Item>
        <Descriptions.Item label="IVA">
          {formatAmount(dte.tax_amount)}
        </Descriptions.Item>
        <Descriptions.Item label="Total">
          {formatAmount(dte.total_amount)}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default DteDetail;