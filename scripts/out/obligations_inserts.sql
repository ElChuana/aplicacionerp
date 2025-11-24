-- Proyecto destino: 2
-- Tipos se resuelven por nombre con subquery. Si no existe, el INSERT no se ejecuta.

-- Tipo: Capacitación — 6 docs
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.393.861-1'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Capacitación'),
       'FAC-EE #80', 1086627, 'CLP', '2025-02-24', '2025-02-24', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.393.861-1')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Capacitación')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.393.861-1')
      AND o.description='FAC-EE #80'
      AND o.start_date='2025-02-24'
      AND o.amount_original=1086627
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.393.861-1'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Capacitación'),
       'FAC-EE #81', 1086627, 'CLP', '2025-02-24', '2025-02-24', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.393.861-1')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Capacitación')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.393.861-1')
      AND o.description='FAC-EE #81'
      AND o.start_date='2025-02-24'
      AND o.amount_original=1086627
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.393.861-1'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Capacitación'),
       'FAC-EE #82', 1629940, 'CLP', '2025-02-24', '2025-02-24', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.393.861-1')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Capacitación')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.393.861-1')
      AND o.description='FAC-EE #82'
      AND o.start_date='2025-02-24'
      AND o.amount_original=1629940
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.393.861-1'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Capacitación'),
       'FAC-EE #98', 192362, 'CLP', '2025-04-24', '2025-04-24', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.393.861-1')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Capacitación')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.393.861-1')
      AND o.description='FAC-EE #98'
      AND o.start_date='2025-04-24'
      AND o.amount_original=192362
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.393.861-1'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Capacitación'),
       'FAC-EE #99', 1923716, 'CLP', '2025-04-24', '2025-04-24', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.393.861-1')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Capacitación')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.393.861-1')
      AND o.description='FAC-EE #99'
      AND o.start_date='2025-04-24'
      AND o.amount_original=1923716
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.393.861-1'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Capacitación'),
       'FAC-EE #100', 1923716, 'CLP', '2025-04-24', '2025-04-24', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.393.861-1')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Capacitación')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.393.861-1')
      AND o.description='FAC-EE #100'
      AND o.start_date='2025-04-24'
      AND o.amount_original=1923716
  );

-- Tipo: Asesoría Legal — 1 docs
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='77.696.897-8'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Asesoría Legal'),
       'FAC-EE #132', 60000, 'CLP', '2025-04-25', '2025-04-25', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='77.696.897-8')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Asesoría Legal')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='77.696.897-8')
      AND o.description='FAC-EE #132'
      AND o.start_date='2025-04-25'
      AND o.amount_original=60000
  );

-- Tipo: Asesoría Tributaria — 6 docs
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.690.754-7'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Asesoría Tributaria'),
       'FAC-EE #4948', 127500, 'CLP', '2025-01-31', '2025-01-31', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.690.754-7')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Asesoría Tributaria')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.690.754-7')
      AND o.description='FAC-EE #4948'
      AND o.start_date='2025-01-31'
      AND o.amount_original=127500
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.690.754-7'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Asesoría Tributaria'),
       'FAC-EE #4995', 127500, 'CLP', '2025-02-28', '2025-02-28', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.690.754-7')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Asesoría Tributaria')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.690.754-7')
      AND o.description='FAC-EE #4995'
      AND o.start_date='2025-02-28'
      AND o.amount_original=127500
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.690.754-7'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Asesoría Tributaria'),
       'FAC-EE #5044', 127500, 'CLP', '2025-03-31', '2025-03-31', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.690.754-7')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Asesoría Tributaria')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.690.754-7')
      AND o.description='FAC-EE #5044'
      AND o.start_date='2025-03-31'
      AND o.amount_original=127500
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.690.754-7'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Asesoría Tributaria'),
       'FAC-EE #5092', 127500, 'CLP', '2025-04-30', '2025-04-30', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.690.754-7')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Asesoría Tributaria')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.690.754-7')
      AND o.description='FAC-EE #5092'
      AND o.start_date='2025-04-30'
      AND o.amount_original=127500
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.690.754-7'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Asesoría Tributaria'),
       'FAC-EE #5141', 127500, 'CLP', '2025-05-30', '2025-05-30', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.690.754-7')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Asesoría Tributaria')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.690.754-7')
      AND o.description='FAC-EE #5141'
      AND o.start_date='2025-05-30'
      AND o.amount_original=127500
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.690.754-7'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Asesoría Tributaria'),
       'FAC-EE #5184', 127500, 'CLP', '2025-06-30', '2025-06-30', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.690.754-7')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Asesoría Tributaria')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.690.754-7')
      AND o.description='FAC-EE #5184'
      AND o.start_date='2025-06-30'
      AND o.amount_original=127500
  );

-- Tipo: Construcción — 8 docs
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='77.717.142-9'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Construcción'),
       'FAC-EL #21', 9087800, 'CLP', '2025-04-24', '2025-04-24', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='77.717.142-9')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Construcción')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='77.717.142-9')
      AND o.description='FAC-EL #21'
      AND o.start_date='2025-04-24'
      AND o.amount_original=9087800
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='77.717.142-9'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Construcción'),
       'FAC-EL #24', 12568588, 'CLP', '2025-05-28', '2025-05-28', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='77.717.142-9')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Construcción')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='77.717.142-9')
      AND o.description='FAC-EL #24'
      AND o.start_date='2025-05-28'
      AND o.amount_original=12568588
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='77.717.142-9'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Construcción'),
       'FAC-EL #26', 1541000, 'CLP', '2025-06-30', '2025-06-30', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='77.717.142-9')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Construcción')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='77.717.142-9')
      AND o.description='FAC-EL #26'
      AND o.start_date='2025-06-30'
      AND o.amount_original=1541000
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.363.346-2'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Construcción'),
       'FAC-EL #160', 100000000, 'CLP', '2025-01-31', '2025-01-31', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.363.346-2')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Construcción')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.363.346-2')
      AND o.description='FAC-EL #160'
      AND o.start_date='2025-01-31'
      AND o.amount_original=100000000
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.363.346-2'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Construcción'),
       'FAC-EL #161', 76700000, 'CLP', '2025-02-28', '2025-02-28', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.363.346-2')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Construcción')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.363.346-2')
      AND o.description='FAC-EL #161'
      AND o.start_date='2025-02-28'
      AND o.amount_original=76700000
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.363.346-2'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Construcción'),
       'FAC-EL #162', 160090542, 'CLP', '2025-04-30', '2025-04-30', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.363.346-2')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Construcción')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.363.346-2')
      AND o.description='FAC-EL #162'
      AND o.start_date='2025-04-30'
      AND o.amount_original=160090542
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.363.346-2'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Construcción'),
       'FAC-EL #163', 82991684, 'CLP', '2025-05-30', '2025-05-30', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.363.346-2')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Construcción')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.363.346-2')
      AND o.description='FAC-EL #163'
      AND o.start_date='2025-05-30'
      AND o.amount_original=82991684
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.363.346-2'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Construcción'),
       'FAC-EL #164', 42000000, 'CLP', '2025-06-30', '2025-06-30', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.363.346-2')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Construcción')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.363.346-2')
      AND o.description='FAC-EL #164'
      AND o.start_date='2025-06-30'
      AND o.amount_original=42000000
  );

-- Tipo: Arquitectura — 3 docs
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.933.772-5'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Arquitectura'),
       'FAC-EL #81', 4113359, 'CLP', '2025-01-22', '2025-01-22', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.933.772-5')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Arquitectura')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.933.772-5')
      AND o.description='FAC-EL #81'
      AND o.start_date='2025-01-22'
      AND o.amount_original=4113359
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.933.772-5'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Arquitectura'),
       'FAC-EL #90', 4186368, 'CLP', '2025-05-02', '2025-05-02', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.933.772-5')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Arquitectura')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.933.772-5')
      AND o.description='FAC-EL #90'
      AND o.start_date='2025-05-02'
      AND o.amount_original=4186368
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.933.772-5'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Arquitectura'),
       'FAC-EL #99', 2098865, 'CLP', '2025-06-02', '2025-06-02', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.933.772-5')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Arquitectura')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.933.772-5')
      AND o.description='FAC-EL #99'
      AND o.start_date='2025-06-02'
      AND o.amount_original=2098865
  );

-- Tipo: Materiales y Retail — 5 docs
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.722.311-0'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Materiales y Retail'),
       'FAC-EL #231', 588994, 'CLP', '2025-01-22', '2025-01-22', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.722.311-0')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Materiales y Retail')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.722.311-0')
      AND o.description='FAC-EL #231'
      AND o.start_date='2025-01-22'
      AND o.amount_original=588994
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.722.311-0'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Materiales y Retail'),
       'FAC-EL #232', 9449786, 'CLP', '2025-04-24', '2025-04-24', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.722.311-0')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Materiales y Retail')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.722.311-0')
      AND o.description='FAC-EL #232'
      AND o.start_date='2025-04-24'
      AND o.amount_original=9449786
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='81.201.000-K'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Materiales y Retail'),
       'FAC-EL #23391905', 12412, 'CLP', '2025-02-06', '2025-02-06', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='81.201.000-K')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Materiales y Retail')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='81.201.000-K')
      AND o.description='FAC-EL #23391905'
      AND o.start_date='2025-02-06'
      AND o.amount_original=12412
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.792.430-K'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Materiales y Retail'),
       'FAC-EL #138817139', 71250, 'CLP', '2025-04-04', '2025-04-04', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.792.430-K')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Materiales y Retail')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.792.430-K')
      AND o.description='FAC-EL #138817139'
      AND o.start_date='2025-04-04'
      AND o.amount_original=71250
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.792.430-K'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Materiales y Retail'),
       'FAC-EL #139187157', 88142, 'CLP', '2025-04-04', '2025-04-04', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.792.430-K')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Materiales y Retail')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.792.430-K')
      AND o.description='FAC-EL #139187157'
      AND o.start_date='2025-04-04'
      AND o.amount_original=88142
  );

-- Tipo: Servicios Varios — 1 docs
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.595.563-7'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Servicios Varios'),
       'FAC-EL #13916', 12000, 'CLP', '2025-04-04', '2025-04-04', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.595.563-7')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Servicios Varios')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.595.563-7')
      AND o.description='FAC-EL #13916'
      AND o.start_date='2025-04-04'
      AND o.amount_original=12000
  );

-- Tipo: Seguros — 4 docs
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.810.563-4'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Seguros'),
       'FAC-EL #21761', 3910997, 'CLP', '2025-03-31', '2025-03-31', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.810.563-4')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Seguros')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.810.563-4')
      AND o.description='FAC-EL #21761'
      AND o.start_date='2025-03-31'
      AND o.amount_original=3910997
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.810.563-4'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Seguros'),
       'FAC-EL #21762', 3910997, 'CLP', '2025-03-31', '2025-03-31', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.810.563-4')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Seguros')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.810.563-4')
      AND o.description='FAC-EL #21762'
      AND o.start_date='2025-03-31'
      AND o.amount_original=3910997
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.042.965-1'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Seguros'),
       'FAC-EL #793550', 663652, 'CLP', '2025-04-02', '2025-04-02', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.042.965-1')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Seguros')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.042.965-1')
      AND o.description='FAC-EL #793550'
      AND o.start_date='2025-04-02'
      AND o.amount_original=663652
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.042.965-1'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Seguros'),
       'FAC-EL #793989', 663652, 'CLP', '2025-04-07', '2025-04-07', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.042.965-1')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Seguros')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.042.965-1')
      AND o.description='FAC-EL #793989'
      AND o.start_date='2025-04-07'
      AND o.amount_original=663652
  );

-- Tipo: Software — 18 docs
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.933.310-4'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #83103', 182922, 'CLP', '2025-01-06', '2025-01-06', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.933.310-4')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.933.310-4')
      AND o.description='FAC-EL #83103'
      AND o.start_date='2025-01-06'
      AND o.amount_original=182922
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.933.310-4'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #83104', 182922, 'CLP', '2025-01-06', '2025-01-06', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.933.310-4')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.933.310-4')
      AND o.description='FAC-EL #83104'
      AND o.start_date='2025-01-06'
      AND o.amount_original=182922
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.933.310-4'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #84848', 182675, 'CLP', '2025-02-03', '2025-02-03', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.933.310-4')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.933.310-4')
      AND o.description='FAC-EL #84848'
      AND o.start_date='2025-02-03'
      AND o.amount_original=182675
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.933.310-4'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #84849', 182675, 'CLP', '2025-02-03', '2025-02-03', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.933.310-4')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.933.310-4')
      AND o.description='FAC-EL #84849'
      AND o.start_date='2025-02-03'
      AND o.amount_original=182675
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.933.310-4'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #85451', 184180, 'CLP', '2025-03-03', '2025-03-03', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.933.310-4')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.933.310-4')
      AND o.description='FAC-EL #85451'
      AND o.start_date='2025-03-03'
      AND o.amount_original=184180
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.933.310-4'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #85452', 184180, 'CLP', '2025-03-03', '2025-03-03', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.933.310-4')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.933.310-4')
      AND o.description='FAC-EL #85452'
      AND o.start_date='2025-03-03'
      AND o.amount_original=184180
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.933.310-4'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #86395', 185159, 'CLP', '2025-04-01', '2025-04-01', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.933.310-4')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.933.310-4')
      AND o.description='FAC-EL #86395'
      AND o.start_date='2025-04-01'
      AND o.amount_original=185159
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.933.310-4'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #86396', 185159, 'CLP', '2025-04-01', '2025-04-01', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.933.310-4')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.933.310-4')
      AND o.description='FAC-EL #86396'
      AND o.start_date='2025-04-01'
      AND o.amount_original=185159
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.933.310-4'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #87295', 186030, 'CLP', '2025-05-02', '2025-05-02', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.933.310-4')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.933.310-4')
      AND o.description='FAC-EL #87295'
      AND o.start_date='2025-05-02'
      AND o.amount_original=186030
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.933.310-4'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #87296', 186030, 'CLP', '2025-05-02', '2025-05-02', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.933.310-4')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.933.310-4')
      AND o.description='FAC-EL #87296'
      AND o.start_date='2025-05-02'
      AND o.amount_original=186030
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.933.310-4'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #88188', 186578, 'CLP', '2025-06-03', '2025-06-03', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.933.310-4')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.933.310-4')
      AND o.description='FAC-EL #88188'
      AND o.start_date='2025-06-03'
      AND o.amount_original=186578
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.933.310-4'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #88189', 186578, 'CLP', '2025-06-03', '2025-06-03', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.933.310-4')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.933.310-4')
      AND o.description='FAC-EL #88189'
      AND o.start_date='2025-06-03'
      AND o.amount_original=186578
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.103.915-6'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #1592571', 34289, 'CLP', '2025-01-06', '2025-01-06', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.103.915-6')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.103.915-6')
      AND o.description='FAC-EL #1592571'
      AND o.start_date='2025-01-06'
      AND o.amount_original=34289
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.103.915-6'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #1608061', 34255, 'CLP', '2025-02-06', '2025-02-06', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.103.915-6')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.103.915-6')
      AND o.description='FAC-EL #1608061'
      AND o.start_date='2025-02-06'
      AND o.amount_original=34255
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.103.915-6'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #1623261', 34506, 'CLP', '2025-03-06', '2025-03-06', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.103.915-6')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.103.915-6')
      AND o.description='FAC-EL #1623261'
      AND o.start_date='2025-03-06'
      AND o.amount_original=34506
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.103.915-6'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #1637254', 34717, 'CLP', '2025-04-06', '2025-04-06', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.103.915-6')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.103.915-6')
      AND o.description='FAC-EL #1637254'
      AND o.start_date='2025-04-06'
      AND o.amount_original=34717
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.103.915-6'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #1654027', 34880, 'CLP', '2025-05-06', '2025-05-06', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.103.915-6')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.103.915-6')
      AND o.description='FAC-EL #1654027'
      AND o.start_date='2025-05-06'
      AND o.amount_original=34880
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.103.915-6'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Software'),
       'FAC-EL #1666271', 34979, 'CLP', '2025-06-06', '2025-06-06', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.103.915-6')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Software')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.103.915-6')
      AND o.description='FAC-EL #1666271'
      AND o.start_date='2025-06-06'
      AND o.amount_original=34979
  );

-- Tipo: Seguridad — 6 docs
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.055.126-0'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Seguridad'),
       'FAC-EL #176316', 343805, 'CLP', '2025-01-01', '2025-01-01', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.055.126-0')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Seguridad')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.055.126-0')
      AND o.description='FAC-EL #176316'
      AND o.start_date='2025-01-01'
      AND o.amount_original=343805
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.055.126-0'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Seguridad'),
       'FAC-EL #177994', 429340, 'CLP', '2025-02-01', '2025-02-01', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.055.126-0')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Seguridad')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.055.126-0')
      AND o.description='FAC-EL #177994'
      AND o.start_date='2025-02-01'
      AND o.amount_original=429340
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.055.126-0'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Seguridad'),
       'FAC-EL #179680', 432485, 'CLP', '2025-03-01', '2025-03-01', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.055.126-0')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Seguridad')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.055.126-0')
      AND o.description='FAC-EL #179680'
      AND o.start_date='2025-03-01'
      AND o.amount_original=432485
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.055.126-0'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Seguridad'),
       'FAC-EL #181353', 435126, 'CLP', '2025-04-01', '2025-04-01', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.055.126-0')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Seguridad')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.055.126-0')
      AND o.description='FAC-EL #181353'
      AND o.start_date='2025-04-01'
      AND o.amount_original=435126
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.055.126-0'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Seguridad'),
       'FAC-EL #183015', 437170, 'CLP', '2025-05-01', '2025-05-01', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.055.126-0')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Seguridad')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.055.126-0')
      AND o.description='FAC-EL #183015'
      AND o.start_date='2025-05-01'
      AND o.amount_original=437170
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.055.126-0'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Seguridad'),
       'FAC-EL #184691', 438402, 'CLP', '2025-06-01', '2025-06-01', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.055.126-0')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Seguridad')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.055.126-0')
      AND o.description='FAC-EL #184691'
      AND o.start_date='2025-06-01'
      AND o.amount_original=438402
  );

-- Tipo: Gastos Bancarios — 5 docs
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='97.011.000-3'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Gastos Bancarios'),
       'FAC-EL #1300606', 137139, 'CLP', '2025-01-08', '2025-01-08', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='97.011.000-3')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Gastos Bancarios')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='97.011.000-3')
      AND o.description='FAC-EL #1300606'
      AND o.start_date='2025-01-08'
      AND o.amount_original=137139
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='97.011.000-3'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Gastos Bancarios'),
       'FAC-EL #1308285', 137032, 'CLP', '2025-02-07', '2025-02-07', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='97.011.000-3')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Gastos Bancarios')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='97.011.000-3')
      AND o.description='FAC-EL #1308285'
      AND o.start_date='2025-02-07'
      AND o.amount_original=137032
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='97.011.000-3'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Gastos Bancarios'),
       'FAC-EL #1315881', 137973, 'CLP', '2025-03-07', '2025-03-07', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='97.011.000-3')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Gastos Bancarios')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='97.011.000-3')
      AND o.description='FAC-EL #1315881'
      AND o.start_date='2025-03-07'
      AND o.amount_original=137973
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='97.011.000-3'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Gastos Bancarios'),
       'FAC-EL #1325643', 138852, 'CLP', '2025-04-07', '2025-04-07', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='97.011.000-3')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Gastos Bancarios')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='97.011.000-3')
      AND o.description='FAC-EL #1325643'
      AND o.start_date='2025-04-07'
      AND o.amount_original=138852
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='97.053.000-2'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Gastos Bancarios'),
       'FAC-EL #15167859', 68600, 'CLP', '2025-01-06', '2025-01-06', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='97.053.000-2')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Gastos Bancarios')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='97.053.000-2')
      AND o.description='FAC-EL #15167859'
      AND o.start_date='2025-01-06'
      AND o.amount_original=68600
  );

-- Tipo: Nota de Crédito — 9 docs
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='77.717.142-9'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Nota de Crédito'),
       'N/C-EL #1', -1223027, 'CLP', '2025-04-25', '2025-04-25', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='77.717.142-9')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Nota de Crédito')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='77.717.142-9')
      AND o.description='N/C-EL #1'
      AND o.start_date='2025-04-25'
      AND o.amount_original=-1223027
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.363.346-2'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Nota de Crédito'),
       'N/C-EL #7', -31090542, 'CLP', '2025-02-28', '2025-02-28', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.363.346-2')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Nota de Crédito')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.363.346-2')
      AND o.description='N/C-EL #7'
      AND o.start_date='2025-02-28'
      AND o.amount_original=-31090542
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.393.861-1'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Nota de Crédito'),
       'N/C-EL #16', -192362, 'CLP', '2025-04-24', '2025-04-24', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.393.861-1')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Nota de Crédito')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.393.861-1')
      AND o.description='N/C-EL #16'
      AND o.start_date='2025-04-24'
      AND o.amount_original=-192362
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.933.772-5'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Nota de Crédito'),
       'N/C-EL #17', -4113359, 'CLP', '2025-01-27', '2025-01-27', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.933.772-5')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Nota de Crédito')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.933.772-5')
      AND o.description='N/C-EL #17'
      AND o.start_date='2025-01-27'
      AND o.amount_original=-4113359
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.933.772-5'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Nota de Crédito'),
       'N/C-EL #21', -2098865, 'CLP', '2025-06-27', '2025-06-27', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.933.772-5')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Nota de Crédito')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.933.772-5')
      AND o.description='N/C-EL #21'
      AND o.start_date='2025-06-27'
      AND o.amount_original=-2098865
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='76.042.965-1'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Nota de Crédito'),
       'N/C-EL #97455', -663652, 'CLP', '2025-04-10', '2025-04-10', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='76.042.965-1')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Nota de Crédito')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='76.042.965-1')
      AND o.description='N/C-EL #97455'
      AND o.start_date='2025-04-10'
      AND o.amount_original=-663652
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.792.430-K'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Nota de Crédito'),
       'N/C-EL #60371490', -20290, 'CLP', '2025-04-04', '2025-04-04', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.792.430-K')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Nota de Crédito')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.792.430-K')
      AND o.description='N/C-EL #60371490'
      AND o.start_date='2025-04-04'
      AND o.amount_original=-20290
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.792.430-K'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Nota de Crédito'),
       'N/C-EL #60371492', -37911, 'CLP', '2025-04-04', '2025-04-04', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.792.430-K')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Nota de Crédito')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.792.430-K')
      AND o.description='N/C-EL #60371492'
      AND o.start_date='2025-04-04'
      AND o.amount_original=-37911
  );
INSERT INTO obligations (project_id, provider_id, type_id, description, amount_original, currency, start_date, due_date, status)
SELECT 2,
       (SELECT p.id FROM providers p WHERE p.rut='96.792.430-K'),
       (SELECT t.id FROM obligation_types t WHERE t.name='Nota de Crédito'),
       'N/C-EL #60420542', -20691, 'CLP', '2025-04-08', '2025-04-08', 'pendiente'
WHERE EXISTS (SELECT 1 FROM providers p WHERE p.rut='96.792.430-K')
  AND EXISTS (SELECT 1 FROM obligation_types t WHERE t.name='Nota de Crédito')
  AND NOT EXISTS (
    SELECT 1 FROM obligations o
    WHERE o.project_id=2
      AND o.provider_id=(SELECT p.id FROM providers p WHERE p.rut='96.792.430-K')
      AND o.description='N/C-EL #60420542'
      AND o.start_date='2025-04-08'
      AND o.amount_original=-20691
  );

