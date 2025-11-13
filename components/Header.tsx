// File: components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Select, Typography, Card, Button } from 'antd';
import { SwapOutlined, DownloadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ExportModal from './ExportModal';

const { Header: AntHeader } = Layout;
const { Text } = Typography;
const fetcher = (url: string) => fetch(url).then(r => r.json());

type HeaderMode = 'erp' | 'crm';

export const Header: React.FC = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const [selectedCompany, setSelectedCompany] = useState<number>();
  const [exportModalVisible, setExportModalVisible] = useState(false);
  
  // Detectar si estamos en ERP o CRM según la ruta
  const mode: HeaderMode = pathname.startsWith('/crm') ? 'crm' : 'erp';

  // UF de hoy sin decimales
  const today = new Date().toISOString().slice(0, 10);
  const { data: ufData } = useSWR<{ uf_value: number }>(
    `/api/uf-sync?date=${today}`, fetcher, { refreshInterval: 86400000 }
  );
  const ufValue = ufData ? Math.round(ufData.uf_value) : null;

  // Lista de empresas
  const { data: companies } = useSWR<{ id: number; name: string }[]>(
    '/api/companies',
    fetcher
  );

  // Inicializar / sincronizar compañía según query y lista de empresas
  useEffect(() => {
    if (!companies) return;
    const companyParam = Array.isArray(query.company) ? query.company[0] : query.company;
    const queryCompany = companyParam ? Number(companyParam) : undefined;
    const defaultId = queryCompany ?? companies[0]?.id;
    if (defaultId == null) return;
    if (selectedCompany !== defaultId || queryCompany == null) {
      setSelectedCompany(defaultId);
      router.replace(
        { pathname, query: { ...query, company: defaultId } },
        undefined,
        { shallow: true }
      );
    }
  }, [companies, pathname, query, router, selectedCompany]);

  const onSelectCompany = (value: number) => {
    setSelectedCompany(value);
    router.push({ pathname, query: { ...query, company: value } });
  };

  const toggleMode = () => {
    const targetMode = mode === 'erp' ? 'crm' : 'erp';
    const targetPath = targetMode === 'crm' ? '/crm/projects' : '/companies/1';
    router.push(targetPath);
  };

  const getMenuItems = () => {
    if (mode === 'erp') {
      return (
        <>
          <Menu.Item
            key="movements"
            onClick={() =>
              router.push({ pathname: '/erp/movements', query: { company: selectedCompany } })
            }
          >
            Movimientos de Banco
          </Menu.Item>
          <Menu.Item
            key="obligations"
            onClick={() =>
              router.push({ pathname: '/erp/obligations', query: { company: selectedCompany } })
            }
          >
            Obligaciones
          </Menu.Item>
          <Menu.Item
            key="credits"
            onClick={() =>
              router.push({ pathname: '/erp/credits', query: { company: selectedCompany } })
            }
          >
            Créditos
          </Menu.Item>
          <Menu.Item
            key="cost-centers"
            onClick={() =>
              router.push({ pathname: '/erp/cost-centers', query: { company: selectedCompany } })
            }
          >
            Centros de Costo
          </Menu.Item>
        </>
      );
    } else {
      // CRM Menu
      return (
        <>
          <Menu.Item
            key="companies"
            onClick={() =>
              router.push({
                pathname: '/companies/[id]',
                query: { id: selectedCompany, company: selectedCompany },
              })
            }
          >
            Empresas
          </Menu.Item>
          <Menu.Item
            key="dashboard"
            onClick={() => router.push({ pathname: '/crm/dashboard', query: { company: selectedCompany } })}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="projects"
            onClick={() => router.push({ pathname: '/crm/projects', query: { company: selectedCompany } })}
          >
            Proyectos
          </Menu.Item>
          <Menu.Item
            key="units"
            onClick={() => router.push({ pathname: '/crm/units', query: { company: selectedCompany } })}
          >
            Unidades
          </Menu.Item>
          <Menu.Item
            key="clients"
            onClick={() => router.push({ pathname: '/crm/clients', query: { company: selectedCompany } })}
          >
            Clientes
          </Menu.Item>
          <Menu.Item
            key="leads"
            onClick={() => router.push({ pathname: '/crm/leads', query: { company: selectedCompany } })}
          >
            Oportunidades
          </Menu.Item>
          <Menu.Item
            key="properties"
            onClick={() => router.push({ pathname: '/crm/properties', query: { company: selectedCompany } })}
          >
            Propiedades
          </Menu.Item>
          <Menu.Item
            key="tasks"
            onClick={() => router.push({ pathname: '/crm/tasks', query: { company: selectedCompany } })}
          >
            Tareas
          </Menu.Item>
        </>
      );
    }
  };

  return (
    <AntHeader 
      style={{ 
        background: mode === 'erp' ? '#001529' : '#1890ff', 
        padding: '0 24px' 
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <div style={{ marginRight: 24, color: 'white', fontWeight: 'bold', fontSize: 18 }}>
          {mode === 'erp' ? 'ERP' : 'CRM'}
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          style={{ flex: 1, background: 'transparent' }}
        >
          {getMenuItems()}
        </Menu>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {mode === 'erp' && (
            <Button
              icon={<DownloadOutlined />}
              onClick={() => setExportModalVisible(true)}
              style={{ height: 32 }}
            >
              Exportar
            </Button>
          )}
          <Button
            type="primary"
            icon={<SwapOutlined />}
            onClick={toggleMode}
            style={{
              backgroundColor: mode === 'erp' ? '#1890ff' : '#001529',
              borderColor: mode === 'erp' ? '#1890ff' : '#001529',
            }}
          >
            Cambiar a {mode === 'erp' ? 'CRM' : 'ERP'}
          </Button>
          {mode === 'erp' && (
            <Card
              size="small"
              bodyStyle={{ padding: '0 12px', height: 32, display: 'flex', alignItems: 'center' }}
              style={{ backgroundColor: '#fafafa', borderRadius: 4 }}
            >
              <Text>
                UF hoy: {ufValue !== null ? ufValue.toLocaleString('es-CL') : '-'}
              </Text>
            </Card>
          )}
          <Select
            placeholder="Empresa"
            style={{ width: 200, height: 32 }}
            options={companies?.map(c => ({ label: c.name, value: c.id }))}
            value={selectedCompany}
            onChange={onSelectCompany}
            allowClear={false}
          />
        </div>
      </div>
      <ExportModal 
        visible={exportModalVisible} 
        onClose={() => setExportModalVisible(false)} 
      />
    </AntHeader>
  );
};
