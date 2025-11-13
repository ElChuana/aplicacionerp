import React, { useState, useEffect, useMemo } from "react";
import { Card, Table, Select, Spin, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import useSWR from "swr";
import { useRouter } from "next/router";
import { UploadOutlined, TagsOutlined } from "@ant-design/icons";

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
  subAccountName?: string;
  costCenterName?: string;
  description?: string;
  matched?: boolean;
  balance: number;
  ufValue?: number | null;
  suggestionScore?: number;
  suggestionReason?: string;
}

interface Props {
  data: Movement[];
  loading?: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const MovementsTable: React.FC<Props> = ({ data, loading = false }) => {
  const router = useRouter();
  const { query, isReady } = router;

  const [filterAccount, setFilterAccount] = useState<string | undefined>(undefined);

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
  const tableData = useMemo<Movement[]>(() => {
    if (data.length === 0 || !filterAccount) return [];

    const filtered = data.filter(
      (m) => m.bank_account_id?.toString() === filterAccount
    );

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
      subAccountName: "",
      costCenterName: "",
      description: "Saldo inicial",
      matched: false,
      balance: 0,
      ufValue: null,
    };

    return [...desc, initialRow];
  }, [data, filterAccount]);

  const columns: ColumnsType<Movement> = [
    {
      title: "Fecha",
      dataIndex: "bank_date",
      key: "bank_date",
      width: "10%",
      fixed: "left",
      render: (date) =>
        date === "1900-01-01"
          ? "Saldo inicial"
          : new Date(date).toLocaleDateString("es-CL", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
    },
    { 
      title: "Cuenta", 
      dataIndex: "accountName", 
      key: "accountName", 
      width: "15%",
      ellipsis: true 
    },
    { 
      title: "Proyecto", 
      dataIndex: "projectName", 
      key: "projectName", 
      width: 150,
      ellipsis: true 
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      width: 250,
      ellipsis: true,
      render: (text) => text || "-"
    },
    {
      title: "Abono",
      dataIndex: "debit",
      key: "debit",
      align: "right",
      width: 100,
      render: (val) => (val != null ? val.toLocaleString("es-CL") : "-"),
    },
    {
      title: "Cargo",
      dataIndex: "credit",
      key: "credit",
      align: "right",
      width: 100,
      render: (val) => (val != null ? val.toLocaleString("es-CL") : "-"),
    },
    {
      title: "UF",
      key: "uf",
      align: "right",
      width: 80,
      render: (_text, rec) => {
        const uf = rec.ufValue;
        const amount = (rec.debit ?? 0) || (rec.credit ?? 0);
        if (!uf) return "-";
        const ufAmount = amount / uf;
        return ufAmount.toLocaleString("es-CL", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        });
      },
    },
    {
      title: "Saldo",
      dataIndex: "balance",
      key: "balance",
      align: "right",
      width: 120,
      render: (val) => (val != null ? val.toLocaleString("es-CL") : "-"),
    },
    {
      title: "Centro Costo",
      dataIndex: "costCenterName",
      key: "costCenterName",
      width: 200,
    },
    {
      title: "Subcuenta",
      dataIndex: "subAccountName",
      key: "subAccountName",
      width: 200,
    },
  ];

  if (accountsLoading) return <Spin tip="Cargando cuentas..." />;

  return (
    <Card size="small" style={{ width: '100%' }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          width: '100%'
        }}
      >
        <Select
          placeholder="Seleccionar cuenta"
          style={{ minWidth: 260 }}
          options={accountOptions}
          value={filterAccount}
          onChange={(val) => {
            setFilterAccount(val);
            router.push(
              { pathname: router.pathname, query: { ...query, bank_account_id: val } },
              undefined,
              { shallow: true }
            );
          }}
        />

        <Space>
          <Button
            icon={<UploadOutlined />}
            onClick={() => router.push("/erp/movements/import")}
          >
            Importar
          </Button>
          <Button
            type="primary"
            icon={<TagsOutlined />}
            onClick={() => router.push("/erp/movements/assign")}
          >
            Asignar
          </Button>
        </Space>
      </div>

      <Table<Movement>
        size="small"
        columns={columns}
        dataSource={tableData}
        rowKey="id"
        loading={loading}
        pagination={{ 
          pageSize: 15,
          showSizeChanger: true,
          showTotal: (total) => `Total: ${total} movimientos`
        }}
        scroll={{ x: '100%', y: 'calc(100vh - 280px)' }}
        bordered
        style={{ width: '100%' }}
        onRow={(record) => ({
          style: {
            backgroundColor:
              record.id === "initial"
                ? undefined
                : record.matched === false
                ? "#fff1f0"
                : (record.debit ?? 0) - (record.credit ?? 0) === record.balance
                ? "#f6ffed"
                : "#fffbe6",
          },
        })}
      />
    </Card>
  );
};
