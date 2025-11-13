
-- --------------------------------------------------
-- Vista de resumen
-- --------------------------------------------------
-- Esta vista agrupa obligaciones con pagos y estado precomputado.
-- Se puede convertir en MATERIALIZED VIEW si el rendimiento es crítico.
DROP VIEW IF EXISTS obligations_summary;
CREATE VIEW obligations_summary AS
SELECT
  o.id,
  o.project_id,
  pr.company_id,
  p.name   AS provider_name,
  pr.name  AS project_name,
  t.name   AS type_name,
  o.description,
  o.amount_original,
  o.currency,
  o.start_date,
  o.due_date,
  COALESCE(SUM(mm.matched_amount), 0) AS paid_amount,
  (o.amount_original - COALESCE(SUM(mm.matched_amount), 0)) AS balance,
  CASE
    WHEN (o.amount_original - COALESCE(SUM(mm.matched_amount), 0)) <= 0 THEN 'pagada'
    WHEN o.due_date < CURRENT_DATE THEN 'vencida'
    ELSE 'pendiente'
  END AS status,
  o.created_at
FROM obligations o
  JOIN projects pr           ON o.project_id = pr.id
  JOIN providers p           ON o.provider_id = p.id
  JOIN obligation_types t    ON o.type_id = t.id
  LEFT JOIN movement_matches mm ON o.id = mm.obligation_id
GROUP BY
  o.id,
  o.project_id,
  pr.company_id,
  p.name,
  pr.name,
  t.name,
  o.description,
  o.amount_original,
  o.currency,
  o.start_date,
  o.due_date,
  o.created_at;

COMMENT ON VIEW obligations_summary IS
  'Combina obligaciones con sumas de pagos y estado calculado para informes rápidos';

-- Opcional: materializar para mejorar rendimiento si los datos cambian poco
-- CREATE MATERIALIZED VIEW obligations_summary_mat AS SELECT * FROM obligations_summary;
-- ANALYZE obligations_summary_mat;