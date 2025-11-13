import { Typography } from 'antd';
import UnitsTable from '../../components/UnitsTable';

const { Title, Text } = Typography;

export default function UnitsPage() {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>Gestión de Unidades</Title>
        <Text type="secondary">Administra las unidades inmobiliarias de tus proyectos</Text>
      </div>
      
      <UnitsTable />
    </div>
  );
}
