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
  Input,
} from "antd";
import {
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
  const [descFilter, setDescFilter] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // const { data: companies } = useSWR("/api/companies", fetcher);
  const { data: accounts } = useSWR(
    companyId ? `/api/erp/bank-accounts?company=${companyId}` : null,
    fetcher
  );
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

  const handleChange = (id: string, field: string, value: number | null) => {
    setAssignments((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSaveOne = async (id: string) => {
    const data = assignments[id];
    if (!data?.project_id) {
      message.warning("Selecciona un proyecto antes de guardar");
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
        />
        <Select
          placeholder="Filtrar cuenta bancaria"
          style={{ width: 240 }}
          value={accountId || undefined}
          onChange={(v) => setAccountId(v)}
          options={accounts?.map((a: any) => ({ label: `${a.bank_name} - ${a.account_no}`, value: a.id })) || []}
        />
        <Input.Search
          placeholder="Buscar por descripción..."
          allowClear
          value={descFilter}
          onChange={e => setDescFilter(e.target.value)}
          style={{ width: 400 }}
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
  >Seleccionar todos</Button>
        <Button
          onClick={() => setSelectedRowKeys([])}
          disabled={selectedRowKeys.length === 0}
        >Deseleccionar</Button>
        {selectedRowKeys.length > 0 && (
          <Tag color="blue">
            {selectedRowKeys.length.toLocaleString('es-CL')} seleccionados
          </Tag>
        )}
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
          />
          <Button
            type="primary"
            icon={<SaveOutlined />}
            disabled={selectedRowKeys.length === 0}
            onClick={async () => {
              // Guardar todos los seleccionados
              const toSave: Record<string, any> = {};
              selectedRowKeys.forEach((id) => {
                const strId = String(id);
                const data = assignments[strId];
                if (data?.project_id) {
                  toSave[strId] = data;
                }
              });
              if (Object.keys(toSave).length === 0) {
                message.warning("Selecciona un proyecto para todos antes de guardar");
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
