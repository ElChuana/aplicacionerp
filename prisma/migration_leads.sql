-- Migración Leads (Aplicar PRIMERO en Railway antes de usar endpoints)
-- Fecha: 2025-11-24
-- IMPORTANTE: Ejecutar esto en la base de datos de producción (Railway). Luego correr `npx prisma generate` localmente.

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'LeadStatus') THEN
    CREATE TYPE "LeadStatus" AS ENUM ('INGRESADO','LLAMADO','SEGUIMIENTO','NEGOCIANDO','DESCARTADO','CONVERTIDO');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  company_id INT NULL,
  project_id INT NULL,
  client_id INT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(30),
  source VARCHAR(100),
  status "LeadStatus" NOT NULL DEFAULT 'INGRESADO',
  notes TEXT,
  budget_clp DECIMAL(18,2),
  budget_uf DECIMAL(18,4),
  created_at TIMESTAMP(6) NOT NULL DEFAULT now(),
  updated_at TIMESTAMP(6),
  CONSTRAINT leads_company_fk FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  CONSTRAINT leads_project_fk FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
  CONSTRAINT leads_client_fk FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS leads_company_status_idx ON leads(company_id, status);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);

-- Si ya existía la tabla, asegurar columnas nuevas (idempotente)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='budget_clp'
  ) THEN
    ALTER TABLE leads ADD COLUMN budget_clp DECIMAL(18,2);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='budget_uf'
  ) THEN
    ALTER TABLE leads ADD COLUMN budget_uf DECIMAL(18,4);
  END IF;
END $$;
