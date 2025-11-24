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

    // Actualizar solo project_id (la clasificación ahora está en obligaciones)
    const updates = Object.entries(assignments)
      .filter(([_, data]: [string, any]) => data.project_id)
      .map(([id, data]: [string, any]) =>
        prisma.bank_movements.update({
          where: { id: BigInt(id) },
          data: {
            project_id: data.project_id,
          },
        })
      );

    if (updates.length === 0) {
      return res.status(400).json({ error: "No hay asignaciones válidas con proyecto" });
    }

    await Promise.all(updates);

    return res.status(200).json({
      message: `✅ ${updates.length} movimientos actualizados correctamente`,
    });
  } catch (error: any) {
    console.error("❌ Error al guardar asignaciones:", error);

    if (error.code === "P2003") {
      return res.status(400).json({
        error: "Algunos proyectos no existen o no están vinculados correctamente.",
      });
    }

    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
