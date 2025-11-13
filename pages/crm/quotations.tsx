import { Button, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import QuotationsTable from '../../components/QuotationsTable';

const { Title, Text } = Typography;

export default function QuotationsPage() {
  const handleView = (quotation: any) => {
    // TODO: Navegar a detalle de cotización
    message.info(`Ver cotización: ${quotation.quotation_number}`);
  };

  const handleEdit = (quotation: any) => {
    // TODO: Abrir modal de edición
    message.info(`Editar cotización: ${quotation.quotation_number}`);
  };

  const handleCreate = () => {
    // TODO: Abrir modal de creación
    message.info('Crear nueva cotización');
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Cotizaciones</Title>
          <Text type="secondary">Gestiona las cotizaciones de ventas inmobiliarias</Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          Nueva Cotización
        </Button>
      </div>
      
      <QuotationsTable 
        onView={handleView}
        onEdit={handleEdit}
      />
    </div>
  );
}
