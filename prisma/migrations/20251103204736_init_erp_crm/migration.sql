-- CreateEnum
CREATE TYPE "DteType" AS ENUM ('FACTURA', 'BOLETA', 'NOTA_CREDITO', 'NOTA_DEBITO');

-- CreateEnum
CREATE TYPE "DteSyncStatus" AS ENUM ('PENDING', 'SYNCED', 'ERROR');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('EN_DISENO', 'EN_CONSTRUCCION', 'EN_VENTA', 'ENTREGADO', 'FINALIZADO');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('EDIFICIO', 'CONDOMINIO', 'LOTEO', 'OFICINAS', 'COMERCIAL', 'MIXTO');

-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('DEPARTAMENTO', 'CASA', 'OFICINA', 'LOCAL_COMERCIAL', 'ESTACIONAMIENTO', 'BODEGA', 'TERRENO');

-- CreateEnum
CREATE TYPE "UnitStatus" AS ENUM ('DISPONIBLE', 'RESERVADO', 'VENDIDO', 'BLOQUEADO');

-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('PERSONA', 'EMPRESA');

-- CreateEnum
CREATE TYPE "QuotationStatus" AS ENUM ('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "DownPaymentMethod" AS ENUM ('CONTADO', 'CUOTAS', 'TRANSFERENCIA', 'CHEQUE', 'MIXTO');

-- CreateEnum
CREATE TYPE "PromiseStatus" AS ENUM ('VIGENTE', 'RESCINDIDA', 'CUMPLIDA');

-- CreateEnum
CREATE TYPE "DeedStatus" AS ENUM ('EN_TRAMITE', 'FIRMADA', 'INSCRITA', 'ANULADA');

-- CreateEnum
CREATE TYPE "ReceivableStatus" AS ENUM ('PENDIENTE', 'PARCIAL', 'COBRADO', 'VENCIDO');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('EFECTIVO', 'TRANSFERENCIA', 'TARJETA', 'CHEQUE', 'CUOTA', 'CREDITO_HIPOTECARIO', 'OTRO');

-- CreateEnum
CREATE TYPE "InstallmentStatus" AS ENUM ('PENDIENTE', 'PAGADA', 'VENCIDA', 'PARCIAL');

-- CreateTable
CREATE TABLE "dte_documents" (
    "id" BIGSERIAL NOT NULL,
    "folio" INTEGER NOT NULL,
    "type" "DteType" NOT NULL,
    "issuer_rut" VARCHAR(20) NOT NULL,
    "receiver_rut" VARCHAR(20) NOT NULL,
    "issue_date" DATE NOT NULL,
    "total_amount" DECIMAL(18,2) NOT NULL,
    "net_amount" DECIMAL(18,2) NOT NULL,
    "tax_amount" DECIMAL(18,2) NOT NULL,
    "xml_data" JSONB,
    "sync_status" "DteSyncStatus" NOT NULL DEFAULT 'PENDING',
    "last_sync" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "obligation_id" BIGINT,

    CONSTRAINT "dte_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_accounts" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "bank_name" VARCHAR(100) NOT NULL,
    "account_no" VARCHAR(50) NOT NULL,
    "currency" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_movements" (
    "id" BIGSERIAL NOT NULL,
    "bank_account_id" INTEGER NOT NULL,
    "project_id" INTEGER,
    "bank_date" DATE NOT NULL,
    "description" TEXT,
    "debit" DECIMAL(18,2),
    "credit" DECIMAL(18,2),
    "currency" VARCHAR(10) NOT NULL,
    "exchange_rate_date" DATE,
    "source" VARCHAR(30) NOT NULL,
    "sub_account_id" INTEGER,
    "created_by" BIGINT,
    "import_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bank_movements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "rut" VARCHAR(20),
    "address" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_centers" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "parent_id" INTEGER,

    CONSTRAINT "cost_centers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credits" (
    "id" BIGSERIAL NOT NULL,
    "interest_rate_pct" DECIMAL(5,2) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "amortization_scheme" VARCHAR(30),
    "last_calculated" DATE,
    "interest_frequency" VARCHAR(20) NOT NULL DEFAULT 'mensual',
    "capital_schedule" JSON NOT NULL DEFAULT '[]',
    "interest_type" VARCHAR(20) NOT NULL DEFAULT 'simple',

    CONSTRAINT "credits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movement_matches" (
    "movement_id" BIGINT NOT NULL,
    "obligation_id" BIGINT NOT NULL,
    "matched_amount" DECIMAL(18,2) NOT NULL,

    CONSTRAINT "movement_matches_pkey" PRIMARY KEY ("movement_id","obligation_id")
);

-- CreateTable
CREATE TABLE "obligation_documents" (
    "id" SERIAL NOT NULL,
    "obligation_id" BIGINT NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "file_path" TEXT NOT NULL,
    "uploaded_by" BIGINT,
    "uploaded_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "obligation_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obligation_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "requires_dte" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "obligation_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obligations" (
    "id" BIGSERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "provider_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "description" TEXT,
    "amount_original" DECIMAL(18,2) NOT NULL,
    "currency" VARCHAR(10) NOT NULL,
    "exchange_rate_date" DATE,
    "start_date" DATE NOT NULL DEFAULT CURRENT_DATE,
    "due_date" DATE,
    "status" VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "credit_id" BIGINT,

    CONSTRAINT "obligations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "code" VARCHAR(30) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "project_type" "ProjectType",
    "status" "ProjectStatus" NOT NULL DEFAULT 'EN_DISENO',
    "address" TEXT,
    "comuna" VARCHAR(100),
    "region" VARCHAR(100),
    "total_units" INTEGER,
    "floors" INTEGER,
    "estimated_delivery" DATE,
    "actual_delivery" DATE,
    "has_pool" BOOLEAN NOT NULL DEFAULT false,
    "has_gym" BOOLEAN NOT NULL DEFAULT false,
    "has_coworking" BOOLEAN NOT NULL DEFAULT false,
    "has_terrace" BOOLEAN NOT NULL DEFAULT false,
    "has_storage_room" BOOLEAN NOT NULL DEFAULT false,
    "has_parking" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_accounts" (
    "id" SERIAL NOT NULL,
    "cost_center_id" INTEGER NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "sub_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uf_rates" (
    "date" DATE NOT NULL,
    "uf_value" DECIMAL(12,4) NOT NULL,

    CONSTRAINT "uf_rates_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "providers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "rut" VARCHAR(20),
    "address" TEXT,
    "contact_name" VARCHAR(150),
    "contact_email" VARCHAR(150),
    "contact_phone" VARCHAR(20),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "code" VARCHAR(80) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "unit_type" "UnitType" NOT NULL,
    "status" "UnitStatus" NOT NULL DEFAULT 'DISPONIBLE',
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "covered_m2" DECIMAL(10,2),
    "terrace_m2" DECIMAL(10,2),
    "total_m2" DECIMAL(10,2),
    "floor" INTEGER,
    "number" VARCHAR(20),
    "orientation" VARCHAR(10),
    "has_balcony" BOOLEAN,
    "has_terrace" BOOLEAN,
    "view_type" VARCHAR(50),
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_prices" (
    "id" SERIAL NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "currency" VARCHAR(10) NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "valid_from" DATE NOT NULL,
    "valid_to" DATE,
    "reason" VARCHAR(100),
    "created_by" BIGINT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "unit_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER,
    "name" VARCHAR(150) NOT NULL,
    "rut" VARCHAR(20),
    "client_type" "ClientType" NOT NULL DEFAULT 'PERSONA',
    "email" VARCHAR(150),
    "phone" VARCHAR(30),
    "address" TEXT,
    "billing_address" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "role" VARCHAR(50),
    "email" VARCHAR(150),
    "phone" VARCHAR(30),
    "notes" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotations" (
    "id" BIGSERIAL NOT NULL,
    "company_id" INTEGER,
    "client_id" INTEGER NOT NULL,
    "project_id" INTEGER,
    "number" VARCHAR(50),
    "status" "QuotationStatus" NOT NULL DEFAULT 'DRAFT',
    "currency" VARCHAR(10) NOT NULL DEFAULT 'CLP',
    "subtotal" DECIMAL(18,2) NOT NULL,
    "discount_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "discount_pct" DECIMAL(5,2),
    "bono_pie_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(18,2) NOT NULL,
    "down_payment_pct" DECIMAL(5,2) NOT NULL,
    "down_payment_amount" DECIMAL(18,2) NOT NULL,
    "down_payment_method" "DownPaymentMethod",
    "mortgage_pct" DECIMAL(5,2),
    "mortgage_amount" DECIMAL(18,2),
    "balance_amount" DECIMAL(18,2),
    "valid_until" DATE,
    "notes" TEXT,
    "created_by" BIGINT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "quotations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotation_items" (
    "id" BIGSERIAL NOT NULL,
    "quotation_id" BIGINT NOT NULL,
    "unit_id" INTEGER,
    "description" VARCHAR(250) NOT NULL,
    "quantity" DECIMAL(18,2) NOT NULL DEFAULT 1,
    "unit_price" DECIMAL(18,2) NOT NULL,
    "line_total" DECIMAL(18,2) NOT NULL,

    CONSTRAINT "quotation_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promises" (
    "id" BIGSERIAL NOT NULL,
    "quotation_id" BIGINT,
    "company_id" INTEGER,
    "client_id" INTEGER NOT NULL,
    "project_id" INTEGER,
    "promise_number" VARCHAR(50),
    "promise_date" DATE NOT NULL,
    "downpayment_amount" DECIMAL(18,2) NOT NULL,
    "total_amount" DECIMAL(18,2) NOT NULL,
    "terms" TEXT,
    "status" "PromiseStatus" NOT NULL DEFAULT 'VIGENTE',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "promises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deeds" (
    "id" BIGSERIAL NOT NULL,
    "promise_id" BIGINT,
    "company_id" INTEGER,
    "notary_name" VARCHAR(150),
    "notary_city" VARCHAR(100),
    "protocol_number" VARCHAR(50),
    "deed_date" DATE NOT NULL,
    "final_amount" DECIMAL(18,2) NOT NULL,
    "status" "DeedStatus" NOT NULL DEFAULT 'EN_TRAMITE',
    "notes" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "deeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receivables" (
    "id" BIGSERIAL NOT NULL,
    "company_id" INTEGER,
    "client_id" INTEGER NOT NULL,
    "project_id" INTEGER,
    "source_type" VARCHAR(30) NOT NULL,
    "source_id" BIGINT,
    "description" VARCHAR(250) NOT NULL,
    "currency" VARCHAR(10) NOT NULL,
    "amount_original" DECIMAL(18,2) NOT NULL,
    "amount_due" DECIMAL(18,2) NOT NULL,
    "due_date" DATE,
    "status" "ReceivableStatus" NOT NULL DEFAULT 'PENDIENTE',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "receivables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" BIGSERIAL NOT NULL,
    "receivable_id" BIGINT,
    "company_id" INTEGER,
    "client_id" INTEGER NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "paid_date" DATE NOT NULL,
    "reference" VARCHAR(100),
    "bank_movement_id" BIGINT,
    "notes" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_plans" (
    "id" BIGSERIAL NOT NULL,
    "promise_id" BIGINT NOT NULL,
    "total_amount" DECIMAL(18,2) NOT NULL,
    "installments_count" INTEGER NOT NULL,
    "interest_rate" DECIMAL(5,2),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_plan_installments" (
    "id" BIGSERIAL NOT NULL,
    "payment_plan_id" BIGINT NOT NULL,
    "installment_number" INTEGER NOT NULL,
    "due_date" DATE NOT NULL,
    "capital_amount" DECIMAL(18,2) NOT NULL,
    "interest_amount" DECIMAL(18,2) NOT NULL,
    "installment_amount" DECIMAL(18,2) NOT NULL,
    "status" "InstallmentStatus" NOT NULL DEFAULT 'PENDIENTE',
    "paid_date" DATE,
    "bank_movement_id" BIGINT,

    CONSTRAINT "payment_plan_installments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_dte_folio_type" ON "dte_documents"("folio", "type");

-- CreateIndex
CREATE INDEX "idx_dte_issuer" ON "dte_documents"("issuer_rut");

-- CreateIndex
CREATE INDEX "idx_dte_receiver" ON "dte_documents"("receiver_rut");

-- CreateIndex
CREATE INDEX "idx_dte_obligation" ON "dte_documents"("obligation_id");

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_company_id_account_no_key" ON "bank_accounts"("company_id", "account_no");

-- CreateIndex
CREATE INDEX "idx_movements_account" ON "bank_movements"("bank_account_id");

-- CreateIndex
CREATE INDEX "idx_movements_project" ON "bank_movements"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cost_centers_code_key" ON "cost_centers"("code");

-- CreateIndex
CREATE INDEX "idx_matches_movement" ON "movement_matches"("movement_id");

-- CreateIndex
CREATE INDEX "idx_matches_obligation" ON "movement_matches"("obligation_id");

-- CreateIndex
CREATE INDEX "idx_documents_obligation" ON "obligation_documents"("obligation_id");

-- CreateIndex
CREATE UNIQUE INDEX "obligation_types_name_key" ON "obligation_types"("name");

-- CreateIndex
CREATE INDEX "idx_obligations_project" ON "obligations"("project_id");

-- CreateIndex
CREATE INDEX "idx_obligations_due_date" ON "obligations"("due_date");

-- CreateIndex
CREATE INDEX "idx_obligations_provider" ON "obligations"("provider_id");

-- CreateIndex
CREATE INDEX "idx_obligations_type" ON "obligations"("type_id");

-- CreateIndex
CREATE INDEX "idx_obligations_credit" ON "obligations"("credit_id");

-- CreateIndex
CREATE INDEX "idx_obligations_credit_id" ON "obligations"("credit_id");

-- CreateIndex
CREATE INDEX "projects_company_id_idx" ON "projects"("company_id");

-- CreateIndex
CREATE INDEX "projects_status_idx" ON "projects"("status");

-- CreateIndex
CREATE UNIQUE INDEX "projects_company_id_code_key" ON "projects"("company_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "sub_accounts_cost_center_code_unique" ON "sub_accounts"("cost_center_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "units_project_id_idx" ON "units"("project_id");

-- CreateIndex
CREATE INDEX "units_status_idx" ON "units"("status");

-- CreateIndex
CREATE INDEX "units_unit_type_idx" ON "units"("unit_type");

-- CreateIndex
CREATE UNIQUE INDEX "units_project_id_code_key" ON "units"("project_id", "code");

-- CreateIndex
CREATE INDEX "unit_prices_unit_id_idx" ON "unit_prices"("unit_id");

-- CreateIndex
CREATE INDEX "unit_prices_valid_from_valid_to_idx" ON "unit_prices"("valid_from", "valid_to");

-- CreateIndex
CREATE INDEX "clients_company_id_idx" ON "clients"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_company_id_rut_key" ON "clients"("company_id", "rut");

-- CreateIndex
CREATE INDEX "contacts_client_id_idx" ON "contacts"("client_id");

-- CreateIndex
CREATE INDEX "quotations_client_id_idx" ON "quotations"("client_id");

-- CreateIndex
CREATE INDEX "quotations_company_id_idx" ON "quotations"("company_id");

-- CreateIndex
CREATE INDEX "quotations_status_idx" ON "quotations"("status");

-- CreateIndex
CREATE INDEX "quotation_items_quotation_id_idx" ON "quotation_items"("quotation_id");

-- CreateIndex
CREATE INDEX "promises_client_id_idx" ON "promises"("client_id");

-- CreateIndex
CREATE INDEX "promises_quotation_id_idx" ON "promises"("quotation_id");

-- CreateIndex
CREATE INDEX "deeds_promise_id_idx" ON "deeds"("promise_id");

-- CreateIndex
CREATE INDEX "receivables_client_id_idx" ON "receivables"("client_id");

-- CreateIndex
CREATE INDEX "receivables_company_id_idx" ON "receivables"("company_id");

-- CreateIndex
CREATE INDEX "receivables_status_idx" ON "receivables"("status");

-- CreateIndex
CREATE INDEX "payments_receivable_id_idx" ON "payments"("receivable_id");

-- CreateIndex
CREATE INDEX "payments_client_id_idx" ON "payments"("client_id");

-- CreateIndex
CREATE INDEX "payments_bank_movement_id_idx" ON "payments"("bank_movement_id");

-- CreateIndex
CREATE INDEX "payment_plans_promise_id_idx" ON "payment_plans"("promise_id");

-- CreateIndex
CREATE INDEX "payment_plan_installments_payment_plan_id_idx" ON "payment_plan_installments"("payment_plan_id");

-- CreateIndex
CREATE INDEX "payment_plan_installments_bank_movement_id_idx" ON "payment_plan_installments"("bank_movement_id");

-- AddForeignKey
ALTER TABLE "dte_documents" ADD CONSTRAINT "dte_documents_obligation_id_fkey" FOREIGN KEY ("obligation_id") REFERENCES "obligations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bank_movements" ADD CONSTRAINT "bank_movements_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "bank_accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bank_movements" ADD CONSTRAINT "bank_movements_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bank_movements" ADD CONSTRAINT "bank_movements_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bank_movements" ADD CONSTRAINT "bank_movements_sub_account_id_fkey" FOREIGN KEY ("sub_account_id") REFERENCES "sub_accounts"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cost_centers" ADD CONSTRAINT "cost_centers_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "cost_centers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movement_matches" ADD CONSTRAINT "movement_matches_movement_id_fkey" FOREIGN KEY ("movement_id") REFERENCES "bank_movements"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movement_matches" ADD CONSTRAINT "movement_matches_obligation_id_fkey" FOREIGN KEY ("obligation_id") REFERENCES "obligations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "obligation_documents" ADD CONSTRAINT "obligation_documents_obligation_id_fkey" FOREIGN KEY ("obligation_id") REFERENCES "obligations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "obligation_documents" ADD CONSTRAINT "obligation_documents_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "obligations" ADD CONSTRAINT "fk_obligations_credit" FOREIGN KEY ("credit_id") REFERENCES "credits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obligations" ADD CONSTRAINT "obligations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "obligations" ADD CONSTRAINT "obligations_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "obligations" ADD CONSTRAINT "obligations_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "obligation_types"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sub_accounts" ADD CONSTRAINT "sub_accounts_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_centers"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_prices" ADD CONSTRAINT "unit_prices_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_prices" ADD CONSTRAINT "unit_prices_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation_items" ADD CONSTRAINT "quotation_items_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "quotations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation_items" ADD CONSTRAINT "quotation_items_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promises" ADD CONSTRAINT "promises_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "quotations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promises" ADD CONSTRAINT "promises_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promises" ADD CONSTRAINT "promises_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promises" ADD CONSTRAINT "promises_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deeds" ADD CONSTRAINT "deeds_promise_id_fkey" FOREIGN KEY ("promise_id") REFERENCES "promises"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deeds" ADD CONSTRAINT "deeds_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receivables" ADD CONSTRAINT "receivables_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receivables" ADD CONSTRAINT "receivables_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receivables" ADD CONSTRAINT "receivables_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_receivable_id_fkey" FOREIGN KEY ("receivable_id") REFERENCES "receivables"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_bank_movement_id_fkey" FOREIGN KEY ("bank_movement_id") REFERENCES "bank_movements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_plans" ADD CONSTRAINT "payment_plans_promise_id_fkey" FOREIGN KEY ("promise_id") REFERENCES "promises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_plan_installments" ADD CONSTRAINT "payment_plan_installments_payment_plan_id_fkey" FOREIGN KEY ("payment_plan_id") REFERENCES "payment_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_plan_installments" ADD CONSTRAINT "payment_plan_installments_bank_movement_id_fkey" FOREIGN KEY ("bank_movement_id") REFERENCES "bank_movements"("id") ON DELETE SET NULL ON UPDATE CASCADE;
