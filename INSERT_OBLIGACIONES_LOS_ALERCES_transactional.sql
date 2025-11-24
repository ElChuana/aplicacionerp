-- =============================================================
-- SCRIPT TRANSACCIONAL: PROVEEDORES Y OBLIGACIONES LOS ALERCES
-- =============================================================
-- Objetivo: Ejecutar inserciones de forma atómica para proyecto Portales II (id=2)
-- Si ocurre algún error se hace ROLLBACK automático por ON_ERROR_STOP de psql.
-- Puedes cambiar el COMMIT final por ROLLBACK si deseas probar sin persistir.
-- =============================================================
-- Requisitos previos:
--   obligation_types existentes con ids:
--     1 = Factura Exenta
--     2 = Factura Electrónica
--     3 = Nota de Crédito
-- =============================================================

BEGIN;

-- Verificación inicial de tipos
-- Verificación dura: si faltan tipos (<>3) provoca división por cero y aborta
WITH tipos AS (SELECT COUNT(*) AS cnt FROM obligation_types WHERE id IN (1,2,3))
SELECT 1 / CASE WHEN cnt = 3 THEN 1 ELSE 0 END AS tipos_ok FROM tipos;

-- Inserción idempotente de proveedores (19 previstos)
INSERT INTO providers (rut, name) SELECT '76558497-3', 'SOCIEDAD DE PROFESIONALES GLOBAL ADVISORS MANAGEMENT LIMITADA' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76558497-3');
INSERT INTO providers (rut, name) SELECT '76690754-7', 'ESTUDIO TRIBUTARIO LIMITADA' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76690754-7');
INSERT INTO providers (rut, name) SELECT '97011000-3', 'BANCO INTERNACIONAL' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='97011000-3');
INSERT INTO providers (rut, name) SELECT '77717142-9', 'S Y C CONSTRUCCIONES Y MAQUINARIAS LIMITADA' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='77717142-9');
INSERT INTO providers (rut, name) SELECT '76719554-0', 'TACTIKA INGENIERÍA Y DESARROLLO SPA' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76719554-0');
INSERT INTO providers (rut, name) SELECT '76933772-5', 'DISENO & ARQUITECTURA SPA' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76933772-5');
INSERT INTO providers (rut, name) SELECT '76363346-2', 'CONSTRUCTORA NUEVA RSA LIMITADA' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76363346-2');
INSERT INTO providers (rut, name) SELECT '76722311-0', 'KLEBER HOME SPA' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76722311-0');
INSERT INTO providers (rut, name) SELECT '76722476-1', 'RENT - INVEST SPA' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76722476-1');
INSERT INTO providers (rut, name) SELECT '76810563-4', 'ORSAN SEGUROS DE CREDITO Y GARANTIA S.A.' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76810563-4');
INSERT INTO providers (rut, name) SELECT '96933310-4', 'PLAN OK S.A.' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='96933310-4');
INSERT INTO providers (rut, name) SELECT '76203641-K', 'COMERCIAL ABASLOG SPA' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76203641-K');
INSERT INTO providers (rut, name) SELECT '76055126-0', 'TEPILLE SPA' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76055126-0');
INSERT INTO providers (rut, name) SELECT '76042965-1', 'ORION SEGUROS GENERALES S.A' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76042965-1');
INSERT INTO providers (rut, name) SELECT '76103915-6', 'NUBOX' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76103915-6');
INSERT INTO providers (rut, name) SELECT '97080000-K', 'BANCO BICE' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='97080000-K');
INSERT INTO providers (rut, name) SELECT '97053000-2', 'BANCO SECURITY' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='97053000-2');
INSERT INTO providers (rut, name) SELECT '76411321-7', 'COMPAÑÍA GENERAL DE ELECTRICIDAD S.A.' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76411321-7');
INSERT INTO providers (rut, name) SELECT '96792430-K', 'SODIMAC S.A.' WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='96792430-K');

-- Inserciones de obligaciones (50 previstas) para project_id = 2
-- Se omite validación de duplicados; si necesitas idempotencia completa añade WHERE NOT EXISTS sobre combinación única.

-- FACTURAS EXENTAS (5) total esperado: 17.983.818
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
VALUES (2, (SELECT id FROM providers WHERE rut = '76558497-3'), 1, 'FAC-EE 403 - GLOBAL ADVISORS MANAGEMENT', 17473818.0, 'CLP', '2025-07-21', '2025-08-20', 'pendiente');
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
VALUES (2, (SELECT id FROM providers WHERE rut = '76690754-7'), 1, 'FAC-EE 5229 - ESTUDIO TRIBUTARIO', 127500.0, 'CLP', '2025-07-30', '2025-08-29', 'pendiente');
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
VALUES (2, (SELECT id FROM providers WHERE rut = '76690754-7'), 1, 'FAC-EE 5273 - ESTUDIO TRIBUTARIO', 127500.0, 'CLP', '2025-08-29', '2025-09-28', 'pendiente');
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
VALUES (2, (SELECT id FROM providers WHERE rut = '76690754-7'), 1, 'FAC-EE 5317 - ESTUDIO TRIBUTARIO', 127500.0, 'CLP', '2025-09-24', '2025-10-24', 'pendiente');
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
VALUES (2, (SELECT id FROM providers WHERE rut = '76690754-7'), 1, 'FAC-EE 5363 - ESTUDIO TRIBUTARIO', 127500.0, 'CLP', '2025-10-30', '2025-11-29', 'pendiente');

-- FACTURAS ELECTRÓNICAS (44)
-- Subconjuntos con etiquetas de clasificación en description
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
VALUES (2, (SELECT id FROM providers WHERE rut = '97011000-3'), 2, 'FAC-EL 104673 - BANCO INTERNACIONAL (Comisiones)', 137602.0, 'CLP', '2025-08-25', '2025-09-24', 'pendiente');
-- (Resto de las 43 facturas electrónicas ya en script principal; puedes reutilizar allí para mantener una sola fuente.)

-- NOTA DE CRÉDITO (1) monto negativo: -2.097.764
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
VALUES (2, (SELECT id FROM providers WHERE rut = '76933772-5'), 3, 'N/C-EL 22 - DISENO & ARQUITECTURA (CREDITO)', -2097764.0, 'CLP', '2025-08-28', '2025-09-27', 'pendiente');

-- Verificaciones dentro de la transacción
-- Conteo de proveedores (no distingue si algunos existían previamente)
SELECT 'Verif proveedores totales tras inserción' AS verificacion, COUNT(*) AS total_proveedores FROM providers;
SELECT 'Verif obligaciones proyecto 2' AS verificacion, COUNT(*) AS total_obligaciones FROM obligations WHERE project_id = 2;
SELECT 'Suma obligaciones positivas proyecto 2' AS verificacion, TO_CHAR(SUM(amount_original), 'FM999,999,999,999') AS monto_positivo FROM obligations WHERE project_id = 2 AND amount_original > 0;
SELECT 'Suma notas crédito (negativas) proyecto 2' AS verificacion, TO_CHAR(SUM(amount_original), 'FM999,999,999,999') AS monto_nc FROM obligations WHERE project_id = 2 AND amount_original < 0;

-- Si llegaste hasta aquí sin errores, confirma con COMMIT; para prueba usa ROLLBACK.
COMMIT; -- Cambia a ROLLBACK si sólo deseas probar.

-- FIN SCRIPT TRANSACCIONAL