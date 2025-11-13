import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  Select,
  Button,
  Tag,
  message,
  Space,
  Popconfirm,
  Progress,
} from "antd";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
// import { useRouter } from "next/router";

const AssignMovements = () => {
  // const router = useRouter();
  const companyId: number | null = 1;
  const [accountId, setAccountId] = useState<number | null>(null);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [assignments, setAssignments] = useState<Record<string, any>>({});
  const [subAccountsByCenter, setSubAccountsByCenter] = useState<Record<number, any[]>>({});
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [descFilter, setDescFilter] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const suggestingRef = useRef(false);

  // Debug: ver cambios en assignments
  useEffect(() => {
    console.log('🔄 Estado assignments actualizado:', assignments);
  }, [assignments]);

  // Debug: ver cambios en subAccountsByCenter
  useEffect(() => {
    console.log('🔄 Estado subAccountsByCenter actualizado:', subAccountsByCenter);
  }, [subAccountsByCenter]);

  // const { data: companies } = useSWR("/api/companies", fetcher);
  const { data: accounts } = useSWR(
    companyId ? `/api/erp/bank-accounts?company=${companyId}` : null,
    fetcher
  );
  const { data: costCenters } = useSWR("/api/erp/cost-centers/simple", fetcher);
  const { data: projects } = useSWR(
    companyId ? `/api/erp/projects?company=${companyId}` : null,
    fetcher
  );
  const { data: movimientos, mutate } = useSWR(
    companyId
      ? accountId
        ? `/api/erp/bank-movements/unassigned?account=${accountId}`
        : `/api/erp/bank-movements/unassigned?company=${companyId}`
      : null,
    fetcher
  );

  const formatDate = (v: any) => {
    if (!v) return "—";
    const d = new Date(v);
    return isNaN(d.getTime()) ? v : d.toLocaleDateString("es-CL");
  };

  const loadSubAccounts = async (costCenterId: number) => {
    console.log('🔍 loadSubAccounts llamado para centro:', costCenterId);
    if (subAccountsByCenter[costCenterId]) {
      console.log('   ✅ Ya en caché:', subAccountsByCenter[costCenterId].length, 'subcuentas');
      return subAccountsByCenter[costCenterId];
    }
    console.log('   🌐 Fetching desde API...');
    const res = await fetch(`/api/erp/sub-accounts?cost_center_id=${costCenterId}`);
    const data = await res.json();
    console.log('   📦 Recibidas:', data.length, 'subcuentas:', data);
    setSubAccountsByCenter((prev) => {
      const updated = { ...prev, [costCenterId]: data };
      console.log('   💾 Actualizado subAccountsByCenter:', updated);
      return updated;
    });
    return data;
  };

  const handleChange = (id: string, field: string, value: number | null) => {
    setAssignments((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));

    if (field === "cost_center_id" && value) {
      loadSubAccounts(value);
      setAssignments((prev) => ({
        ...prev,
        [id]: { ...prev[id], cost_center_id: value, sub_account_id: null },
      }));
    }
  };

  const handleSaveOne = async (id: string) => {
    const data = assignments[id];
    if (!data?.cost_center_id || !data?.sub_account_id) {
      message.warning("Selecciona centro de costo y subcuenta antes de guardar");
      return;
    }

    try {
      const res = await fetch("/api/erp/bank-movements/assign-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [id]: data }),
      });
      if (!res.ok) throw new Error("Error al guardar");
      message.success("✅ Movimiento guardado correctamente");
      mutate();
    } catch (err) {
      console.error(err);
      message.error("Error al guardar movimiento");
    }
  };

  // ✅ Loop IA
  // ✅ Loop IA - actualiza en tiempo real por movimiento
  const processSuggestions = async () => {
    if (!movimientos || movimientos.length === 0) {
      message.info("No hay movimientos para sugerir");
      return;
    }

    suggestingRef.current = true;
    setIsSuggesting(true);
    setProgress({ done: 0, total: movimientos.length });

    let applied = 0;

    for (let i = 0; i < movimientos.length; i++) {
      if (!suggestingRef.current) break;

      const mov = movimientos[i];
      const desc = mov.descripcion || mov.description;
      if (!desc) {
        setProgress({ done: i + 1, total: movimientos.length });
        continue;
      }

      try {
        const url = `/api/erp/bank-movements/suggestions-ia?description=${encodeURIComponent(desc)}`;
        const suggRes = await fetch(url);

        if (suggRes.ok) {
          const data = await suggRes.json();
          if (data.sugerencia && data.sugerencia.cost_center_id && data.sugerencia.sub_account_id) {
            const movId = String(mov.id);
            const ccId = data.sugerencia.cost_center_id as number;
            const subId = data.sugerencia.sub_account_id as number;

            // Asegurar subcuentas cargadas para ese centro antes de setear
            await loadSubAccounts(ccId);

            // Aplicar inmediatamente esta asignación (UI en tiempo real)
            setAssignments((prev) => ({
              ...prev,
              [movId]: { cost_center_id: ccId, sub_account_id: subId },
            }));

            applied += 1;
          }
        }
      } catch (err) {
        console.error("❌ Error en sugerencias IA:", err);
      }

      setProgress({ done: i + 1, total: movimientos.length });
      // Pequeño respiro para permitir render entre iteraciones
      await new Promise((res) => setTimeout(res, 150));
    }

    message.success(`✅ ${applied.toLocaleString('es-CL')} sugerencias aplicadas`);
    suggestingRef.current = false;
    setIsSuggesting(false);
  };

  const toggleSuggestions = () => {
    if (suggestingRef.current) {
      suggestingRef.current = false;
      setIsSuggesting(false);
      message.info("⏸️ Sugerencias pausadas");
    } else {
      processSuggestions();
    }
  };

  const columns = [
    {
      title: "Proyecto",
      render: (_: any, r: any) => {
        const movId = String(r.id);
        const value = assignments[movId]?.project_id || null;
        return (
          <Select
            style={{ width: 200 }}
            placeholder="Seleccionar proyecto"
            value={value}
            onChange={(v) => handleChange(movId, "project_id", v)}
            options={projects?.map((p: any) => ({ label: p.name, value: p.id })) || []}
          />
        );
      },
    },
    {
      title: "Fecha",
      render: (r: any) => formatDate(r.fecha || r.bank_date),
    },
    {
      title: "Descripción",
      render: (r: any) => r.descripcion || r.description || "—",
    },
    {
      title: "Abono (CLP)",
      align: "right" as const,
      render: (r: any) => {
        const abono = Number(r.credit ?? r.abono ?? 0);
        return abono > 0 ? (
          <span style={{ color: "green", fontWeight: 600 }}>
            +{abono.toLocaleString("es-CL")}
          </span>
        ) : (
          "—"
        );
      },
    },
    {
      title: "Cargo (CLP)",
      align: "right" as const,
      render: (r: any) => {
        const cargo = Number(r.debit ?? r.cargo ?? 0);
        return cargo > 0 ? (
          <span style={{ color: "red", fontWeight: 600 }}>
            −{cargo.toLocaleString("es-CL")}
          </span>
        ) : (
          "—"
        );
      },
    },
    {
      title: "Centro de Costo",
      render: (_: any, r: any) => {
        const movId = String(r.id);
        const value = assignments[movId]?.cost_center_id || null;
        console.log(`🎯 Render Centro Costo - MovID: ${movId}, Value: ${value}, Assignments:`, assignments[movId]);
        return (
          <Select
            style={{ width: 200 }}
            placeholder="Seleccionar"
            value={value}
            onChange={(v) => handleChange(movId, "cost_center_id", v)}
            options={
              costCenters?.map((c: any) => ({ label: c.name, value: c.id })) || []
            }
          />
        );
      },
    },
    {
      title: "Subcuenta",
      render: (_: any, r: any) => {
        const movId = String(r.id);
        const ccId = assignments[movId]?.cost_center_id;
        const subAccs = ccId ? subAccountsByCenter[ccId] || [] : [];
        const value = assignments[movId]?.sub_account_id || null;
        console.log(`🎯 Render Subcuenta - MovID: ${movId}, CcID: ${ccId}, Value: ${value}, SubAccs:`, subAccs.length);
        return (
          <Select
            style={{ width: 200 }}
            placeholder={ccId ? "Seleccionar subcuenta" : "Primero el centro"}
            value={value}
            onChange={(v) => handleChange(movId, "sub_account_id", v)}
            options={subAccs.map((s) => ({ label: s.name, value: s.id }))}
          />
        );
      },
    },
    {
      title: "Sugerencia IA",
      render: (_: any, r: any) => {
        const movId = String(r.id);
        const sug = assignments[movId];
        if (!sug?.sub_account_id)
          return <Tag color="default">Sin sugerencia</Tag>;
        const ccName =
          costCenters?.find((c: any) => c.id === sug.cost_center_id)?.name || "";
        const subName =
          subAccountsByCenter[sug.cost_center_id]?.find(
            (s) => s.id === sug.sub_account_id
          )?.name || "";
        return (
          <Tag color="blue">
            {subName} {ccName ? `(${ccName})` : ""}
          </Tag>
        );
      },
    },
    {
      title: "Acción",
      key: "accion",
      render: (_: any, r: any) => {
        const movId = String(r.id);
        return (
          <Popconfirm
            title="¿Guardar este movimiento?"
            onConfirm={() => handleSaveOne(movId)}
            okText="Sí"
            cancelText="No"
          >
            <Button icon={<SaveOutlined />} type="primary" size="small">
              Guardar
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
  <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">
        Asignar movimientos bancarios
      </h2>

      <Space className="mb-6" wrap>
        <Select
          placeholder="Filtrar proyecto"
          style={{ width: 220 }}
          value={projectId || undefined}
          onChange={v => setProjectId(v)}
          options={projects?.map((p: any) => ({ label: p.name, value: p.id })) || []}
          disabled={isSuggesting}
        />
        <Select
          placeholder="Filtrar cuenta bancaria"
          style={{ width: 240 }}
          value={accountId || undefined}
          onChange={(v) => setAccountId(v)}
          options={accounts?.map((a: any) => ({ label: `${a.bank_name} - ${a.account_no}`, value: a.id })) || []}
          disabled={isSuggesting}
        />
        <input
          type="text"
          placeholder="Filtrar por descripción"
          value={descFilter}
          onChange={e => setDescFilter(e.target.value)}
          style={{ width: 400, padding: 8, borderRadius: 6, border: '1px solid #d9d9d9' }}
          disabled={isSuggesting}
        />
        <Button
          onClick={() => {
            // Selecciona todos los movimientos filtrados por proyecto, cuenta y descripción
            const allFiltered = (movimientos || []).filter((mov: any) => {
              const desc = mov.descripcion || mov.description || "";
              const matchDesc = desc.toLowerCase().includes(descFilter.toLowerCase());
              const matchProject = projectId ? mov.project_id === projectId : true;
              const matchAccount = accountId ? mov.account_id === accountId : true;
              return matchDesc && matchProject && matchAccount;
            }).map((mov: any) => String(mov.id));
            setSelectedRowKeys(allFiltered);
            message.info(`Seleccionaste ${allFiltered.length.toLocaleString('es-CL')} movimientos filtrados`);
          }}
          disabled={isSuggesting}
  >Seleccionar todos</Button>
        <Button
          onClick={() => setSelectedRowKeys([])}
          disabled={isSuggesting || selectedRowKeys.length === 0}
        >Deseleccionar</Button>
        {selectedRowKeys.length > 0 && (
          <Tag color="blue">
            {selectedRowKeys.length.toLocaleString('es-CL')} seleccionados
          </Tag>
        )}
        <Button
          type={isSuggesting ? "default" : "primary"}
          icon={isSuggesting ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          onClick={toggleSuggestions}
        >
          {isSuggesting ? "Pausar sugerencias IA" : "Activar sugerencias IA"}
        </Button>
      </Space>

      {selectedRowKeys.length > 0 && (
        <Space className="mb-6" wrap>
          <Select
            placeholder="Proyecto para seleccionados"
            style={{ width: 220 }}
            value={null}
            onChange={(projectId: number | null) => {
              if (projectId === null) return;
              setAssignments((prev) => {
                const updated = { ...prev };
                selectedRowKeys.forEach((id) => {
                  const strId = String(id);
                  updated[strId] = { ...updated[strId], project_id: projectId };
                });
                return updated;
              });
            }}
            options={projects?.map((p: any) => ({ label: p.name, value: p.id })) || []}
            disabled={isSuggesting}
          />
          <Select
            placeholder="Centro de costos para seleccionados"
            style={{ width: 220 }}
            value={null}
            onChange={async (ccId: number | null) => {
              if (ccId === null) return;
              await loadSubAccounts(ccId);
              setAssignments((prev) => {
                const updated = { ...prev };
                selectedRowKeys.forEach((id) => {
                  const strId = String(id);
                  updated[strId] = { ...updated[strId], cost_center_id: ccId, sub_account_id: null };
                });
                return updated;
              });
            }}
            options={costCenters?.map((c: any) => ({ label: c.name, value: c.id })) || []}
            disabled={isSuggesting}
          />
          <Select
            placeholder="Subcuenta para seleccionados"
            style={{ width: 220 }}
            value={null}
            onChange={(subId: number | null) => {
              setAssignments((prev) => {
                const updated = { ...prev };
                selectedRowKeys.forEach((id) => {
                  const strId = String(id);
                  updated[strId] = { ...updated[strId], sub_account_id: subId };
                });
                return updated;
              });
            }}
            options={(() => {
              // Si todos los seleccionados tienen el mismo centro de costo, mostrar sus subcuentas
              const ccIds = selectedRowKeys.map(id => assignments[String(id)]?.cost_center_id).filter(Boolean);
              const uniqueCc = Array.from(new Set(ccIds));
              if (uniqueCc.length === 1 && subAccountsByCenter[uniqueCc[0]]) {
                return subAccountsByCenter[uniqueCc[0]].map((s: any) => ({ label: s.name, value: s.id }));
              }
              return [];
            })()}
            disabled={isSuggesting}
          />
          <Button
            type="primary"
            icon={<SaveOutlined />}
            disabled={selectedRowKeys.length === 0 || isSuggesting}
            onClick={async () => {
              // Guardar todos los seleccionados
              const toSave: Record<string, any> = {};
              selectedRowKeys.forEach((id) => {
                const strId = String(id);
                const data = assignments[strId];
                if (data?.cost_center_id && data?.sub_account_id) {
                  toSave[strId] = data;
                }
              });
              if (Object.keys(toSave).length === 0) {
                message.warning("Selecciona centro de costo y subcuenta para todos antes de guardar");
                return;
              }
              try {
                const res = await fetch("/api/erp/bank-movements/assign-save", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(toSave),
                });
                if (!res.ok) throw new Error("Error al guardar");
                message.success(`✅ Guardados ${Object.keys(toSave).length.toLocaleString('es-CL')} movimientos`);
                mutate();
              } catch (err) {
                console.error(err);
                message.error("Error al guardar movimientos");
              }
            }}
          >Guardar seleccionados</Button>
        </Space>
      )}

      {progress.total > 0 && (
        <Progress
          percent={Math.round((progress.done / progress.total) * 100)}
          size="small"
          status={suggestingRef.current ? "active" : "normal"}
    className="mb-6"
        />
      )}

      <Table
        rowKey={(r: any) => String(r.id)}
        columns={columns}
        dataSource={(movimientos || []).filter((mov: any) => {
          const desc = mov.descripcion || mov.description || "";
          const matchDesc = desc.toLowerCase().includes(descFilter.toLowerCase());
          const matchProject = projectId ? mov.project_id === projectId : true;
          const matchAccount = accountId ? mov.account_id === accountId : true;
          return matchDesc && matchProject && matchAccount;
        })}
        pagination={{ pageSize: 15 }}
        loading={!movimientos}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
          preserveSelectedRowKeys: true,
        }}
        className="mt-4"
      />
    </div>
  );
};

export default AssignMovements;
