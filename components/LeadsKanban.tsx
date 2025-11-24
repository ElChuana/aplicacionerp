import React, { useMemo } from 'react';
import useSWR from 'swr';
import { Spin, Card, Typography, Tag, Empty, message } from 'antd';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

const { Text } = Typography;

export const LEAD_STATUSES: string[] = [
  'INGRESADO',
  'LLAMADO',
  'SEGUIMIENTO',
  'NEGOCIANDO',
  'DESCARTADO',
  'CONVERTIDO'
];

interface LeadDto {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  source?: string | null;
  status: string;
  notes?: string | null;
  budget_clp?: number | null;
  budget_uf?: number | null;
  created_at: string;
}

const fetcher = (url: string) => fetch(url).then(r => { if(!r.ok) throw new Error(r.statusText); return r.json(); });

interface Props { companyId?: number | null; }

export const LeadsKanban: React.FC<Props> = ({ companyId }) => {
  const { data, error, mutate } = useSWR<LeadDto[]>(`/api/crm/leads${companyId ? `?company=${companyId}` : ''}`, fetcher);

  const grouped = useMemo(() => {
    const map: Record<string, LeadDto[]> = {};
    LEAD_STATUSES.forEach(s => { map[s] = []; });
    (data || []).forEach(l => { if(!map[l.status]) map[l.status] = []; map[l.status].push(l); });
    return map;
  }, [data]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const destStatus = destination.droppableId;
    const srcStatus = source.droppableId;
    if (destStatus === srcStatus) return; // no change

    try {
      // Optimistic update
      mutate(prev => {
        if(!prev) return prev;
        return prev.map(l => l.id === draggableId ? { ...l, status: destStatus } : l);
      }, false);
      const res = await fetch(`/api/crm/leads/${draggableId}/status`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: destStatus })
      });
      if (!res.ok) throw new Error(await res.text());
      mutate();
      message.success('Status actualizado');
    } catch (e:any) {
      message.error('Error al actualizar status');
      mutate(); // revert by revalidating
    }
  };

  if (error) return <Text type="danger">Error al cargar leads</Text>;
  if (!data) return <Spin />;

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', gap: 16, minWidth: LEAD_STATUSES.length * 280 }}>
          {LEAD_STATUSES.map(status => (
            <Droppable droppableId={status} key={status}>
              {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: snapshot.isDraggingOver ? '#e6f7ff' : '#fafafa',
                    border: '1px solid #d9d9d9',
                    borderRadius: 8,
                    padding: 12,
                    width: 260,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: 'calc(100vh - 220px)'
                  }}
                >
                  <Text strong style={{ marginBottom: 8 }}>{status}</Text>
                  <div style={{ overflowY: 'auto' }}>
                    {grouped[status].length === 0 && <Empty description="" image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                    {grouped[status].map((lead, idx) => (
                      <Draggable draggableId={lead.id} index={idx} key={lead.id}>
                        {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            style={{
                              userSelect: 'none',
                              marginBottom: 8,
                              ...dragProvided.draggableProps.style
                            }}
                          >
                            <Card size="small" hoverable style={{ border: dragSnapshot.isDragging ? '2px dashed #1890ff' : undefined }}>
                              <Text strong>{lead.name}</Text>
                              <br />
                              {lead.email && <Text type="secondary" style={{ fontSize: 12 }}>{lead.email}</Text>}
                              {lead.phone && <Text style={{ fontSize: 12, display: 'block' }}>{lead.phone}</Text>}
                              {lead.budget_clp != null && (
                                <Tag color="blue" style={{ marginTop: 4 }}>
                                  $ {Math.round(lead.budget_clp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                </Tag>
                              )}
                              {lead.budget_uf != null && (
                                <Tag color="purple" style={{ marginTop: 4 }}>
                                  UF {lead.budget_uf.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Tag>
                              )}
                              {lead.source && <Tag style={{ marginTop: 4 }} color="geekblue">{lead.source}</Tag>}
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
