-- =============================================================
-- SCRIPT: Unificar proveedor duplicado Plan OK
-- Fecha: 20-11-2025
-- Objetivo: Consolidar registros de obligaciones bajo provider_id = 1 y eliminar provider_id = 12 si queda sin uso.
-- =============================================================
BEGIN;

-- 1. Mover obligaciones del proveedor duplicado (ID 12) al principal (ID 1)
UPDATE obligations SET provider_id = 1 WHERE provider_id = 12;

-- 2. (Opcional) Copiar valores faltantes del registro secundario (ejemplo: rut si el principal no lo tiene)
-- UPDATE providers p1 SET rut = p2.rut FROM providers p2 WHERE p1.id = 1 AND p2.id = 12 AND (p1.rut IS NULL OR p1.rut = '') AND p2.rut IS NOT NULL;

-- 3. Eliminar el proveedor duplicado sólo si ya no tiene obligaciones
DELETE FROM providers WHERE id = 12 AND NOT EXISTS (SELECT 1 FROM obligations WHERE provider_id = 12);

COMMIT;

-- Verificaciones recomendadas posteriores:
-- SELECT id, name, rut FROM providers WHERE id IN (1,12);
-- SELECT provider_id, COUNT(*) FROM obligations WHERE provider_id IN (1,12) GROUP BY provider_id;
-- =============================================================
