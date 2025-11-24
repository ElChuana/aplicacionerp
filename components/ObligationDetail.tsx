import React from 'react';
import { Card, Descriptions } from 'antd';
import DteDetail from './DteDetail';
import type { dte_documents } from '@prisma/client';

export interface ObligationDetail {
  id: number;
  project_name: string;
  type_name: string;
  description?: string;
  amount_original: number;
  currency: string;
  start_date: string;
  due_date: string | null;
  paid_amount: number;
  credit_notes_total?: number;
  balance: number;
  status: 'pagada' | 'pendiente' | 'vencida';
  cost_center_name?: string | null;
  sub_account_name?: string | null;
  dte?: dte_documents | null;
}

export const ObligationDetailCard: React.FC<{ obligation: ObligationDetail }> = ({ obligation }) => (
  <Card title="Detalle de la Obligación" style={{ marginBottom: 24 }}>
    <Descriptions column={2} bordered>
      <Descriptions.Item label="ID" span={2}>{obligation.id}</Descriptions.Item>
      <Descriptions.Item label="Proyecto" span={2}>{obligation.project_name}</Descriptions.Item>
      <Descriptions.Item label="Tipo" span={2}>{obligation.type_name}</Descriptions.Item>
      {obligation.description && (
        <Descriptions.Item label="Descripción" span={2}>{obligation.description}</Descriptions.Item>
      )}
      <Descriptions.Item label="Centro de Costo" span={1}>{obligation.cost_center_name || '-'}</Descriptions.Item>
      <Descriptions.Item label="Subcuenta" span={1}>{obligation.sub_account_name || '-'}</Descriptions.Item>
      <Descriptions.Item label="Monto Original">
        ${obligation.amount_original.toLocaleString('es-CL')} {obligation.currency}
      </Descriptions.Item>
      <Descriptions.Item label="Estado">
        <span style={{ 
          color: obligation.status === 'pagada' ? '#52c41a' : 
                 obligation.status === 'vencida' ? '#f5222d' : '#faad14',
          fontWeight: 'bold'
        }}>
          {obligation.status.toUpperCase()}
        </span>
      </Descriptions.Item>
      <Descriptions.Item label="Fecha Inicio">
        {new Date(obligation.start_date).toLocaleDateString('es-CL')}
      </Descriptions.Item>
      {obligation.due_date && (
        <Descriptions.Item label="Fecha Vencimiento">
          {new Date(obligation.due_date).toLocaleDateString('es-CL')}
        </Descriptions.Item>
      )}
      <Descriptions.Item label="Monto Pagado">
        ${obligation.paid_amount.toLocaleString('es-CL')}
      </Descriptions.Item>
      {obligation.credit_notes_total != null && obligation.credit_notes_total > 0 && (
        <Descriptions.Item label="Notas Crédito Aplicadas">
          ${Number(obligation.credit_notes_total).toLocaleString('es-CL')}
        </Descriptions.Item>
      )}
      <Descriptions.Item label="Balance Pendiente">
        <strong>${obligation.balance.toLocaleString('es-CL')}</strong>
      </Descriptions.Item>
    </Descriptions>
    {obligation.dte && (
      <div className="mt-4">
        <DteDetail dte={obligation.dte} />
      </div>
    )}
  </Card>
);
