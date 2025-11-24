-- ================================================
-- ANÁLISIS Y CLASIFICACIÓN SUGERIDA DE PROVEEDORES
-- ================================================
-- Generado: 20 de noviembre de 2025
--
-- IMPORTANTE: Revisa estas sugerencias antes de aplicar
-- Este script NO ACTUALIZA LA BASE DE DATOS automáticamente

-- ================================================
-- CLASIFICACIÓN PROPUESTA:
-- ================================================

-- 1. AGUAS ANDINAS (ID: 2)
-- Servicio básico de agua
-- Centro Costo: Administración (5)
-- Subcuenta: Servicios Básicos (35)
-- UPDATE obligations SET cost_center_id = 5, sub_account_id = 35 WHERE provider_id = 2;


-- 2. BANCO INTERNACIONAL (ID: 15)
-- Entidad financiera
-- Centro Costo: Gastos Financieros (6)
-- Subcuenta: ITO Banco (51) o Comisión Financiera (49)
-- UPDATE obligations SET cost_center_id = 6, sub_account_id = 51 WHERE provider_id = 15;

-- 3. BANCO SECURITY (ID: 17)
-- Reclasificado a Administración / Gastos Bancarios
-- Centro Costo: Administración (5)
-- Subcuenta: Gastos Bancarios (141)
-- UPDATE obligations SET cost_center_id = 5, sub_account_id = 141 WHERE provider_id = 17;

-- Capacitación ligada a proceso comercial (comisiones / apoyo ventas)
-- CAMBIO SOLICITADO: Gastos de Ventas - Comisión de venta variable (unificar duplicadas 64 y 119)
-- Centro Costo: Gastos de Ventas (8)
-- Subcuenta: Comisión venta variable (ID definitivo tras merge: 64)
-- UPDATE obligations SET cost_center_id = 8, sub_account_id = 64 WHERE provider_id = 3;

-- 5. CENCOSUD RETAIL S.A. (ID: 18)
-- Retail / Materiales / Insumos
-- Centro Costo: Administración (5)
-- Subcuenta: Insumos (47)
-- UPDATE obligations SET cost_center_id = 5, sub_account_id = 47 WHERE provider_id = 18;

-- 6. CONSTRUCTORA NUEVA RSA LIMITADA (ID: 8)
-- Construcción
-- Centro Costo: Costo Construccion (11)
-- Subcuenta: Contrato Suma alzada (122)
-- UPDATE obligations SET cost_center_id = 11, sub_account_id = 122 WHERE provider_id = 8;

-- 7. DISENO & ARQUITECTURA SPA (ID: 7)
-- Diseño arquitectónico / especialidad
-- Centro Costo: Especialidad (2)
-- Subcuenta: Arquitectura (12)
-- UPDATE obligations SET cost_center_id = 2, sub_account_id = 12 WHERE provider_id = 7;

-- 8. ESTUDIO JURIDICO V.H.V.R. LIMITADA. (ID: 4)
-- Servicios legales
-- Centro Costo: Administración (5)
-- Subcuenta: Gastos legales (132)
-- UPDATE obligations SET cost_center_id = 5, sub_account_id = 132 WHERE provider_id = 4;

-- 9. ESTUDIO TRIBUTARIO LIMITADA (ID: 5)
-- Servicios contables/tributarios
-- Centro Costo: Administración (5)
-- Subcuenta: Gastos Contables (41)
-- UPDATE obligations SET cost_center_id = 5, sub_account_id = 41 WHERE provider_id = 5;

-- CAMBIO SOLICITADO: Re-clasificar a Administración - Gerenciamiento
-- Centro Costo: Administración (5)
-- Subcuenta: Gerenciamiento (39)
-- UPDATE obligations SET cost_center_id = 5, sub_account_id = 39 WHERE provider_id = 9;

-- 11. NUBOX (ID: 16)
-- Software contable / Servicios administrativos
-- Centro Costo: Administración (5)
-- Subcuenta: Gastos Contables (41)
-- UPDATE obligations SET cost_center_id = 5, sub_account_id = 41 WHERE provider_id = 16;

-- 12. ORION SEGUROS GENERALES S.A (ID: 14)
-- Seguros
-- Centro Costo: Administración (5)
-- Subcuenta: Póliza de Seguros (45)
-- UPDATE obligations SET cost_center_id = 5, sub_account_id = 45 WHERE provider_id = 14;

-- 13. ORSAN SEGUROS DE CREDITO Y GARANTIA S.A. (ID: 11)
-- Seguros
-- Centro Costo: Administración (5)
-- Subcuenta: Póliza de Seguros (45)
-- UPDATE obligations SET cost_center_id = 5, sub_account_id = 45 WHERE provider_id = 11;

-- 14. PLAN OK S.A. (ID: 12) 
-- Marketing / Venta inmobiliaria
-- Centro Costo: Gastos de Ventas (8)
-- Subcuenta: Plan PlanOK (62)
-- UPDATE obligations SET cost_center_id = 8, sub_account_id = 62 WHERE provider_id = 12;

-- 15. PLAN OK (ID: 1) - DUPLICADO del anterior
-- Marketing / Venta inmobiliaria
-- Centro Costo: Gastos de Ventas (8)
-- Subcuenta: Plan PlanOK (62)
-- UPDATE obligations SET cost_center_id = 8, sub_account_id = 62 WHERE provider_id = 1;

-- Construcción con actividades de soporte post-venta
-- Reclasificado a Costo Construcción / Postventa
-- Centro Costo: Costo Construccion (11)
-- Subcuenta: Postventa (140)
-- UPDATE obligations SET cost_center_id = 11, sub_account_id = 140 WHERE provider_id = 6;

-- 17. SOCIEDAD COMERCIAL FENIX SPA (ID: 10)
-- Comercio (probablemente materiales/insumos)
-- Centro Costo: Costo Construccion (11)
-- Subcuenta: Otros (123)
-- UPDATE obligations SET cost_center_id = 11, sub_account_id = 123 WHERE provider_id = 10;

-- 18. SODIMAC S.A. (ID: 19)
-- Materiales de construcción
-- Centro Costo: Costo Construccion (11)
-- Subcuenta: Otros (123)
-- UPDATE obligations SET cost_center_id = 11, sub_account_id = 123 WHERE provider_id = 19;

-- Reclasificado a Administración / Seguridad
-- Centro Costo: Administración (5)
-- Subcuenta: Seguridad (139)
-- UPDATE obligations SET cost_center_id = 5, sub_account_id = 139 WHERE provider_id = 13;


-- ================================================
-- RESUMEN POR CATEGORÍA:
-- ================================================
/*
ADMINISTRACIÓN (5):
  - Aguas Andinas → Servicios Básicos
  - Capacitaciones Luis Felipe → Comisión venta variable (Gastos de Ventas)
  - Cencosud → Insumos
  - Estudio Jurídico V.H.V.R. → Gastos legales
  - Estudio Tributario → Gastos Contables
  - Nubox → Gastos Contables
  - Orion Seguros → Póliza de Seguros
  - Orsan Seguros → Póliza de Seguros

ESPECIALIDAD (2):
  - Diseño & Arquitectura → Arquitectura
  - Tepille SPA → Seguridad (139)

COSTO CONSTRUCCIÓN (11):
  - Constructora Nueva RSA → Contrato Suma alzada
  - S Y C Construcciones → Postventa (140)
  - Kleber Home → Gerenciamiento (Administración)
  - Sociedad Comercial Fenix → Otros
  - Sodimac → Otros

GASTOS FINANCIEROS (6):
  - Banco Internacional → ITO Banco

ADMINISTRACIÓN (5) (Adiciones recientes):
  - Banco Security → Gastos Bancarios (141)

GASTOS DE VENTAS (8):
  - Plan OK S.A. → Plan PlanOK
  - Plan ok → Plan PlanOK
*/

-- ================================================
-- NOTAS:
-- ================================================
-- 1. Hay un proveedor duplicado: "Plan OK" (ID: 1 y 12)
-- 2. Estos updates NO afectan las obligaciones existentes
-- 3. Solo sirven como valores por defecto al crear nuevas obligaciones
-- 4. Puedes ajustar la clasificación según tu conocimiento del negocio
