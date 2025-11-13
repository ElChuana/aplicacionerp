import React, { useState } from 'react';
import { Upload, Button, message, Select, Card, Descriptions, Alert } from 'antd';
import { InboxOutlined, RightOutlined } from '@ant-design/icons';
import useSWR from 'swr';
type BankAccount = { id: number; bank_name: string; account_no: string };
import { fetcher } from '../../../lib/fetcher';

const ImportMovements = () => {
  const companyId = 1; // TODO: obtener desde la URL o sesión
  const { data: bankAccounts } = useSWR<BankAccount[]>(
    companyId ? `/api/erp/bank-accounts?company=${companyId}` : null,
    fetcher
  );

  const [bankAccountId, setBankAccountId] = useState<number | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const props = {
    beforeUpload: (file: File) => {
      setFileList([file]);
      setResult(null);
      return false;
    },
    onRemove: () => setFileList([]),
    accept: '.csv',
  };

  const handleUpload = async () => {
    if (!bankAccountId || fileList.length === 0) {
      message.warning('Selecciona una cuenta bancaria y un archivo válido.');
      return;
    }

    const formData = new FormData();
    formData.append('bankAccountId', String(bankAccountId));
    formData.append('file', fileList[0]);

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/erp/bank-movements/import', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error en la subida');
      setResult(data);

      message.success({
        content: (
          <div>
            ✅ <b>{fileList[0].name}</b> cargado correctamente.
            <br />
            {data.movimientosNuevos} movimientos nuevos de {data.totalFilas} procesados.
          </div>
        ),
        duration: 4,
      });
    } catch (error: any) {
      message.error(error.message || 'Error al subir cartola.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Importar Cartola Bancaria" className="max-w-2xl mx-auto mt-8 shadow">
      {/* 🔹 Selección de cuenta */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Cuenta bancaria:</label>
        <Select
          style={{ width: '100%' }}
          placeholder="Selecciona cuenta"
          onChange={(v) => setBankAccountId(v)}
          loading={!bankAccounts}
        >
          {bankAccounts?.map((acc: BankAccount) => (
            <Select.Option key={acc.id} value={acc.id}>
              {acc.bank_name} - {acc.account_no}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* 🔹 Subida de archivo */}
      <Upload.Dragger {...props} fileList={fileList} multiple={false}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Arrastra o haz clic para seleccionar tu archivo (.csv)
        </p>
        {fileList.length > 0 && (
          <p className="text-green-600">Archivo seleccionado: {fileList[0].name}</p>
        )}
      </Upload.Dragger>

      {/* 🔹 Botón subir */}
      <div className="mt-6 text-right">
        <Button
          type="primary"
          onClick={handleUpload}
          loading={loading}
          disabled={!fileList.length || !bankAccountId}
        >
          {loading ? 'Subiendo...' : 'Subir Cartola'}
        </Button>
      </div>

      {/* 🔹 Resumen del resultado */}
      {result && (
        <div className="mt-6">
          <Descriptions bordered size="small" column={1} title="Resumen de importación">
            <Descriptions.Item label="Archivo">{result.file}</Descriptions.Item>
            <Descriptions.Item label="Total de filas">{result.totalFilas}</Descriptions.Item>
            <Descriptions.Item label="Movimientos nuevos">
              {result.movimientosNuevos}
            </Descriptions.Item>
            <Descriptions.Item label="Duplicados">
              {result.movimientosDuplicados}
            </Descriptions.Item>
          </Descriptions>

          <Alert
            message={result.mensaje}
            type={result.movimientosNuevos > 0 ? 'success' : 'warning'}
            showIcon
            className="mt-4"
          />

          {/* 🔹 Botón para ir a asignar (solo si hubo nuevos movimientos) */}
          {result.movimientosNuevos > 0 && (
            <div className="mt-6 text-right">
              <Button
                type="default"
                icon={<RightOutlined />}
                onClick={() => {
                  window.location.href = `/erp/movements/assign?account=${bankAccountId}`;
                }}
              >
                Ir a asignar centros de costo
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default ImportMovements;
