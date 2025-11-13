// File: components/CostCentersSummary.tsx
import React from 'react';
import { Row, Col, Card, Typography } from 'antd';

export type CostCenterAgg = {
  id: number;
  name: string;
  totalCLP: number | null | undefined;
  totalUF: number | null | undefined;
};
interface Props {
  data: CostCenterAgg[];
  onSelect(id: number): void;
}

export const CostCentersSummary: React.FC<Props> = ({ data, onSelect }) => (
  <Row gutter={[16, 16]}>
    {data.map(cc => (
      <Col key={cc.id} xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card
          size="small"
          title={cc.name}
          hoverable
          onClick={() => onSelect(cc.id)}
          style={{ 
            width: '100%', 
            cursor: 'pointer', 
            border: (cc.totalCLP ?? 0) < 0 ? '2px solid #ff4d4f' : undefined,
            minHeight: '120px'
          }}
        >
          <Typography.Text>
            <strong>CLP</strong>: {cc.totalCLP != null ? Math.round(cc.totalCLP).toLocaleString('es-CL') : '-'}
            {(cc.totalCLP ?? 0) < 0 && <span style={{ color: '#ff4d4f', marginLeft: 8 }}>(Negativo)</span>}
          </Typography.Text>
          <br />
          <Typography.Text>
            <strong>UF</strong>: {cc.totalUF != null ? cc.totalUF.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'}
          </Typography.Text>
        </Card>
      </Col>
    ))}
  </Row>
);
