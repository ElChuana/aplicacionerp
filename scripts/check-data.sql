-- Consultar proyectos disponibles
SELECT id, code, name FROM projects ORDER BY id;

-- Consultar tipos de obligación disponibles
SELECT id, name FROM obligation_types ORDER BY id;

-- Consultar proveedores existentes con RUT
SELECT id, rut, name FROM providers WHERE rut IS NOT NULL ORDER BY name;
