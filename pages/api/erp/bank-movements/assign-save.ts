// /pages/api/bank-movements/assign-save.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const assignments = req.body;
    if (!assignments || typeof assignments !== "object") {
      return res.status(400).json({ error: "Cuerpo inválido" });
    }

    // 🔹 Validar subcuentas existentes
    const subIds = Array.from(
      new Set(
        Object.values(assignments)
          .map((a: any) => a.sub_account_id)
          .filter((id) => id)
      )
    ) as number[];

    const validSubs = await prisma.sub_accounts.findMany({
      where: { id: { in: subIds } },
      select: { id: true },
    });
    const validSet = new Set(validSubs.map((s) => s.id));

    const updates = Object.entries(assignments)
      .filter(([_, data]: [string, any]) =>
        data.sub_account_id ? validSet.has(Number(data.sub_account_id)) : false
      )
      .map(([id, data]: [string, any]) =>
        prisma.bank_movements.update({
          where: { id: BigInt(id) },
          data: {
            sub_account_id: data.sub_account_id,
          },
        })
      );

    if (updates.length === 0) {
      return res.status(400).json({ error: "No hay asignaciones válidas" });
    }

    await Promise.all(updates);

    return res.status(200).json({
      message: `✅ ${updates.length} movimientos actualizados correctamente`,
    });
  } catch (error: any) {
    console.error("❌ Error al guardar asignaciones:", error);

    if (error.code === "P2003") {
      return res.status(400).json({
        error:
          "Algunas subcuentas no existen o no están vinculadas correctamente.",
      });
    }

    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
