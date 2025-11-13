import { useState } from 'react';
import { Modal, Form, DatePicker, Select, Button, Space, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

interface ExportModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ExportModal({ visible, onClose }: ExportModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const companyId = router.query.company || 1;
  const { data: projectsData } = useSWR(
    companyId ? `/api/projects?company=${companyId}` : null,
    fetcher
  );
  
  // Asegurarse de que projects sea siempre un array
  const projects = Array.isArray(projectsData) ? projectsData : [];

  const handleExport = async (values: any) => {
    try {
      setLoading(true);

      const startDate = values.dateRange[0].format('YYYY-MM-DD');
      const endDate = values.dateRange[1].format('YYYY-MM-DD');

      const params = new URLSearchParams({
        startDate,
        endDate,
      });

      if (values.companyId) {
        params.append('companyId', values.companyId);
      }

      if (values.projectId) {
        params.append('projectId', values.projectId);
      }

      const response = await fetch(`/api/export/movements-obligations?${params}`);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `movimientos-obligaciones-${startDate}-${endDate}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        message.success('Archivo exportado exitosamente');
        onClose();
        form.resetFields();
      } else {
        message.error('Error al exportar datos');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Error al exportar datos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Exportar Movimientos y Obligaciones"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleExport}
        initialValues={{
          dateRange: [dayjs().startOf('month'), dayjs().endOf('month')],
        }}
      >
        <Form.Item
          name="dateRange"
          label="Rango de Fechas"
          rules={[{ required: true, message: 'Seleccione el rango de fechas' }]}
        >
          <DatePicker.RangePicker
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            placeholder={['Fecha inicio', 'Fecha fin']}
          />
        </Form.Item>

        <Form.Item name="projectId" label="Proyecto (Opcional)">
          <Select
            placeholder="Todos los proyectos"
            allowClear
            loading={!projectsData}
            options={projects.map((p: any) => ({
              label: p.name,
              value: p.id,
            }))}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={onClose}>Cancelar</Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<DownloadOutlined />}
              loading={loading}
            >
              Exportar Excel
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <div style={{ marginTop: 16, padding: 12, backgroundColor: '#f0f2f5', borderRadius: 4 }}>
        <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
          <strong>El archivo Excel incluirá:</strong>
        </p>
        <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, fontSize: 12, color: '#666' }}>
          <li>Movimientos bancarios con obligaciones asociadas</li>
          <li>Detalle completo de obligaciones del período</li>
          <li>Resumen con totales y balance</li>
          <li>Relación entre movimientos y obligaciones</li>
        </ul>
      </div>
    </Modal>
  );
}
