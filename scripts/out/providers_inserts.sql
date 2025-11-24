-- Proveedores faltantes
INSERT INTO providers (name, rut, created_at) SELECT 'CAPACITACIONES LUIS FELIPE MERINO DE LA SOTTA  E.I.R.L.', '76.393.861-1', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76.393.861-1');
INSERT INTO providers (name, rut, created_at) SELECT 'ESTUDIO JURIDICO V.H.V.R. LIMITADA.', '77.696.897-8', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='77.696.897-8');
INSERT INTO providers (name, rut, created_at) SELECT 'ESTUDIO TRIBUTARIO LIMITADA', '76.690.754-7', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76.690.754-7');
INSERT INTO providers (name, rut, created_at) SELECT 'S Y C CONSTRUCCIONES Y MAQUINARIAS LIMITADA', '77.717.142-9', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='77.717.142-9');
INSERT INTO providers (name, rut, created_at) SELECT 'DISENO & ARQUITECTURA SPA', '76.933.772-5', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76.933.772-5');
INSERT INTO providers (name, rut, created_at) SELECT 'CONSTRUCTORA NUEVA RSA LIMITADA', '76.363.346-2', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76.363.346-2');
INSERT INTO providers (name, rut, created_at) SELECT 'KLEBER HOME SPA', '76.722.311-0', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76.722.311-0');
INSERT INTO providers (name, rut, created_at) SELECT 'SOCIEDAD COMERCIAL FENIX SPA', '76.595.563-7', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76.595.563-7');
INSERT INTO providers (name, rut, created_at) SELECT 'ORSAN SEGUROS DE CREDITO Y GARANTIA S.A.', '76.810.563-4', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76.810.563-4');
INSERT INTO providers (name, rut, created_at) SELECT 'PLAN OK S.A.', '96.933.310-4', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='96.933.310-4');
INSERT INTO providers (name, rut, created_at) SELECT 'Tepille SPA', '76.055.126-0', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76.055.126-0');
INSERT INTO providers (name, rut, created_at) SELECT 'ORION SEGUROS GENERALES S.A', '76.042.965-1', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76.042.965-1');
INSERT INTO providers (name, rut, created_at) SELECT 'BANCO INTERNACIONAL', '97.011.000-3', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='97.011.000-3');
INSERT INTO providers (name, rut, created_at) SELECT 'Nubox', '76.103.915-6', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='76.103.915-6');
INSERT INTO providers (name, rut, created_at) SELECT 'Banco Security', '97.053.000-2', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='97.053.000-2');
INSERT INTO providers (name, rut, created_at) SELECT 'CENCOSUD RETAIL S.A.', '81.201.000-K', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='81.201.000-K');
INSERT INTO providers (name, rut, created_at) SELECT 'SODIMAC S.A.', '96.792.430-K', NOW() WHERE NOT EXISTS (SELECT 1 FROM providers WHERE rut='96.792.430-K');
