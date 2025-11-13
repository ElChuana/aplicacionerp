// File: pages/movements.tsx
import React from "react";
import useSWR from "swr";
import { MovementsTable } from "../../../components/MovementsTable";
import { Spin, Typography } from "antd";
import { useRouter } from "next/router";

const { Title, Text } = Typography;

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error al cargar movimientos");
  }
  return res.json();
};

const MovementsPage: React.FC = () => {
  const router = useRouter();
  const { query, isReady } = router;

  const companyParam = Array.isArray(query.company)
    ? query.company[0]
    : query.company;
  const bankAccountParam =
    (Array.isArray(query.bank_account_id)
      ? query.bank_account_id[0]
      : query.bank_account_id) ??
    (Array.isArray(query.bank_account)
      ? query.bank_account[0]
      : query.bank_account) ??
    (Array.isArray(query.account)
      ? query.account[0]
      : query.account);

  // Construimos la URL solo cuando el router está listo
  const apiUrl =
    isReady && companyParam
      ? `/api/erp/bank-movements?company=${companyParam}${
          bankAccountParam ? `&bank_account_id=${bankAccountParam}` : ""
        }`
      : null;

  const { data, error } = useSWR<any[]>(apiUrl, fetcher);

  if (error) return (
    <div style={{ padding: '24px 32px' }}>
      <Text type="danger">Error: {error.message}</Text>
    </div>
  );
  
  if (!data) return (
    <div style={{ padding: '24px 32px' }}>
      <Spin tip="Cargando movimientos…" />
    </div>
  );
  
  if (!Array.isArray(data))
    return <Text type="warning">Datos inválidos</Text>;

  return (
    <div className="p-4">
      <div style={{ marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>
          Movimientos Bancarios
        </Title>
      </div>

      <MovementsTable data={data} />
    </div>
  );
};

export default MovementsPage;
