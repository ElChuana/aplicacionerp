-- ============================================
-- INSERT PROVEEDORES Y OBLIGACIONES LOS ALERCES
-- ============================================
-- Company: Los Alerces (id=1)
-- Projects: Portales I (id=1), Portales II (id=2)
-- Fuente: export (9).csv
-- ============================================

-- Preferencias de ejecución seguras (fallar rápido si hay locks/lentitud)
-- Opcional (PostgreSQL): habilitar si ejecutas en psql
-- SET lock_timeout = '5s';
-- SET statement_timeout = '30s';

BEGIN;

-- PASO 1: CREAR TIPOS DE OBLIGACIÓN
-- ============================================

-- (Tipos de obligación ya existen; comentar para evitar error por duplicado)
-- INSERT INTO obligation_types (name) VALUES ('Factura Exenta');
-- INSERT INTO obligation_types (name) VALUES ('Factura Electrónica');
-- INSERT INTO obligation_types (name) VALUES ('Nota de Crédito');

-- Verificar IDs de tipos de obligación:
-- 1 = Factura Exenta
-- 2 = Factura Electrónica
-- 3 = Nota de Crédito

-- Abortará si faltan tipos (divide por cero)
WITH tipos AS (SELECT COUNT(*) AS cnt FROM obligation_types WHERE id IN (1,2,3))
SELECT 1 / CASE WHEN cnt = 3 THEN 1 ELSE 0 END FROM tipos;


-- Usar columnas reales: rut, name, address, contact_name, contact_email, contact_phone
-- Evitar duplicados por rut con INSERT ... SELECT WHERE NOT EXISTS
-- (La tabla providers no tiene constraint único en rut, pero evitamos repetición manualmente)

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


-- PASO 3: CREAR OBLIGACIONES
-- ============================================
-- NOTA: Todas asignadas a project_id = 2 (Portales II)
-- obligation_type_id: 1=Factura Exenta, 2=Factura Electrónica, 3=Nota de Crédito
--
-- CLASIFICACIÓN POR PROVEEDOR:
-- ════════════════════════════════════════════════════════════════════
-- PROFESIONALES/SERVICIOS (Factura Exenta):
--   - Global Advisors Management (76558497-3): Honorarios profesionales
--   - Estudio Tributario (76690754-7): Servicios tributarios
--
-- CRM (Descripción en obligación):
--   - Plan OK S.A. (96933310-4): Factura Electrónica + clasificación CRM en descripción
--
-- ADMINISTRACIÓN (Descripción en obligación):
--   - Kleber Home SPA (76722311-0): Factura Electrónica + clasificación Administración en descripción
--
-- POSTVENTA (Descripción en obligación):
--   - S Y C Construcciones (77717142-9): Factura Electrónica + clasificación Postventa en descripción
--
-- CONSTRUCCIÓN PROYECTO (Descripción en obligación):
--   - Constructora Nueva RSA (76363346-2): Factura Electrónica + clasificación Construcción Proyecto en descripción
--
-- ESPECIALIDAD/INGENIERÍA (Factura Electrónica):
--   - Tactika Ingeniería (76719554-0): Ingeniería y desarrollo
--   - Diseño & Arquitectura SPA (76933772-5): Arquitectura y diseño
--
-- SEGUROS (Factura Electrónica):
--   - Orsan Seguros (76810563-4): Seguros de crédito
--   - Orion Seguros (76042965-1): Seguros generales
--
-- SERVICIOS GENERALES (Factura Electrónica):
--   - Rent-Invest SPA (76722476-1): Arriendo/inversiones
--   - Tepille SPA (76055126-0): Servicios tecnológicos/seguridad
--   - Comercial Abaslog SPA (76203641-K): Comercial/abastecimiento
--   - CGE (76411321-7): Electricidad
--   - Sodimac S.A. (96792430-K): Materiales
--   - Nubox (76103915-6): Software contable
--
-- BANCARIOS (Factura Electrónica):
--   - Banco Internacional (97011000-3): Comisiones bancarias
--   - Banco BICE (97080000-K): Comisiones bancarias
--   - Banco Security (97053000-2): Comisiones bancarias
-- ════════════════════════════════════════════════════════════════════

-- Obligaciones Factura Exenta (FAC-EE)
-- ============================================

-- 1. Global Advisors - RUT: 76558497-3 - HONORARIOS PROFESIONALES
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 1, 'FAC-EE 403 - GLOBAL ADVISORS MANAGEMENT', 17473818.0, 'CLP', '2025-07-21', '2025-08-20', 'pendiente'
FROM providers p
WHERE p.rut = '76558497-3'
AND NOT EXISTS (
	SELECT 1 FROM obligations o
	WHERE o.project_id = 2 AND o.provider_id = p.id AND o.type_id = 1
		AND o.description = 'FAC-EE 403 - GLOBAL ADVISORS MANAGEMENT'
		AND o.amount_original = 17473818.0 AND o.start_date = '2025-07-21' AND o.due_date = '2025-08-20'
);

-- 2-5. Estudio Tributario - RUT: 76690754-7 - SERVICIOS TRIBUTARIOS (4 facturas)
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 1, 'FAC-EE 5229 - ESTUDIO TRIBUTARIO', 127500.0, 'CLP', '2025-07-30', '2025-08-29', 'pendiente'
FROM providers p
WHERE p.rut = '76690754-7'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=1
		AND o.description='FAC-EE 5229 - ESTUDIO TRIBUTARIO' AND o.amount_original=127500.0
		AND o.start_date='2025-07-30' AND o.due_date='2025-08-29'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 1, 'FAC-EE 5273 - ESTUDIO TRIBUTARIO', 127500.0, 'CLP', '2025-08-29', '2025-09-28', 'pendiente'
FROM providers p
WHERE p.rut = '76690754-7'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=1
		AND o.description='FAC-EE 5273 - ESTUDIO TRIBUTARIO' AND o.amount_original=127500.0
		AND o.start_date='2025-08-29' AND o.due_date='2025-09-28'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 1, 'FAC-EE 5317 - ESTUDIO TRIBUTARIO', 127500.0, 'CLP', '2025-09-24', '2025-10-24', 'pendiente'
FROM providers p
WHERE p.rut = '76690754-7'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=1
		AND o.description='FAC-EE 5317 - ESTUDIO TRIBUTARIO' AND o.amount_original=127500.0
		AND o.start_date='2025-09-24' AND o.due_date='2025-10-24'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 1, 'FAC-EE 5363 - ESTUDIO TRIBUTARIO', 127500.0, 'CLP', '2025-10-30', '2025-11-29', 'pendiente'
FROM providers p
WHERE p.rut = '76690754-7'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=1
		AND o.description='FAC-EE 5363 - ESTUDIO TRIBUTARIO' AND o.amount_original=127500.0
		AND o.start_date='2025-10-30' AND o.due_date='2025-11-29'
);

-- 6. Banco Internacional - RUT: 97011000-3 - COMISIONES BANCARIAS
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 104673 - BANCO INTERNACIONAL (Comisiones)', 137602.0, 'CLP', '2025-08-25', '2025-09-24', 'pendiente'
FROM providers p
WHERE p.rut = '97011000-3'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 104673 - BANCO INTERNACIONAL (Comisiones)' AND o.amount_original=137602.0
		AND o.start_date='2025-08-25' AND o.due_date='2025-09-24'
);


-- Obligaciones Factura Electrónica (FAC-EL)
-- ============================================

-- 7-9. SYC Construcciones - RUT: 77717142-9 - POSTVENTA (3 facturas)
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, '[POSTVENTA] FAC-EL 27 - S Y C CONSTRUCCIONES Y MAQUINARIAS', 11862702.0, 'CLP', '2025-07-02', '2025-08-01', 'pendiente'
FROM providers p
WHERE p.rut = '77717142-9'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='[POSTVENTA] FAC-EL 27 - S Y C CONSTRUCCIONES Y MAQUINARIAS' AND o.amount_original=11862702.0
		AND o.start_date='2025-07-02' AND o.due_date='2025-08-01'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, '[POSTVENTA] FAC-EL 28 - S Y C CONSTRUCCIONES Y MAQUINARIAS', 1500000.0, 'CLP', '2025-09-30', '2025-10-30', 'pendiente'
FROM providers p
WHERE p.rut = '77717142-9'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='[POSTVENTA] FAC-EL 28 - S Y C CONSTRUCCIONES Y MAQUINARIAS' AND o.amount_original=1500000.0
		AND o.start_date='2025-09-30' AND o.due_date='2025-10-30'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, '[POSTVENTA] FAC-EL 29 - S Y C CONSTRUCCIONES Y MAQUINARIAS', 3194250.0, 'CLP', '2025-09-30', '2025-10-30', 'pendiente'
FROM providers p
WHERE p.rut = '77717142-9'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='[POSTVENTA] FAC-EL 29 - S Y C CONSTRUCCIONES Y MAQUINARIAS' AND o.amount_original=3194250.0
		AND o.start_date='2025-09-30' AND o.due_date='2025-10-30'
);

-- 10. Tactika Ingeniería - RUT: 76719554-0 - ESPECIALIDAD/INGENIERÍA
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 80 - TACTIKA INGENIERÍA Y DESARROLLO', 1275377.0, 'CLP', '2025-08-20', '2025-09-19', 'pendiente'
FROM providers p
WHERE p.rut = '76719554-0'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 80 - TACTIKA INGENIERÍA Y DESARROLLO' AND o.amount_original=1275377.0
		AND o.start_date='2025-08-20' AND o.due_date='2025-09-19'
);

-- 11-13. Diseño & Arquitectura - RUT: 76933772-5 - ESPECIALIDAD/ARQUITECTURA (3 facturas)
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 102 - DISENO & ARQUITECTURA', 2102892.0, 'CLP', '2025-07-01', '2025-07-31', 'pendiente'
FROM providers p
WHERE p.rut = '76933772-5'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 102 - DISENO & ARQUITECTURA' AND o.amount_original=2102892.0
		AND o.start_date='2025-07-01' AND o.due_date='2025-07-31'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 106 - DISENO & ARQUITECTURA', 2097764.0, 'CLP', '2025-08-01', '2025-08-31', 'pendiente'
FROM providers p
WHERE p.rut = '76933772-5'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 106 - DISENO & ARQUITECTURA' AND o.amount_original=2097764.0
		AND o.start_date='2025-08-01' AND o.due_date='2025-08-31'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 108 - DISENO & ARQUITECTURA', 2114456.0, 'CLP', '2025-10-01', '2025-10-31', 'pendiente'
FROM providers p
WHERE p.rut = '76933772-5'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 108 - DISENO & ARQUITECTURA' AND o.amount_original=2114456.0
		AND o.start_date='2025-10-01' AND o.due_date='2025-10-31'
);

-- 14-17. Constructora Nueva RSA - RUT: 76363346-2 - CONSTRUCCIÓN PROYECTO (4 facturas)
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, '[CONSTRUCCIÓN PROYECTO] FAC-EL 165 - CONSTRUCTORA NUEVA RSA', 58920674.0, 'CLP', '2025-07-31', '2025-08-30', 'pendiente'
FROM providers p
WHERE p.rut = '76363346-2'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='[CONSTRUCCIÓN PROYECTO] FAC-EL 165 - CONSTRUCTORA NUEVA RSA' AND o.amount_original=58920674.0
		AND o.start_date='2025-07-31' AND o.due_date='2025-08-30'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, '[CONSTRUCCIÓN PROYECTO] FAC-EL 166 - CONSTRUCTORA NUEVA RSA', 34000000.0, 'CLP', '2025-08-29', '2025-09-28', 'pendiente'
FROM providers p
WHERE p.rut = '76363346-2'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='[CONSTRUCCIÓN PROYECTO] FAC-EL 166 - CONSTRUCTORA NUEVA RSA' AND o.amount_original=34000000.0
		AND o.start_date='2025-08-29' AND o.due_date='2025-09-28'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, '[CONSTRUCCIÓN PROYECTO] FAC-EL 167 - CONSTRUCTORA NUEVA RSA', 36218864.0, 'CLP', '2025-09-30', '2025-10-30', 'pendiente'
FROM providers p
WHERE p.rut = '76363346-2'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='[CONSTRUCCIÓN PROYECTO] FAC-EL 167 - CONSTRUCTORA NUEVA RSA' AND o.amount_original=36218864.0
		AND o.start_date='2025-09-30' AND o.due_date='2025-10-30'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, '[CONSTRUCCIÓN PROYECTO] FAC-EL 168 - CONSTRUCTORA NUEVA RSA', 34800000.0, 'CLP', '2025-10-28', '2025-11-27', 'pendiente'
FROM providers p
WHERE p.rut = '76363346-2'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='[CONSTRUCCIÓN PROYECTO] FAC-EL 168 - CONSTRUCTORA NUEVA RSA' AND o.amount_original=34800000.0
		AND o.start_date='2025-10-28' AND o.due_date='2025-11-27'
);

-- 18-19. Kleber Home - RUT: 76722311-0 - ADMINISTRACIÓN (2 facturas)
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, '[ADMINISTRACIÓN] FAC-EL 234 - KLEBER HOME', 21849385.0, 'CLP', '2025-09-12', '2025-10-12', 'pendiente'
FROM providers p
WHERE p.rut = '76722311-0'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='[ADMINISTRACIÓN] FAC-EL 234 - KLEBER HOME' AND o.amount_original=21849385.0
		AND o.start_date='2025-09-12' AND o.due_date='2025-10-12'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, '[ADMINISTRACIÓN] FAC-EL 236 - KLEBER HOME', 14096378.0, 'CLP', '2025-10-02', '2025-11-01', 'pendiente'
FROM providers p
WHERE p.rut = '76722311-0'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='[ADMINISTRACIÓN] FAC-EL 236 - KLEBER HOME' AND o.amount_original=14096378.0
		AND o.start_date='2025-10-02' AND o.due_date='2025-11-01'
);

-- 20-21. Rent-Invest - RUT: 76722476-1 - SERVICIOS GENERALES (2 facturas)
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 1172 - RENT - INVEST', 2618000.0, 'CLP', '2025-08-01', '2025-08-31', 'pendiente'
FROM providers p
WHERE p.rut = '76722476-1'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 1172 - RENT - INVEST' AND o.amount_original=2618000.0
		AND o.start_date='2025-08-01' AND o.due_date='2025-08-31'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 1176 - RENT - INVEST', 1951600.0, 'CLP', '2025-08-21', '2025-09-20', 'pendiente'
FROM providers p
WHERE p.rut = '76722476-1'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 1176 - RENT - INVEST' AND o.amount_original=1951600.0
		AND o.start_date='2025-08-21' AND o.due_date='2025-09-20'
);

-- 22-23. Orsan Seguros - RUT: 76810563-4 - SEGUROS (2 facturas)
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 23838 - ORSAN SEGUROS', 4578034.0, 'CLP', '2025-09-10', '2025-10-10', 'pendiente'
FROM providers p
WHERE p.rut = '76810563-4'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 23838 - ORSAN SEGUROS' AND o.amount_original=4578034.0
		AND o.start_date='2025-09-10' AND o.due_date='2025-10-10'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 23839 - ORSAN SEGUROS', 4578034.0, 'CLP', '2025-09-10', '2025-10-10', 'pendiente'
FROM providers p
WHERE p.rut = '76810563-4'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 23839 - ORSAN SEGUROS' AND o.amount_original=4578034.0
		AND o.start_date='2025-09-10' AND o.due_date='2025-10-10'
);

-- 24-28. Plan OK - RUT: 96933310-4 - CRM (5 facturas)
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, '[CRM] FAC-EL 89041 - PLAN OK', 140202.0, 'CLP', '2025-07-02', '2025-08-01', 'pendiente'
FROM providers p
WHERE p.rut = '96933310-4'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='[CRM] FAC-EL 89041 - PLAN OK' AND o.amount_original=140202.0
		AND o.start_date='2025-07-02' AND o.due_date='2025-08-01'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, '[CRM] FAC-EL 89901 - PLAN OK', 139796.0, 'CLP', '2025-08-04', '2025-09-03', 'pendiente'
FROM providers p
WHERE p.rut = '96933310-4'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='[CRM] FAC-EL 89901 - PLAN OK' AND o.amount_original=139796.0
		AND o.start_date='2025-08-04' AND o.due_date='2025-09-03'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, '[CRM] FAC-EL 90754 - PLAN OK', 140638.0, 'CLP', '2025-09-01', '2025-10-01', 'pendiente'
FROM providers p
WHERE p.rut = '96933310-4'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='[CRM] FAC-EL 90754 - PLAN OK' AND o.amount_original=140638.0
		AND o.start_date='2025-09-01' AND o.due_date='2025-10-01'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, '[CRM] FAC-EL 91627 - PLAN OK', 140964.0, 'CLP', '2025-10-01', '2025-10-31', 'pendiente'
FROM providers p
WHERE p.rut = '96933310-4'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='[CRM] FAC-EL 91627 - PLAN OK' AND o.amount_original=140964.0
		AND o.start_date='2025-10-01' AND o.due_date='2025-10-31'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, '[CRM] FAC-EL 92528 - PLAN OK', 141418.0, 'CLP', '2025-11-03', '2025-12-03', 'pendiente'
FROM providers p
WHERE p.rut = '96933310-4'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='[CRM] FAC-EL 92528 - PLAN OK' AND o.amount_original=141418.0
		AND o.start_date='2025-11-03' AND o.due_date='2025-12-03'
);

-- 29. Comercial Abaslog - RUT: 76203641-K - SERVICIOS GENERALES
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 109697 - COMERCIAL ABASLOG', 138775.0, 'CLP', '2025-09-12', '2025-10-12', 'pendiente'
FROM providers p
WHERE p.rut = '76203641-K'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 109697 - COMERCIAL ABASLOG' AND o.amount_original=138775.0
		AND o.start_date='2025-09-12' AND o.due_date='2025-10-12'
);

-- 30-36. Tepille SPA - RUT: 76055126-0 - SERVICIOS TECNOLÓGICOS (7 facturas)
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 186361 - TEPILLE', 439271.0, 'CLP', '2025-07-01', '2025-07-31', 'pendiente'
FROM providers p
WHERE p.rut = '76055126-0'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 186361 - TEPILLE' AND o.amount_original=439271.0
		AND o.start_date='2025-07-01' AND o.due_date='2025-07-31'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 187012 - TEPILLE', 522584.0, 'CLP', '2025-07-25', '2025-08-24', 'pendiente'
FROM providers p
WHERE p.rut = '76055126-0'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 187012 - TEPILLE' AND o.amount_original=522584.0
		AND o.start_date='2025-07-25' AND o.due_date='2025-08-24'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 188088 - TEPILLE', 438200.0, 'CLP', '2025-08-01', '2025-08-31', 'pendiente'
FROM providers p
WHERE p.rut = '76055126-0'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 188088 - TEPILLE' AND o.amount_original=438200.0
		AND o.start_date='2025-08-01' AND o.due_date='2025-08-31'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 189755 - TEPILLE', 440667.0, 'CLP', '2025-09-01', '2025-10-01', 'pendiente'
FROM providers p
WHERE p.rut = '76055126-0'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 189755 - TEPILLE' AND o.amount_original=440667.0
		AND o.start_date='2025-09-01' AND o.due_date='2025-10-01'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 191505 - TEPILLE', 371205.0, 'CLP', '2025-10-01', '2025-10-31', 'pendiente'
FROM providers p
WHERE p.rut = '76055126-0'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 191505 - TEPILLE' AND o.amount_original=371205.0
		AND o.start_date='2025-10-01' AND o.due_date='2025-10-31'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 192003 - TEPILLE', 188072.0, 'CLP', '2025-10-14', '2025-11-13', 'pendiente'
FROM providers p
WHERE p.rut = '76055126-0'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 192003 - TEPILLE' AND o.amount_original=188072.0
		AND o.start_date='2025-10-14' AND o.due_date='2025-11-13'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 193232 - TEPILLE', 372306.0, 'CLP', '2025-11-01', '2025-12-01', 'pendiente'
FROM providers p
WHERE p.rut = '76055126-0'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 193232 - TEPILLE' AND o.amount_original=372306.0
		AND o.start_date='2025-11-01' AND o.due_date='2025-12-01'
);

-- 37. Orion Seguros - RUT: 76042965-1 - SEGUROS
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 816002 - ORION SEGUROS GENERALES', 499999.0, 'CLP', '2025-10-16', '2025-11-15', 'pendiente'
FROM providers p
WHERE p.rut = '76042965-1'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 816002 - ORION SEGUROS GENERALES' AND o.amount_original=499999.0
		AND o.start_date='2025-10-16' AND o.due_date='2025-11-15'
);

-- 38-40. Banco Internacional - RUT: 97011000-3 - COMISIONES BANCARIAS (3 facturas electrónicas)
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 1352238 - BANCO INTERNACIONAL', 140183.0, 'CLP', '2025-07-07', '2025-08-06', 'pendiente'
FROM providers p
WHERE p.rut = '97011000-3'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 1352238 - BANCO INTERNACIONAL' AND o.amount_original=140183.0
		AND o.start_date='2025-07-07' AND o.due_date='2025-08-06'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 1363278 - BANCO INTERNACIONAL', 116558.0, 'CLP', '2025-08-11', '2025-09-10', 'pendiente'
FROM providers p
WHERE p.rut = '97011000-3'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 1363278 - BANCO INTERNACIONAL' AND o.amount_original=116558.0
		AND o.start_date='2025-08-11' AND o.due_date='2025-09-10'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 1380983 - BANCO INTERNACIONAL', 140964.0, 'CLP', '2025-10-09', '2025-11-08', 'pendiente'
FROM providers p
WHERE p.rut = '97011000-3'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 1380983 - BANCO INTERNACIONAL' AND o.amount_original=140964.0
		AND o.start_date='2025-10-09' AND o.due_date='2025-11-08'
);

-- 41-44. Nubox - RUT: 76103915-6 - SOFTWARE/SERVICIOS (4 facturas)
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 1682395 - NUBOX', 35048.0, 'CLP', '2025-07-06', '2025-08-05', 'pendiente'
FROM providers p
WHERE p.rut = '76103915-6'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 1682395 - NUBOX' AND o.amount_original=35048.0
		AND o.start_date='2025-07-06' AND o.due_date='2025-08-05'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 1695961 - NUBOX', 58271.0, 'CLP', '2025-08-06', '2025-09-05', 'pendiente'
FROM providers p
WHERE p.rut = '76103915-6'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 1695961 - NUBOX' AND o.amount_original=58271.0
		AND o.start_date='2025-08-06' AND o.due_date='2025-09-05'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 1711917 - NUBOX', 35160.0, 'CLP', '2025-09-06', '2025-10-06', 'pendiente'
FROM providers p
WHERE p.rut = '76103915-6'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 1711917 - NUBOX' AND o.amount_original=35160.0
		AND o.start_date='2025-09-06' AND o.due_date='2025-10-06'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 1725935 - NUBOX', 35241.0, 'CLP', '2025-10-06', '2025-11-05', 'pendiente'
FROM providers p
WHERE p.rut = '76103915-6'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 1725935 - NUBOX' AND o.amount_original=35241.0
		AND o.start_date='2025-10-06' AND o.due_date='2025-11-05'
);

-- 45. Banco BICE - RUT: 97080000-K - COMISIONES BANCARIAS
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 3412126 - BANCO BICE', 70728.0, 'CLP', '2025-11-05', '2025-12-05', 'pendiente'
FROM providers p
WHERE p.rut = '97080000-K'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 3412126 - BANCO BICE' AND o.amount_original=70728.0
		AND o.start_date='2025-11-05' AND o.due_date='2025-12-05'
);

-- 46-47. Banco Security - RUT: 97053000-2 - COMISIONES BANCARIAS (2 facturas)
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 15343186 - BANCO SECURITY', 69890.0, 'CLP', '2025-08-05', '2025-09-04', 'pendiente'
FROM providers p
WHERE p.rut = '97053000-2'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 15343186 - BANCO SECURITY' AND o.amount_original=69890.0
		AND o.start_date='2025-08-05' AND o.due_date='2025-09-04'
);

INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 15369438 - BANCO SECURITY', 70400.0, 'CLP', '2025-09-05', '2025-10-05', 'pendiente'
FROM providers p
WHERE p.rut = '97053000-2'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 15369438 - BANCO SECURITY' AND o.amount_original=70400.0
		AND o.start_date='2025-09-05' AND o.due_date='2025-10-05'
);

-- 48. Compañía General de Electricidad - RUT: 76411321-7 - SERVICIOS BÁSICOS
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 23878367 - CGE', 45050.0, 'CLP', '2025-08-05', '2025-09-04', 'pendiente'
FROM providers p
WHERE p.rut = '76411321-7'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 23878367 - CGE' AND o.amount_original=45050.0
		AND o.start_date='2025-08-05' AND o.due_date='2025-09-04'
);

-- 49. Sodimac - RUT: 96792430-K - MATERIALES
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 2, 'FAC-EL 141683034 - SODIMAC', 91374.0, 'CLP', '2025-09-02', '2025-10-02', 'pendiente'
FROM providers p
WHERE p.rut = '96792430-K'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=2
		AND o.description='FAC-EL 141683034 - SODIMAC' AND o.amount_original=91374.0
		AND o.start_date='2025-09-02' AND o.due_date='2025-10-02'
);


-- Obligaciones Nota de Crédito (N/C-EL)
-- ============================================

-- 50. Diseño & Arquitectura - RUT: 76933772-5 - NOTA DE CRÉDITO ARQUITECTURA
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2, p.id, 3, 'N/C-EL 22 - DISENO & ARQUITECTURA (CREDITO)', -2097764.0, 'CLP', '2025-08-28', '2025-09-27', 'pendiente'
FROM providers p
WHERE p.rut = '76933772-5'
AND NOT EXISTS (
	SELECT 1 FROM obligations o WHERE o.project_id=2 AND o.provider_id=p.id AND o.type_id=3
		AND o.description='N/C-EL 22 - DISENO & ARQUITECTURA (CREDITO)' AND o.amount_original=-2097764.0
		AND o.start_date='2025-08-28' AND o.due_date='2025-09-27'
);


-- ============================================
-- RESUMEN
-- ============================================
-- Total Proveedores: 19
-- Total Obligaciones: 50 (5 FAC-EE + 44 FAC-EL + 1 N/C-EL)
-- Empresa: Los Alerces (id=1)
-- Proyecto: Portales II (id=2)
--
-- CLASIFICACIÓN POR TIPO DE OBLIGACIÓN:
-- ════════════════════════════════════════════════════════════════════
-- FACTURA EXENTA (5 obligaciones):
--   1. Global Advisors Management - Honorarios profesionales
--   2-5. Estudio Tributario - Servicios tributarios (4 facturas)
--
-- FACTURA ELECTRÓNICA (44 obligaciones):
--   CON CLASIFICACIÓN EN DESCRIPCIÓN:
--     [CRM] Plan OK (5 facturas)
--     [ADMINISTRACIÓN] Kleber Home SPA (2 facturas)
--     [POSTVENTA] S Y C Construcciones (3 facturas)
--     [CONSTRUCCIÓN PROYECTO] Constructora Nueva RSA (4 facturas)
--
--   Especialidad/Ingeniería (4):
--     - Tactika Ingeniería (1 factura)
--     - Diseño & Arquitectura (3 facturas)
--
--   Seguros (3):
--     - Orsan Seguros (2 facturas)
--     - Orion Seguros (1 factura)
--
--   Servicios Generales (11):
--     - Rent-Invest (2 facturas)
--     - Tepille SPA (7 facturas)
--     - Comercial Abaslog (1 factura)
--     - CGE Electricidad (1 factura)
--
--   Materiales (1):
--     - Sodimac (1 factura)
--
--   Software/Tecnología (4):
--     - Nubox (4 facturas)
--
--   Comisiones Bancarias (7):
--     - Banco Internacional (1 exenta + 3 electrónicas)
--     - Banco BICE (1 factura)
--     - Banco Security (2 facturas)
--
-- NOTA DE CRÉDITO (1 obligación):
--   - Diseño & Arquitectura (monto negativo: -2.097.764)
-- ════════════════════════════════════════════════════════════════════

-- VERIFICACIONES
COMMIT;

SELECT 'Proveedores creados:' as verificacion, COUNT(*) as total FROM providers;
SELECT 'Obligaciones creadas (proyecto 2):' as verificacion, COUNT(*) as total FROM obligations WHERE project_id = 2;
SELECT 'Total monto obligaciones (sin NC, proyecto 2):' as verificacion, TO_CHAR(SUM(amount_original), 'FM999,999,999,999') as monto 
FROM obligations WHERE project_id = 2 AND amount_original > 0;
