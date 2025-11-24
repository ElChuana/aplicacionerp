-- CreateTable
CREATE TABLE "internal_credit_notes" (
    "id" SERIAL NOT NULL,
    "obligation_id" BIGINT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "internal_credit_notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "internal_credit_notes" ADD CONSTRAINT "internal_credit_notes_obligation_id_fkey" FOREIGN KEY ("obligation_id") REFERENCES "obligations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
