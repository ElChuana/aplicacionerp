import React, { useState, useEffect, useMemo } from "react";
import { Card, Table, Select, Spin, Button, Space, Input, Tooltip, DatePicker } from "antd";
import { MovementObligationsDrawer } from './MovementObligationsDrawer';
import type { ColumnsType } from "antd/es/table";
import useSWR from "swr";
import { useRouter } from "next/router";
import { UploadOutlined, TagsOutlined, LinkOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';

export interface Movement {
  id: string;
  bank_account_id?: number;
  bank_date: string;
  debit: number | null; // Abono
  credit: number | null; // Cargo
  currency: string;
  source: string;
  import_date: string;
  accountName?: string;
  projectName?: string;
  description?: string;
  matched?: boolean;
  matchedAmount?: number; // monto asociado a obligaciones (si aplica)
  balance: number;
  ufValue?: number | null;
  debitUf?: number | null;
  creditUf?: number | null;
  suggestionScore?: number;
  suggestionReason?: string;
}

interface Props {
  data: Movement[];
  loading?: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Formateo estable independiente de Intl para evitar mismatch SSR/CSR
function formatNumberCL(value: number, decimals: number = 0): string {
  if (isNaN(value)) return "-";
  const fixed = value.toFixed(decimals);
  const [intPart, decPart] = fixed.split('.');
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (decPart == null) return withThousands; // sin decimales
  // En formato chileno: decimal con coma
  return `${withThousands},${decPart}`;
}

function formatDateCL(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '-';
  const dd = `${d.getDate()}`.padStart(2, '0');
  const mm = `${d.getMonth() + 1}`.padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export const MovementsTable: React.FC<Props> = ({ data, loading = false }) => {
  const router = useRouter();
  const { query, isReady } = router;

  const [isMounted, setIsMounted] = useState(false);
  const [filterAccount, setFilterAccount] = useState<string | undefined>(undefined);
  const [searchDesc, setSearchDesc] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(100);
  const [drawerMovementId, setDrawerMovementId] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });

  // Evitar problemas de hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const companyIdNum = useMemo(() => {
    const c = Array.isArray(query.company) ? query.company[0] : query.company;
    return c ? Number(c) : NaN;
  }, [query.company]);

  // company desde la URL
  const companyId = useMemo(
    () =>
      (Array.isArray(query.company) ? query.company[0] : query.company) ?? null,
    [query.company]
  );

  // cargar cuentas por empresa
  const { data: accounts, isLoading: accountsLoading } = useSWR(
    companyId ? `/api/erp/bank-accounts?company=${companyId}` : null,
    fetcher
  );

  // SWR para movimientos con filtro descripción
  const movementsEndpoint = useMemo(() => {
    if (!companyId) return null;
    const params = new URLSearchParams();
    params.set("company", String(companyId));
    if (filterAccount) params.set("bank_account_id", filterAccount);
    if (debouncedSearch.length > 1) params.set("description", debouncedSearch);
    return `/api/erp/bank-movements?${params.toString()}`;
  }, [companyId, filterAccount, debouncedSearch]);

  const { data: movementsRemote, isLoading: movementsLoading } = useSWR(movementsEndpoint, fetcher);

  type AccountOption = { label: string; value: string };
  const accountOptions: AccountOption[] = useMemo(
    () =>
      accounts?.map((a: { id: number | string; bank_name: string; account_no: string; currency: string }) => ({
        label: `${a.bank_name} ${a.account_no} (${a.currency})`,
        value: a.id.toString(),
      })) || [],
    [accounts]
  );

  // Inicializar filtro: respetar URL si viene; si no, setear primera cuenta cuando router y cuentas estén listos
  useEffect(() => {
    if (!isReady || accountOptions.length === 0) return;

    const urlAccount =
      (Array.isArray(query.bank_account_id)
        ? query.bank_account_id[0]
        : query.bank_account_id) ??
      (Array.isArray(query.bank_account)
        ? query.bank_account[0]
        : query.bank_account) ??
      (Array.isArray(query.account) ? query.account[0] : query.account);

    if (urlAccount && accountOptions.some((o) => o.value === urlAccount)) {
      setFilterAccount(urlAccount);
    } else if (!urlAccount) {
      const first = accountOptions[0].value;
      setFilterAccount(first);
      router.replace(
        { pathname: router.pathname, query: { ...query, bank_account_id: first } },
        undefined,
        { shallow: true }
      );
    }
  }, [isReady, accountOptions, query, router]);

  // Filtrar por cuenta y recalcular saldo (abono=debit, cargo=credit)
  // Debounce de searchDesc
  useEffect(() => {
    const h = setTimeout(() => setDebouncedSearch(searchDesc.trim()), 400);
    return () => clearTimeout(h);
  }, [searchDesc]);

  // Usar movimientos provenientes del endpoint remoto si existen; fallback al prop data
  const sourceData: Movement[] = movementsRemote || data || [];

  const tableData = useMemo<Movement[]>(() => {
    if (!filterAccount) return [];

    let filtered = sourceData.filter(
      (m) => m.bank_account_id?.toString() === filterAccount
    );

    // 🔍 Debug: verificar si los datos del API incluyen UF
    if (filtered.length > 0 && process.env.NODE_ENV !== 'production') {
      const sample = filtered[0];
      console.log('[MovementsTable] Sample movement:', {
        id: sample.id,
        date: sample.bank_date,
        debit: sample.debit,
        credit: sample.credit,
        ufValue: sample.ufValue,
        debitUf: sample.debitUf,
        creditUf: sample.creditUf,
      });
    }

    // Aplicar filtro de fechas si está definido
    if (dateRange.from && dateRange.to) {
      const fromTime = dateRange.from.getTime();
      const toTime = dateRange.to.getTime();
      filtered = filtered.filter((m) => {
        const movDate = new Date(m.bank_date).getTime();
        return movDate >= fromTime && movDate <= toTime;
      });
    }

    const asc = [...filtered].sort(
      (a, b) => new Date(a.bank_date).getTime() - new Date(b.bank_date).getTime()
    );

    let running = 0;
    const withBalanceAsc = asc.map((m) => {
      const debit = m.debit ?? 0;
      const credit = m.credit ?? 0;
      running += debit - credit; // ✅ abono suma, cargo resta
      return { ...m, balance: running };
    });

    const desc = withBalanceAsc.reverse();

    const initialRow: Movement = {
      id: "initial",
      bank_date: "1900-01-01",
      debit: null,
      credit: null,
      currency: "",
      source: "",
      import_date: "",
      accountName: "",
      projectName: "",
      description: "Saldo inicial",
      matched: false,
      balance: 0,
      ufValue: null,
      debitUf: null,
      creditUf: null,
    };

    return [...desc, initialRow];
  }, [sourceData, filterAccount, dateRange]);

  const columns: ColumnsType<Movement> = [
    {
      title: "Fecha",
      dataIndex: "bank_date",
      key: "bank_date",
      width: 110,
      fixed: "left",
      render: (date: string) =>
        date === "1900-01-01"
          ? "Saldo inicial"
          : formatDateCL(date),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      render: (text: string | undefined, rec) => {
        const t = text || (rec.id === "initial" ? "Saldo inicial" : "-");
        return (
          <span style={{ whiteSpace: "normal", wordBreak: "break-word" }}>{t}</span>
        );
      },
    },
    {
      title: "Abono",
      dataIndex: "debit",
      key: "debit",
      align: "right",
      width: 110,
      render: (val: number | null, rec) =>
        rec.id === "initial"
          ? "-"
          : val != null
          ? <span style={{ color: val > 0 ? '#15803d' : undefined }}>{formatNumberCL(val)}</span>
          : "-",
    },
    {
      title: "Cargo",
      dataIndex: "credit",
      key: "credit",
      align: "right",
      width: 110,
      render: (val: number | null, rec) =>
        rec.id === "initial"
          ? "-"
          : val != null
          ? <span style={{ color: val > 0 ? '#b91c1c' : undefined }}>{formatNumberCL(val)}</span>
          : "-",
    },
    {
      title: "UF",
      key: "uf",
      align: "right",
      width: 90,
      render: (_text, rec) => {
        if (rec.id === "initial") return "-";
        // Preferir cálculo precalculado desde API (debitUf/creditUf)
        const ufAmount = rec.debitUf ?? rec.creditUf ?? null;
        if (ufAmount == null || isNaN(ufAmount)) return "-";
        return formatNumberCL(ufAmount, 2);
      },
    },
    {
      title: "Saldo",
      dataIndex: "balance",
      key: "balance",
      align: "right",
      width: 130,
      render: (val: number, rec) =>
        rec.id === "initial" ? "-" : val != null ? formatNumberCL(val) : "-",
    },
    {
      title: 'Acciones',
      key: 'actions',
      fixed: 'right',
      width: 100,
      align: 'center',
      render: (_: any, rec) => rec.id === 'initial' ? null : (
        <Tooltip title="Asociar a obligaciones">
          <Button 
            type="default"
            size="small"
            icon={<LinkOutlined />} 
            onClick={() => setDrawerMovementId(Number(rec.id))}
            style={{
              borderRadius: 16,
              border: '1px solid #d9d9d9',
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)';
              e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          />
        </Tooltip>
      )
    }
  ];

  if (accountsLoading) return <Spin tip="Cargando cuentas..." />;
  return (
    <>
      <Card size="small" style={{ width: "100%" }}>
        <Space wrap style={{ marginBottom: 12, width: "100%", justifyContent: "space-between" }}>
          <Space wrap>
            <Select
              placeholder="Cuenta"
              style={{ minWidth: 240 }}
              loading={accountsLoading}
              value={filterAccount}
              options={accountOptions}
              onChange={(v) => {
                setFilterAccount(v);
                router.push(
                  { pathname: router.pathname, query: { ...query, bank_account_id: v } },
                  undefined,
                  { shallow: true }
                );
              }}
            />
            <Input.Search
              allowClear
              placeholder="Buscar descripción (mínimo 2 caracteres)"
              value={searchDesc}
              onChange={(e) => setSearchDesc(e.target.value)}
              style={{ minWidth: 320 }}
            />
            {isMounted && (
              <>
                <DatePicker
                  placeholder="Fecha desde"
                  value={dateRange.from ? dayjs(dateRange.from) : null}
                  onChange={(date) => {
                    setDateRange({ ...dateRange, from: date ? date.toDate() : null });
                  }}
                  format="DD/MM/YYYY"
                  allowClear
                />
                <DatePicker
                  placeholder="Fecha hasta"
                  value={dateRange.to ? dayjs(dateRange.to) : null}
                  onChange={(date) => {
                    setDateRange({ ...dateRange, to: date ? date.toDate() : null });
                  }}
                  format="DD/MM/YYYY"
                  allowClear
                />
              </>
            )}
            <Select
              value={pageSize}
              style={{ width: 120 }}
              onChange={(v) => setPageSize(v)}
              options={[10,20,50,100,200].map(n => ({ value: n, label: `${formatNumberCL(n, 0)} por página` }))}
            />
          </Space>
          <Space>
            <Button
              icon={<UploadOutlined />}
              onClick={() => router.push({
                pathname: "/erp/movements/import",
                query: { company: companyId }
              })}
            >
              Importar
            </Button>
            <Button
              type="primary"
              icon={<TagsOutlined />}
              onClick={() => router.push({
                pathname: "/erp/movements/assign",
                query: { company: companyId }
              })}
            >
              Asignar
            </Button>
          </Space>
        </Space>
        <Spin spinning={loading || movementsLoading}>
          <Table
            size="small"
            dataSource={tableData}
            columns={columns}
            rowKey={(r) => r.id}
            onRow={(rec) => {
              const amount = (rec.debit ?? rec.credit ?? 0) || 0;
              const matchedAmt = rec.matchedAmount || 0;
              let background = '#f1f5f9';
              if (rec.id !== 'initial') {
                if (matchedAmt === 0) background = '#fef2f2';
                else {
                  const fullThreshold = amount * 0.999;
                  if (matchedAmt >= fullThreshold && matchedAmt >= amount - 0.5) background = '#ecfdf5';
                  else background = '#fefce8';
                }
              }
              return { style: { backgroundColor: background, transition: 'background-color 0.25s' } };
            }}
            pagination={{ pageSize, showSizeChanger: false }}
            scroll={{ x: "max-content", y: 600 }}
          />
          <div style={{ marginTop: 8, fontSize: 12, display: 'flex', gap: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 16, height: 16, background: '#fef2f2', border: '1px solid #fca5a5' }} /> Sin asociación
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 16, height: 16, background: '#fefce8', border: '1px solid #fde047' }} /> Parcial
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 16, height: 16, background: '#ecfdf5', border: '1px solid #6ee7b7' }} /> Completo
            </span>
          </div>
        </Spin>
      </Card>
      {drawerMovementId != null && !isNaN(companyIdNum) && (
        <MovementObligationsDrawer
          movementId={drawerMovementId!}
          companyId={companyIdNum}
          visible={drawerMovementId != null}
          onClose={() => setDrawerMovementId(null)}
          onAssociated={() => {
            // potencial mutate(movementsEndpoint) si se desea refrescar
          }}
        />
      )}
    </>
  );

};
