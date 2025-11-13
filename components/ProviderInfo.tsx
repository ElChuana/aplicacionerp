import React from 'react';
import { Card, Descriptions } from 'antd';

export interface Provider {
  id: number;
  name: string;
  rut?: string;
  address?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
}

export const ProviderInfo: React.FC<{ provider: Provider }> = ({ provider }) => (
  <Card title="Información del Proveedor" style={{ marginBottom: 24 }}>
    <Descriptions column={2} bordered>
      <Descriptions.Item label="Nombre" span={2}>
        <strong>{provider.name}</strong>
      </Descriptions.Item>
      {provider.rut && (
        <Descriptions.Item label="RUT" span={2}>{provider.rut}</Descriptions.Item>
      )}
      {provider.address && (
        <Descriptions.Item label="Dirección" span={2}>{provider.address}</Descriptions.Item>
      )}
      {provider.contact_name && (
        <Descriptions.Item label="Contacto">{provider.contact_name}</Descriptions.Item>
      )}
      {provider.contact_email && (
        <Descriptions.Item label="Email">
          <a href={`mailto:${provider.contact_email}`}>{provider.contact_email}</a>
        </Descriptions.Item>
      )}
      {provider.contact_phone && (
        <Descriptions.Item label="Teléfono">
          <a href={`tel:${provider.contact_phone}`}>{provider.contact_phone}</a>
        </Descriptions.Item>
      )}
    </Descriptions>
  </Card>
);
