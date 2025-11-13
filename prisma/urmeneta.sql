BEGIN;

-- Upsert company

INSERT INTO companies (name, rut, address) VALUES ('Inmobiliaria Urmeneta Spa', '76.899.435-8', 'Rosario Norte 555, Las Condes')
  ON CONFLICT (name) DO UPDATE SET rut = EXCLUDED.rut, address = EXCLUDED.address;

WITH c AS (SELECT id FROM companies WHERE name = 'Inmobiliaria Urmeneta Spa')

, up as (INSERT INTO projects (company_id, code, name, address, comuna)
    SELECT id, 'urmeneta', 'Edificio Urmeneta', 'Urmeneta 32', 'San Bernardo' FROM c
    ON CONFLICT (company_id, code) DO UPDATE SET name = EXCLUDED.name, address = EXCLUDED.address, comuna = EXCLUDED.comuna
    RETURNING id)
SELECT 1;

-- Insert departamentos

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '101', '101', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.86, 54.86, NULL, 1, 'S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3182, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '102', '102', 'DEPARTAMENTO', 'DISPONIBLE', 3, 2, 72.14, 66, 6.14, 1, 'S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3192, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '103', '103', 'DEPARTAMENTO', 'DISPONIBLE', 3, 2, 71.23, 66, 5.23, 1, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 4321, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '104', '104', 'DEPARTAMENTO', 'DISPONIBLE', 3, 2, 69.03, 64, 5.03, 1, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3814, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '105', '105', 'DEPARTAMENTO', 'DISPONIBLE', 3, 2, 64.8, 59.8, 5, 1, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3931, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '201', '201', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.8, 48.19, 6.61, 2, 'O-S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2992, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2992, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '202', '202', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.78, 48.25, 6.53, 2, 'S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2272, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2272, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '203', '203', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 55.04, 48.5, 6.54, 2, 'S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2390, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2390, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '204', '204', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.56, 48.5, 6.06, 2, 'S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2580, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2580, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '205', '205', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 62.62, 54.12, 8.5, 2, 'N-P' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2600, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2600, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '206', '206', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.55, 48.53, 6.02, 2, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2219, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2219, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '207', '207', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 53.87, 47.89, 5.98, 2, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2990, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '208', '208', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 43, 43, NULL, 2, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2365, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2365, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '209', '209', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 53.99, 47.97, 6.02, 2, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2580, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2580, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '210', '210', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 57.73, 48.67, 9.06, 2, 'N-O' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2581, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2581, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '408', '408', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 43, 43, NULL, 2, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2064, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2064, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '301', '301', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.8, 48.19, 6.61, 3, 'O-S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2688, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2688, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '302', '302', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.78, 48.25, 6.53, 3, 'S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2990, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '303', '303', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 55.04, 48.5, 6.54, 3, 'S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2990, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '304', '304', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.56, 48.5, 6.06, 3, 'S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3124, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '305', '305', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 62.62, 54.12, 8.5, 3, 'N-P' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2393, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2393, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '306', '306', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.55, 48.53, 6.02, 3, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3265, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '307', '307', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 53.87, 47.89, 5.98, 3, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3124, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '308', '308', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 43, 43, NULL, 3, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2021, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2021, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '309', '309', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 53.99, 47.97, 6.02, 3, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2753, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2753, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '310', '310', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 57.73, 48.67, 9.06, 3, 'N-O' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3343, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '401', '401', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.8, 48.19, 6.61, 4, 'O-S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3075, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3075, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '402', '402', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.78, 48.25, 6.53, 4, 'S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3134, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '403', '403', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 55.04, 48.5, 6.54, 4, 'S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3192, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '404', '404', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.56, 48.5, 6.06, 4, 'S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2386, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2386, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '405', '405', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 62.62, 54.12, 8.5, 4, 'N-P' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3632, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '406', '406', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.55, 48.53, 6.02, 4, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3945, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '407', '407', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 53.87, 47.89, 5.98, 4, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2244, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2244, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '409', '409', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 53.99, 47.97, 6.02, 4, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2248, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2248, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '410', '410', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 57.73, 48.67, 9.06, 4, 'N-O' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3354, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '501', '501', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.8, 48.19, 6.61, 5, 'O-S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2850, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2534, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '502', '502', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 51.515, 48.25, 6.53, 5, 'S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2679, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2529.55, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '503', '503', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 51.77, 48.5, 6.54, 5, 'S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2692, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2391.8, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '504', '504', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.56, 48.5, 6.06, 5, 'S' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3182, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '505', '505', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 58.37, 54.12, 8.5, 5, 'N-P' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3385, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '506', '506', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 54.55, NULL, 6.02, 5, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3282, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '507', '507', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 53.87, 47.89, 5.98, 5, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2297, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2297, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '508', '508', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 43, 43, NULL, 5, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2193, CURRENT_DATE - INTERVAL '1 day', 'Lista' FROM ins),
  p2 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 2193, CURRENT_DATE, 'Venta' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '509', '509', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 53.99, 47.97, 6.02, 5, 'N' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3265, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status, bedrooms, bathrooms, total_m2, covered_m2, terrace_m2, floor, orientation)
    SELECT project_id, '510', '510', 'DEPARTAMENTO', 'DISPONIBLE', 2, 2, 57.73, 48.67, 9.06, 5, 'N-O' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status, bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, total_m2 = EXCLUDED.total_m2, covered_m2 = EXCLUDED.covered_m2, terrace_m2 = EXCLUDED.terrace_m2, floor = EXCLUDED.floor, orientation = EXCLUDED.orientation
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 3466, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;


-- Insert estacionamientos

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E03', '03', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E04', '04', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E05', '05', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E06', '06', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E07', '07', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E08', '08', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E09', '09', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E10', '10', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E11', '11', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E12', '12', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E13', '13', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E14', '14', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E15', '15', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E16', '16', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E17', '17', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E18', '18', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E19', '19', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E20', '20', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E21', '21', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E22', '22', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E23', '23', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E24', '24', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E25', '25', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E26', '26', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E27', '27', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E28', '28', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E29', '29', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E30', '30', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;

WITH proj AS (SELECT p.id AS project_id FROM projects p JOIN companies co ON co.id = p.company_id WHERE co.name = 'Inmobiliaria Urmeneta Spa' AND p.code = 'urmeneta'),
  ins AS (INSERT INTO units (project_id, code, name, unit_type, status)
    SELECT project_id, 'E31', '31', 'ESTACIONAMIENTO', 'DISPONIBLE' FROM proj
    ON CONFLICT (project_id, code) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status
    RETURNING id),
  p1 AS (INSERT INTO unit_prices (unit_id, currency, amount, valid_from, reason) SELECT id, 'UF', 310, CURRENT_DATE, 'Lista' FROM ins)
SELECT 1;


-- TODO CRM: Generar reservas/promesas/escrituras (no se insertan automáticamente)

-- Unidades a RESERVAR (crear quotation + promise): 201, 202, 203, 204, 205, 206, 208, 209, 210, 408, 301, 308, 309, 401, 404, 407, 409, 501, 502, 503, 507, 508

-- Unidades ESCRITURADAS (crear deed sobre promise): 305

-- Datos faltantes: client_id, fechas y montos en CLP. Indica si deseas crear clientes placeholder y monto basado en P. Venta (UF) convertido a CLP.

COMMIT;