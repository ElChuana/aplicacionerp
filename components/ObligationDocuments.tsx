// File: components/ObligationDocuments.tsx
import React, { useState } from 'react';
import useSWR from 'swr';
import { Upload, Button, List, Typography, message, Card, Spin } from 'antd';
import { UploadOutlined, FileOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  });

type Document = {
  id: number;
  file_name: string;
  file_path: string;
  uploaded_at: string;
};

interface Props {
  obligationId: number;
  companyId: number;
}

export const ObligationDocuments: React.FC<Props> = ({ obligationId, companyId }) => {
  const { data, error, mutate } = useSWR<Document[]>(
    `/api/erp/obligations/${obligationId}/documents?company=${companyId}`,
    fetcher
  );
  const [uploading, setUploading] = useState(false);

  const handleUpload = (file: RcFile) => {
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    fetch(`/api/erp/obligations/${obligationId}/documents`, {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al subir archivo');
        message.success(`${file.name} subido correctamente`);
        mutate();
      })
      .catch(err => {
        message.error(`Error: ${err.message}`);
      })
      .finally(() => setUploading(false));
  };

  if (error) return <Typography.Text type="danger">Error cargando documentos</Typography.Text>;
  if (!data) return <Spin tip="Cargando documentos..." style={{ margin: '20px auto', display: 'block' }} />;

  return (
    <Card size="small" title="Documentos" style={{ marginTop: 24 }}>
      <Upload
        beforeUpload={file => {
          handleUpload(file as RcFile);
          return false;
        }}
        multiple={false}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />} loading={uploading} type="dashed">
          Subir Documento
        </Button>
      </Upload>
      <List
        itemLayout="horizontal"
        dataSource={data}
        style={{ marginTop: 16 }}
        renderItem={doc => (
          <List.Item>
            <List.Item.Meta
              avatar={<FileOutlined style={{ fontSize: 24 }} />}
              title={<a href={doc.file_path} target="_blank" rel="noopener noreferrer">{doc.file_name}</a>}
              description={new Date(doc.uploaded_at).toLocaleString('es-CL')}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};
