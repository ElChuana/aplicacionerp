import React, { useEffect, useMemo, useState } from 'react';
import { Drawer, Table, Space, Typography, InputNumber, Button, Tag, Modal, message, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CreateObligationForm } from './CreateObligationForm';

const { Text } = Typography;
const { Search } = Input;

// Formateo consistente de números con separador de miles
function formatNumber(value: number): string {
  if (isNaN(value)) return "0";
  return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

interface ObligationRow {
  id: string;
  providerName: string;
  projectName: string;
  typeName: string;
  description: string | null;
  documentNumber?: string | null;
  amount_original: number;
  currency: string;
  balance: number;
  status: string;
  suggestionScore?: number;
}

interface MatchRow { obligationId: number; matched_amount: number; }
interface MovementInfo { id: number; amount: number; currency: string; description: string | null; bank_date: string; }

interface Props {
  movementId: number;
  companyId: number;
  visible: boolean;
  onClose: () => void;
  onAssociated: () => void;
}

export const MovementObligationsDrawer: React.FC<Props> = ({ movementId, companyId, visible, onClose, onAssociated }) => {
  const [loading, setLoading] = useState(false);
  const [movement, setMovement] = useState<MovementInfo | null>(null);
  const [obligations, setObligations] = useState<ObligationRow[]>([]);
  const [matches, setMatches] = useState<MatchRow[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [assignAmounts, setAssignAmounts] = useState<Record<string, number>>({});
  const [createModal, setCreateModal] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (!visible) return;
    const fetchAll = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/erp/bank-movements/${movementId}/obligations?company=${companyId}`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setMovement(data.movement);
        setObligations(data.obligations);
        setMatches(data.matches);
        const existingIds = data.matches.map((m: MatchRow) => String(m.obligationId));
        setSelected(existingIds);
        const init: Record<string, number> = {};
        data.matches.forEach((m: MatchRow) => { init[String(m.obligationId)] = m.matched_amount; });
        setAssignAmounts(init);
      } catch (e: any) { message.error(`Error al cargar: ${e.message}`); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, [visible, movementId, companyId]);

  const movementAmount = movement?.amount || 0;
  const totalAssigned = Object.values(assignAmounts).reduce((s, v) => s + v, 0);
  const remaining = movementAmount - totalAssigned;
  const matchMap = useMemo(() => { const m = new Map<number, number>(); matches.forEach(mt => m.set(mt.obligationId, mt.matched_amount)); return m; }, [matches]);

  // Función para calcular puntaje de sugerencia
  const calculateSuggestionScore = (obl: ObligationRow): number => {
    let score = 0;
    const oblAmount = obl.balance || obl.amount_original;
    const movDesc = (movement?.description || '').toLowerCase();
    const oblDesc = (obl.description || '').toLowerCase();
    const oblProvider = (obl.providerName || '').toLowerCase();

    // Puntaje por monto
    const amountDiff = Math.abs(oblAmount - movementAmount);
    const amountPercent = movementAmount > 0 ? (amountDiff / movementAmount) * 100 : 100;
    if (amountDiff < 0.01) score += 100; // Monto exacto
    else if (amountPercent <= 1) score += 80; // Dentro del 1%
    else if (amountPercent <= 5) score += 50; // Dentro del 5%
    else if (amountPercent <= 10) score += 20; // Dentro del 10%

    // Puntaje por similitud de texto en descripción
    if (movDesc && oblDesc) {
      const movWords = movDesc.split(/\s+/).filter(w => w.length > 3);
      const oblWords = oblDesc.split(/\s+/).filter(w => w.length > 3);
      let matches = 0;
      movWords.forEach(mw => {
        if (oblWords.some(ow => ow.includes(mw) || mw.includes(ow))) matches++;
      });
      if (matches > 0) score += matches * 10;
    }

    // Puntaje por similitud con nombre de proveedor
    if (movDesc && oblProvider) {
      const provWords = oblProvider.split(/\s+/).filter(w => w.length > 3);
      let matches = 0;
      provWords.forEach(pw => {
        if (movDesc.includes(pw)) matches++;
      });
      if (matches > 0) score += matches * 15;
    }

    return score;
  };

  // Filtrar y ordenar obligaciones con sugerencias
  const processedObligations = useMemo(() => {
    let filtered = obligations;
    
    // Aplicar filtro de búsqueda
    if (searchText.trim().length >= 2) {
      const search = searchText.toLowerCase();
      filtered = obligations.filter(obl => {
        const desc = (obl.description || '').toLowerCase();
        const provider = (obl.providerName || '').toLowerCase();
        const project = (obl.projectName || '').toLowerCase();
        return desc.includes(search) || provider.includes(search) || project.includes(search);
      });
    }

    // Calcular score y ordenar
    const withScores = filtered.map(obl => ({
      ...obl,
      suggestionScore: calculateSuggestionScore(obl)
    }));

    // Ordenar por score descendente
    return withScores.sort((a, b) => b.suggestionScore - a.suggestionScore);
  }, [obligations, searchText, movement, movementAmount]);

  // Agrupar obligaciones por recomendación
  const recommendations = useMemo(() => {
    const exactAmount: ObligationRow[] = [];
    const highScore: ObligationRow[] = [];
    const other: ObligationRow[] = [];

    processedObligations.forEach(obl => {
      const oblAmount = obl.balance || obl.amount_original;
      const score = obl.suggestionScore || 0;
      
      if (Math.abs(oblAmount - movementAmount) < 0.01) {
        exactAmount.push(obl);
      } else if (score >= 50) {
        highScore.push(obl);
      } else {
        other.push(obl);
      }
    });

    return { exactAmount, highScore, other };
  }, [processedObligations, movementAmount]);

  const columns: ColumnsType<ObligationRow> = [
    { 
      title: 'Obligación', 
      dataIndex: 'id', 
      key: 'id', 
      width: 100, 
      render: (id) => `#${id}`
    },
    { 
      title: 'Proyecto', 
      dataIndex: 'projectName', 
      key: 'projectName', 
      width: 160, 
      render: v => v || '-' 
    },
    { 
      title: 'Proveedor', 
      dataIndex: 'providerName', 
      key: 'providerName', 
      width: 180, 
      render: v => v || '-' 
    },
    { 
      title: 'Tipo', 
      dataIndex: 'typeName', 
      key: 'typeName', 
      width: 140 
    },
    { 
      title: 'N° Doc', 
      dataIndex: 'documentNumber', 
      key: 'documentNumber', 
      width: 100,
      render: v => v || '-' 
    },
    { 
      title: 'Descripción', 
      dataIndex: 'description', 
      key: 'description', 
      render: d => <span style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{d || '-'}</span> 
    },
    { 
      title: 'Balance', 
      dataIndex: 'balance', 
      key: 'balance', 
      align: 'right', 
      width: 130, 
      render: v => v != null ? `$${formatNumber(v)}` : '-' 
    },
    { 
      title: 'Monto a Asociar', 
      key: 'input', 
      align: 'right', 
      width: 160, 
      render: (_: any, rec) => { 
        const selectedFlag = selected.includes(rec.id); 
        const prev = assignAmounts[rec.id] ?? 0; 
        const maxAllowed = Math.max(movementAmount - (totalAssigned - prev), 0); 
        return (
          <InputNumber 
            disabled={!selectedFlag} 
            value={selectedFlag ? prev : 0} 
            min={0} 
            max={maxAllowed} 
            step={1000} 
            style={{ width: '100%' }} 
            formatter={v => `$${formatNumber(v as number)}`} 
            parser={v => Number(v?.replace(/\$\s?|(\.)/g, '') || '0') as 0}
            onChange={(val) => { 
              const num = Number(val) || 0; 
              const clamped = Math.min(Math.max(num, 0), maxAllowed); 
              setAssignAmounts({ ...assignAmounts, [rec.id]: clamped }); 
            }} 
          />
        ); 
      } 
    },
    { 
      title: 'Coincidencia', 
      key: 'coincidencia', 
      width: 120, 
      align: 'center',
      render: (_: any, rec) => {
        const oblAmount = rec.balance || rec.amount_original;
        if (Math.abs(oblAmount - movementAmount) < 0.01) {
          return <Tag color="blue">✓ Exacta</Tag>;
        }
        if (movementAmount !== 0 && Math.abs(oblAmount - movementAmount) / movementAmount < 0.01) {
          return <Tag color="orange">≈ Parcial</Tag>;
        }
        return null;
      }
    }
  ];

  const rowSelection = { 
    selectedRowKeys: selected, 
    onChange: (keys: React.Key[]) => { 
      const asStrings = keys.map(String); 
      const previousSelected = selected;
      setSelected(asStrings); 
      
      const next = { ...assignAmounts }; 
      
      // Eliminar montos de obligaciones deseleccionadas
      previousSelected.forEach(prevKey => {
        if (!asStrings.includes(prevKey)) {
          delete next[prevKey];
        }
      });
      
      // Para las obligaciones recién seleccionadas, asignar su balance completo
      asStrings.forEach(k => { 
        if (next[k] == null) {
          // Buscar la obligación correspondiente
          const obl = processedObligations.find(o => o.id === k);
          if (obl) {
            const oblBalance = obl.balance || obl.amount_original;
            // Calcular cuánto espacio queda en el movimiento
            const currentTotal = Object.entries(next).reduce((sum, [id, amt]) => {
              return id !== k ? sum + amt : sum;
            }, 0);
            const available = movementAmount - currentTotal;
            // Asignar el menor entre el balance de la obligación y el espacio disponible
            next[k] = Math.min(oblBalance, available, movementAmount);
          } else {
            next[k] = 0;
          }
        }
      }); 
      
      setAssignAmounts(next); 
    } 
  };

  const handleConfirm = async () => {
    if (!movement) return; if (selected.length === 0) { message.warning('Selecciona al menos una obligación'); return; }
    if (totalAssigned > movementAmount + 0.01) { message.error('Total asignado excede el monto del movimiento'); return; }
    const entries = selected.map(id => `${id}:${assignAmounts[id] || 0}`).filter(e => !e.endsWith(':0')); if (entries.length === 0) { message.warning('No hay montos positivos para asociar'); return; }
    try {
      const res = await fetch(`/api/erp/bank-movements/${movementId}/associate-obligations`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ obligationEntries: entries }) });
      if (!res.ok) throw new Error(await res.text()); message.success('Obligaciones asociadas'); onAssociated(); onClose();
    } catch (e: any) { message.error(`Error: ${e.message}`); }
  };

  const handleCreatedObligation = async (vals: any) => {
    try {
      const res = await fetch('/api/erp/obligations', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ 
          projectId: vals.projectId, 
          typeId: vals.typeId, 
          providerId: vals.providerId, 
          costCenterId: vals.costCenterId,
          subAccountId: vals.subAccountId,
          description: vals.description || movement?.description || 'Obligación desde movimiento', 
          amount: vals.amount || movementAmount, 
          currency: vals.currency || movement?.currency || 'CLP', 
          startDate: vals.startDate?.format('YYYY-MM-DD'), 
          dueDate: vals.dueDate?.format('YYYY-MM-DD'),
          recurrence: vals.recurrence || 'ninguna',
          recurrenceEnd: vals.recurrenceEnd?.format('YYYY-MM-DD')
        }) 
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        throw new Error(errorText);
      }
      const created = await res.json(); 
      const first = Array.isArray(created) ? created[0] : created; 
      message.success('Obligación creada'); 
      setObligations(prev => [{ 
        id: String(first.id), 
        providerName: '', 
        projectName: '', 
        typeName: '', 
        description: first.description, 
        amount_original: first.amount_original, 
        currency: first.currency, 
        balance: first.amount_original, 
        status: 'pendiente' 
      }, ...prev]); 
      setSelected(prev => [...prev, String(first.id)]); 
      setAssignAmounts(prev => ({ ...prev, [String(first.id)]: movementAmount })); 
      setCreateModal(false);
    } catch (e: any) { 
      message.error(`Error creando obligación: ${e.message}`); 
      console.error('Error completo:', e);
    }
  };

  return (
    <>
      <Drawer 
        title={`Asociar Obligaciones al Movimiento #${movementId}`} 
        placement="right" 
        width="95%" 
        open={visible} 
        onClose={onClose} 
        bodyStyle={{ padding: 16 }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space direction="vertical" size={0}>
              <Text>Monto movimiento: <strong>${formatNumber(movementAmount)}</strong></Text>
              <Text>Total a asociar: <strong>${formatNumber(totalAssigned)}</strong></Text>
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
                  ? `Faltante: $${formatNumber(remaining)}`
                  : `Exceso: $${formatNumber(Math.abs(remaining))}`}
              </Text>
            </Space>
            <Space>
              <Button onClick={onClose} size="large">
                Cancelar
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleConfirm}
                disabled={selected.length === 0 || totalAssigned === 0 || totalAssigned > movementAmount}
              >
                Confirmar Asociación ({selected.length})
              </Button>
            </Space>
          </div>
        }
      >
        {movement && (
          <>
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
                  <Text type="secondary">Fecha</Text>
                  <div style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {new Date(movement.bank_date).toLocaleDateString('es-CL', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                <div>
                  <Text type="secondary">Monto Movimiento</Text>
                  <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                    ${formatNumber(movementAmount)}
                  </div>
                </div>
                <div>
                  <Text type="secondary">Total Seleccionado</Text>
                  <div style={{ fontSize: 20, fontWeight: 'bold', color: '#1890ff' }}>
                    ${formatNumber(totalAssigned)}
                  </div>
                </div>
                <div>
                  <Text type="secondary">Obligaciones</Text>
                  <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {selected.length}
                  </div>
                </div>
              </Space>
              <div style={{ marginTop: 12 }}>
                <Text type="secondary">Descripción: </Text>
                <Text>{movement.description || '-'}</Text>
              </div>
            </div>

            {/* Buscador */}
            <div style={{ 
              marginBottom: 16, 
              display: 'flex', 
              gap: 12, 
              alignItems: 'center',
              padding: 12,
              background: '#fafafa',
              borderRadius: 6
            }}>
              <Search
                placeholder="Buscar por descripción, proveedor o proyecto..."
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ flex: 1 }}
              />
              <Button type="primary" onClick={() => setCreateModal(true)}>
                + Crear Obligación
              </Button>
            </div>
          </>
        )}

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
                Estas obligaciones tienen el mismo balance que el monto del movimiento (${formatNumber(movementAmount)})
              </Text>
            </div>
            <Table<ObligationRow>
              size="small"
              columns={columns}
              dataSource={recommendations.exactAmount}
              rowKey="id"
              loading={loading}
              pagination={false}
              rowSelection={rowSelection}
              tableLayout="fixed"
            />
          </div>
        )}

        {/* Recomendaciones: Alta coincidencia */}
        {recommendations.highScore.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ 
              background: '#e6f7ff', 
              padding: 12, 
              borderRadius: 6,
              marginBottom: 12,
              border: '2px solid #1890ff'
            }}>
              <Text strong style={{ color: '#0050b3', fontSize: 15 }}>
                💡 Recomendación: Alta Coincidencia ({recommendations.highScore.length})
              </Text>
              <br />
              <Text style={{ color: '#1890ff', fontSize: 13 }}>
                Estas obligaciones tienen similitud en descripción, proveedor o monto
              </Text>
            </div>
            <Table<ObligationRow>
              size="small"
              columns={columns}
              dataSource={recommendations.highScore}
              rowKey="id"
              loading={loading}
              pagination={false}
              rowSelection={rowSelection}
              tableLayout="fixed"
            />
          </div>
        )}

        {/* Tabla principal: Otras obligaciones */}
        <div>
          <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text strong style={{ fontSize: 16 }}>
              Otras Obligaciones Disponibles
            </Text>
            <Text type="secondary">
              Mostrando {recommendations.other.length} obligaciones
            </Text>
          </div>
          <Table<ObligationRow>
            size="small"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={recommendations.other}
            rowKey="id"
            loading={loading}
            pagination={{ 
              pageSize: 15,
              showSizeChanger: true,
              showTotal: (total) => `Total: ${total} obligaciones`
            }}
            tableLayout="fixed"
          />
        </div>
      </Drawer>
      <Modal open={createModal} onCancel={() => setCreateModal(false)} footer={null} width={720} title="Crear Obligación">
        <CreateObligationForm 
          companyId={companyId} 
          onSubmit={async (vals: any) => { await handleCreatedObligation(vals); return { ok: true }; }}
          initialValues={movement ? {
            description: movement.description || undefined,
            amount: movementAmount,
            currency: movement.currency,
            startDate: movement.bank_date
          } : undefined}
        />
      </Modal>
    </>
  );
};
