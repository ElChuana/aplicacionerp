-- Script para actualizar nombres de tipos de obligación a taxonomía de dominio

-- Actualizar tipos existentes (si existen con nombres antiguos)
UPDATE obligation_types 
SET name = 'FACTURA ELECTRÓNICA', 
    description = 'Factura emitida electrónicamente por proveedor'
WHERE LOWER(name) IN ('factura', 'factura electronica', 'dte factura');

UPDATE obligation_types 
SET name = 'NOTA DE CRÉDITO', 
    description = 'Nota de crédito que reduce el monto de una factura'
WHERE LOWER(name) IN ('nota de credito', 'nc', 'nota credito');

UPDATE obligation_types 
SET name = 'CRÉDITO', 
    description = 'Línea de crédito o préstamo'
WHERE LOWER(name) IN ('credito', 'prestamo', 'linea de credito');

UPDATE obligation_types 
SET name = 'BOLETA', 
    description = 'Boleta de honorarios o venta'
WHERE LOWER(name) IN ('boleta', 'boleta honorarios');

-- Insertar tipos si no existen (asegurándose de que estén los 4 principales)
INSERT INTO obligation_types (name, description, created_at, updated_at)
SELECT 'FACTURA ELECTRÓNICA', 'Factura emitida electrónicamente por proveedor', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM obligation_types WHERE name = 'FACTURA ELECTRÓNICA');

INSERT INTO obligation_types (name, description, created_at, updated_at)
SELECT 'NOTA DE CRÉDITO', 'Nota de crédito que reduce el monto de una factura', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM obligation_types WHERE name = 'NOTA DE CRÉDITO');

INSERT INTO obligation_types (name, description, created_at, updated_at)
SELECT 'CRÉDITO', 'Línea de crédito o préstamo', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM obligation_types WHERE name = 'CRÉDITO');

INSERT INTO obligation_types (name, description, created_at, updated_at)
SELECT 'BOLETA', 'Boleta de honorarios o venta', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM obligation_types WHERE name = 'BOLETA');

-- Verificar resultado
SELECT * FROM obligation_types ORDER BY name;
