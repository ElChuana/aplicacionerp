-- =============================================================
-- SCRIPT: Aplicar cambios de clasificación de proveedores
-- Fecha generación: 20-11-2025
-- NOTA: Números en comentarios usan separador de miles (p.ej. 1.000) para legibilidad.
--       Dentro de SQL se usan literales numéricos sin separador por sintaxis.
-- =============================================================
-- Acciones:
-- 1. Merge subcuentas duplicadas "Comisión venta variable" (mantener ID 64, migrar 119)
-- 2. Crear subcuenta "Seguridad" (cost_center_id = 5) si no existe
-- 3. Crear subcuenta "Postventa" (cost_center_id = 11) si no existe
-- 4. Re-clasificar obligaciones de proveedores específicos según solicitudes
-- 5. (Opcional) Unificar proveedor duplicado Plan OK (IDs 1 y 12) [comentado]
-- =============================================================
-- PROVEEDORES OBJETIVO:
-- Capacitaciones Luis Felipe (provider_id = 3) -> Gastos de Ventas / Comisión venta variable
-- Kleber Home (provider_id = 9) -> Administración / Gerenciamiento
-- S Y C Construcciones (provider_id = 6) -> Costo Construcción / Postventa
-- Tepille SPA (provider_id = 13) -> Administración / Seguridad
-- =============================================================
BEGIN;

-- 1. Merge subcuentas duplicadas Comisión venta variable (mantener 64)
UPDATE obligations SET sub_account_id = 64 WHERE sub_account_id = 119;
-- (Opcional) Eliminar la subcuenta antigua si no tiene obligaciones
-- DELETE FROM sub_accounts WHERE id = 119 AND NOT EXISTS (SELECT 1 FROM obligations WHERE sub_account_id = 119);

-- 2, 3 y 4. Crear subcuentas nuevas si no existen (Seguridad, Postventa, Gastos Bancarios)
DO $$
DECLARE v_seguridad_id INT; 
DECLARE v_postventa_id INT; 
DECLARE v_gastos_bancarios_id INT; 
BEGIN
  SELECT id INTO v_seguridad_id FROM sub_accounts WHERE cost_center_id = 5 AND code = 'seguridad';
  IF v_seguridad_id IS NULL THEN
    INSERT INTO sub_accounts(cost_center_id, code, name) VALUES (5, 'seguridad', 'Seguridad') RETURNING id INTO v_seguridad_id;
  END IF;

  SELECT id INTO v_postventa_id FROM sub_accounts WHERE cost_center_id = 11 AND code = 'postventa';
  IF v_postventa_id IS NULL THEN
    INSERT INTO sub_accounts(cost_center_id, code, name) VALUES (11, 'postventa', 'Postventa') RETURNING id INTO v_postventa_id;
  END IF;

  SELECT id INTO v_gastos_bancarios_id FROM sub_accounts WHERE cost_center_id = 5 AND code = 'gastos_bancarios';
  IF v_gastos_bancarios_id IS NULL THEN
    INSERT INTO sub_accounts(cost_center_id, code, name) VALUES (5, 'gastos_bancarios', 'Gastos Bancarios') RETURNING id INTO v_gastos_bancarios_id;
  END IF;

  RAISE NOTICE 'Subcuenta Seguridad ID: %', v_seguridad_id;
  RAISE NOTICE 'Subcuenta Postventa ID: %', v_postventa_id;
  RAISE NOTICE 'Subcuenta Gastos Bancarios ID: %', v_gastos_bancarios_id;

  -- 4. Re-clasificaciones de obligaciones
  -- Capacitaciones Luis Felipe -> Gastos de Ventas (8) / Comisión venta variable (64)
  UPDATE obligations SET cost_center_id = 8, sub_account_id = 64 WHERE provider_id = 3;

  -- Kleber Home -> Administración (5) / Gerenciamiento (39)
  UPDATE obligations SET cost_center_id = 5, sub_account_id = 39 WHERE provider_id = 9;

  -- S Y C Construcciones -> Costo Construcción (11) / Postventa (v_postventa_id)
  UPDATE obligations SET cost_center_id = 11, sub_account_id = v_postventa_id WHERE provider_id = 6;

  -- Tepille SPA -> Administración (5) / Seguridad (v_seguridad_id)
  UPDATE obligations SET cost_center_id = 5, sub_account_id = v_seguridad_id WHERE provider_id = 13;

  -- Banco Security -> Administración (5) / Gastos Bancarios (v_gastos_bancarios_id)
  UPDATE obligations SET cost_center_id = 5, sub_account_id = v_gastos_bancarios_id WHERE provider_id = 17;
END $$;

-- 5. (Opcional) Unificar proveedor duplicado Plan OK (IDs 1 y 12)
-- UPDATE obligations SET provider_id = 1 WHERE provider_id = 12;
-- DELETE FROM providers WHERE id = 12 AND NOT EXISTS (SELECT 1 FROM obligations WHERE provider_id = 12);

COMMIT;

-- =============================================================
-- Verificación rápida (ejecutar manualmente si se desea):
-- SELECT provider_id, COUNT(*) FROM obligations WHERE provider_id IN (3,9,6,13) GROUP BY provider_id;
-- SELECT id, cost_center_id, code, name FROM sub_accounts WHERE code IN ('seguridad','postventa');
-- =============================================================
