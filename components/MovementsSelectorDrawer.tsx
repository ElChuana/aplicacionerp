// File: components/MovementsSelectorDrawer.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Drawer, Button, Table, InputNumber, Space, Typography, Tag, Select, DatePicker, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Movement } from './MovementsTable';
import dayjs from 'dayjs';

const { Text } = Typography;


// Utilidades para coincidencia por nombre de proveedor
function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/[^a-z0-9\s]/g, ' ') // quita puntuación
    .replace(/\s+/g, ' ') // colapsa espacios
    .trim();
}

function providerCoreTokens(provider?: string): string[] {
  if (!provider) return [];
  const legalWords = new Set([
    'sa', 's.a', 'spa', 's.p.a', 'ltda', 'limitada', 'eirl', 'e.i.r.l',
    'cia', 'cia.', 'comercial', 'inmobiliaria', 'constructora', 'servicios',
    'empresa', 'empresas', 'sociedad', 'y', 'de', 'la', 'el'
  ]);
  const norm = normalizeText(provider);
  const tokens = norm.split(' ').filter(t => t && !legalWords.has(t) && t.length >= 3);
  return tokens;
}


interface Props {
  visible: boolean;
  onClose: () => void;
  data: Movement[];
  loading: boolean;
  balance: number;            // balance de la obligación para auto-asignación
  selectedKeys: string[];
  onSelectionChange: (keys: React.Key[]) => void;
  onConfirm: (selectedIds: string[]) => Promise<void>;
}

export const MovementsSelectorDrawer: React.FC<Props> = ({
  visible,
  onClose,
  data,
  loading,
  balance,
  selectedKeys,
  onSelectionChange,
  onConfirm,
}) => {
  const [matchedAmounts, setMatchedAmounts] = useState<Record<string, number>>({});

  // Filtros UI state
  const [accountFilter, setAccountFilter] = useState<string | undefined>(undefined);
  const [descFilter, setDescFilter] = useState<string>('');
  
  // Sin filtro de fecha por defecto - mostrar todos los movimientos
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });

  // Filtrado y agrupación memoizada para rendimiento
  const filteredData = useMemo(() => {
    const from = dateRange.from;
    const to = dateRange.to;
    return data.filter((m) => {
      const d = new Date(m.bank_date);
      // Solo aplicar filtro de fecha si ambos valores están definidos
      if (from && to) {
        if (d < from || d > to) return false;
      }
      if (accountFilter && `${m.bank_account_id}` !== accountFilter) return false;
      // Filtro de descripción
      if (descFilter && !m.description?.toLowerCase().includes(descFilter.toLowerCase())) return false;
      return true;
    });
  }, [data, dateRange, accountFilter, descFilter]);


    // Sistema de recomendaciones basado en scores del servidor
  const recommendations = useMemo(() => {
    const exactAmountMatches: Movement[] = [];
    const providerAndDateMatches: Movement[] = [];
    const otherMovements: Movement[] = [];

    filteredData.forEach(movement => {
      if (movement.suggestionScore === 100) {
        exactAmountMatches.push(movement);
      } else if (movement.suggestionScore && movement.suggestionScore >= 50) {
        providerAndDateMatches.push(movement);
      } else {
        otherMovements.push(movement);
      }
    });

    return {
      exactAmount: exactAmountMatches,
      providerAndDate: providerAndDateMatches,
      other: otherMovements,
    };
  }, [filteredData]);

  const recommendedMovementsMemo = useMemo<string[]>(() => {
    const rec: string[] = [];
    filteredData.forEach(movement => {
      const amount = movement.credit ?? movement.debit ?? 0;
      if (amount === balance) rec.unshift(movement.id);
      else if (balance !== 0 && Math.abs(amount - balance) / balance < 0.01) rec.push(movement.id);
    });
    return rec;
  }, [filteredData, balance]);

  const accountsOptions = useMemo(() => {
    const map = new Map<string, string>();
    data.forEach((m) => {
      const key = `${m.bank_account_id}`;
      if (!map.has(key)) map.set(key, m.accountName || `Cuenta ${key}`);
    });
    return Array.from(map, ([value, label]) => ({ value, label }));
  }, [data]);

  // Forzar filtro de cuenta por defecto (primera cuenta disponible)
  useEffect(() => {
    if (!accountFilter && accountsOptions.length > 0) {
      setAccountFilter(accountsOptions[0].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountsOptions]);

  const exactMatches = useMemo(() => filteredData.filter((m) => (m.credit ?? m.debit ?? 0) === balance), [filteredData, balance]);

  useEffect(() => {
    const init: Record<string, number> = {};
    selectedKeys.forEach(key => {
      const mv = data.find(m => m.id === key);
      if (mv) {
        // Si ya tiene un monto asignado, lo mantiene, sino usa el monto del movimiento
        const existingAmount = matchedAmounts[key];
        if (existingAmount !== undefined) {
          init[key] = existingAmount;
        } else {
          // Auto-asignar el monto completo del movimiento si cabe en el balance
          const movementAmount = mv.credit ?? mv.debit ?? 0;
          const otherSum = Object.entries(matchedAmounts)
            .filter(([id]) => id !== key)
            .reduce((sum, [, amt]) => sum + amt, 0);
          const available = balance - otherSum;
          init[key] = Math.min(movementAmount, available);
        }
      }
    });
    setMatchedAmounts(init);
  }, [selectedKeys, data, balance]);

  const totalMatched = Object.values(matchedAmounts).reduce((sum, v) => sum + v, 0);
  const remaining = balance - totalMatched;

  const columns: ColumnsType<Movement> = [
    {
      title: 'Fecha',
      dataIndex: 'bank_date',
      key: 'bank_date',
      width: 110,
      sorter: (a, b) => new Date(a.bank_date).getTime() - new Date(b.bank_date).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString('es-CL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      onCell: () => ({
        style: {
          whiteSpace: 'normal',
          wordBreak: 'break-word',
        },
      }),
      render: (desc: string) => desc || '-',
    },
    {
      title: 'Abono',
      dataIndex: 'debit',
      key: 'debit',
      width: 130,
      align: 'right',
      render: (val) => (val != null ? `$${(val as number).toLocaleString('es-CL')}` : '-'),
    },
    {
      title: 'Cargo',
      dataIndex: 'credit',
      key: 'credit',
      width: 130,
      align: 'right',
      render: (val) => (val != null ? `$${(val as number).toLocaleString('es-CL')}` : '-'),
    },
    {
      title: 'Moneda',
      dataIndex: 'currency',
      key: 'currency',
      align: 'center',
      width: 80,
    },
    {
      title: 'Monto a Asociar',
      key: 'match',
      width: 150,
      align: 'right',
      render: (_: any, rec) => {
        const maxPer = rec.credit ?? rec.debit ?? 0;
        const prev = matchedAmounts[rec.id] ?? 0;
        const otherSum = totalMatched - prev;
        const allowed = Math.max(Math.min(maxPer, balance - otherSum), 0);
        
        const isSelected = selectedKeys.includes(rec.id);
        
        return (
          <InputNumber<number>
            min={0}
            max={allowed}
            step={1000}
            value={isSelected ? prev : 0}
            disabled={!isSelected}
            style={{ width: '100%' }}
            onChange={val => {
              const num = Number(val) || 0;
              const clamped = Math.min(Math.max(num, 0), allowed);
              setMatchedAmounts({ ...matchedAmounts, [rec.id]: clamped });
            }}
            formatter={v => `$${(v as number)?.toLocaleString('es-CL')}`}
            parser={v => Number(v?.replace(/\$\s?|(\.)/g, '') || '0') as 0}
          />
        );
      },
    },
    {
      title: 'Coincidencia',
      key: 'coincide',
      width: 120,
      align: 'center',
      render: (_: any, rec) => {
        const amount = rec.credit ?? rec.debit ?? 0;
        if (amount === balance) {
          return <Tag color="blue">✓ Exacta</Tag>;
        }
        if (balance !== 0 && Math.abs(amount - balance) / balance < 0.01) {
          return <Tag color="orange">≈ Parcial</Tag>;
        }
        return null;
      },
    },
  ];

  return (
    <Drawer
      title="Asociar Movimientos Bancarios"
      placement="right"
      width="95%"
      onClose={onClose}
      open={visible}
      bodyStyle={{ padding: 16 }}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space direction="vertical" size={0}>
            <Text>Balance obligación: <strong>${balance.toLocaleString('es-CL')}</strong></Text>
            <Text>Total a asociar: <strong>${totalMatched.toLocaleString('es-CL')}</strong></Text>
            <Text 
              strong 
              style={{ 
                color: remaining === 0 ? '#389e0d' : remaining > 0 ? '#faad14' : '#cf1322',
                fontSize: 16
              }}
            >
              {remaining === 0 
                ? '✓ Completo' 
                : remaining > 0
                ? `Faltante: $${remaining.toLocaleString('es-CL')}`
                : `Exceso: $${Math.abs(remaining).toLocaleString('es-CL')}`}
            </Text>
          </Space>
          <Space>
            <Button onClick={onClose} size="large">
              Cancelar
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => onConfirm(Object.entries(matchedAmounts).map(([id, amt]) => `${id}:${amt}`))}
              disabled={selectedKeys.length === 0 || totalMatched === 0 || totalMatched > balance}
            >
              Confirmar Asociación ({selectedKeys.length})
            </Button>
          </Space>
        </div>
      }
    >
      <div>
        {/* Resumen superior */}
        <div style={{ 
          background: '#f5f5f5', 
          padding: 16, 
          marginBottom: 16, 
          borderRadius: 8,
          border: '1px solid #d9d9d9'
        }}>
          <Space size="large">
            <div>
              <Text type="secondary">Balance Obligación</Text>
              <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                ${balance.toLocaleString('es-CL')}
              </div>
            </div>
            <div>
              <Text type="secondary">Total Seleccionado</Text>
              <div style={{ fontSize: 20, fontWeight: 'bold', color: '#1890ff' }}>
                ${totalMatched.toLocaleString('es-CL')}
              </div>
            </div>
            <div>
              <Text type="secondary">Movimientos</Text>
              <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                {selectedKeys.length}
              </div>
            </div>
          </Space>
        </div>

        {/* Filtros */}
        <div style={{ 
          marginBottom: 16, 
          display: 'flex', 
          gap: 12, 
          alignItems: 'center', 
          flexWrap: 'wrap',
          padding: 12,
          background: '#fafafa',
          borderRadius: 6
        }}>
          <Text strong>Filtros:</Text>
          <Select
            allowClear={false}
            placeholder="Cuenta bancaria"
            style={{ width: 260 }}
            value={accountFilter}
            onChange={(v) => setAccountFilter(v)}
            options={accountsOptions.map(a => ({ value: a.value, label: a.label }))}
          />
          <Input.Search
            placeholder="Buscar por descripción..."
            allowClear
            value={descFilter}
            onChange={(e) => setDescFilter(e.target.value)}
            style={{ width: 300 }}
          />
          <Space>
            <Text>Desde:</Text>
            <DatePicker
              value={dateRange.from ? dayjs(dateRange.from) : null}
              onChange={(date) => {
                setDateRange({ ...dateRange, from: date ? date.toDate() : null });
              }}
              format="DD/MM/YYYY"
              placeholder="Fecha desde"
              allowClear
            />
            <Text>Hasta:</Text>
            <DatePicker
              value={dateRange.to ? dayjs(dateRange.to) : null}
              onChange={(date) => {
                setDateRange({ ...dateRange, to: date ? date.toDate() : null });
              }}
              format="DD/MM/YYYY"
              placeholder="Fecha hasta"
              allowClear
            />
          </Space>
          <Button 
            onClick={() => { 
              setAccountFilter(accountsOptions[0]?.value); 
              setDateRange({ from: null, to: null });
              setDescFilter(''); 
            }}
          >
            Reiniciar Filtros
          </Button>
        </div>

        {/* Recomendaciones: Monto exacto */}
        {recommendations.exactAmount.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ 
              background: '#f6ffed', 
              padding: 12, 
              borderRadius: 6,
              marginBottom: 12,
              border: '2px solid #52c41a'
            }}>
              <Text strong style={{ color: '#389e0d', fontSize: 15 }}>
                🎯 Recomendación: Monto Exacto ({recommendations.exactAmount.length})
              </Text>
              <br />
              <Text style={{ color: '#52c41a', fontSize: 13 }}>
                Estos movimientos tienen el mismo monto que el balance de la obligación (${balance.toLocaleString('es-CL')})
              </Text>
            </div>
            <Table<Movement>
              size="small"
              columns={columns}
              dataSource={recommendations.exactAmount}
              rowKey="id"
              loading={loading}
              pagination={false}
              rowSelection={{
                selectedRowKeys: selectedKeys,
                onChange: (keys: React.Key[]) => onSelectionChange(keys),
              }}
              tableLayout="fixed"
            />
          </div>
        )}

        {/* Recomendaciones: Proveedor + Fecha */}
        {recommendations.providerAndDate.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ 
              background: '#e6f7ff', 
              padding: 12, 
              borderRadius: 6,
              marginBottom: 12,
              border: '2px solid #1890ff'
            }}>
              <Text strong style={{ color: '#0050b3', fontSize: 15 }}>
                💡 Recomendación: Proveedor y Mes ({recommendations.providerAndDate.length})
              </Text>
              <br />
              <Text style={{ color: '#1890ff', fontSize: 13 }}>
                Estos movimientos coinciden con el proveedor en la descripción y están en el mismo mes de vencimiento
              </Text>
            </div>
            <Table<Movement>
              size="small"
              columns={columns}
              dataSource={recommendations.providerAndDate}
              rowKey="id"
              loading={loading}
              pagination={false}
              rowSelection={{
                selectedRowKeys: selectedKeys,
                onChange: (keys: React.Key[]) => onSelectionChange(keys),
              }}
              tableLayout="fixed"
            />
          </div>
        )}

        {/* Tabla principal: Todos los movimientos */}
        <div>
          <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text strong style={{ fontSize: 16 }}>
              Otros Movimientos Disponibles
            </Text>
            <Text type="secondary">
              Mostrando {recommendations.other.length} movimientos
            </Text>
          </div>
          <Table<Movement>
            size="small"
            rowSelection={{
              selectedRowKeys: selectedKeys,
              onChange: (keys: React.Key[]) => onSelectionChange(keys),
            }}
            columns={columns}
            dataSource={recommendations.other}
            rowKey="id"
            loading={loading}
            pagination={{ 
              pageSize: 15,
              showSizeChanger: true,
              showTotal: (total) => `Total: ${total} movimientos`
            }}
            tableLayout="fixed"
            rowClassName={(record) => {
              const amount = record.credit ?? record.debit ?? 0;
              if (amount === balance) return 'bg-blue-50';
              if (recommendedMovementsMemo.includes(record.id)) return 'bg-gray-50';
              return '';
            }}
          />
        </div>
      </div>
    </Drawer>
  );
};