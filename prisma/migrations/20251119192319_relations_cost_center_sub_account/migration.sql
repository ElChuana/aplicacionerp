/*
  Warnings:

  - You are about to drop the column `sub_account_id` on the `bank_movements` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bank_movements" DROP CONSTRAINT "bank_movements_sub_account_id_fkey";

-- AlterTable
ALTER TABLE "bank_movements" DROP COLUMN "sub_account_id";

-- AlterTable
ALTER TABLE "obligations" ADD COLUMN     "cost_center_id" INTEGER,
ADD COLUMN     "sub_account_id" INTEGER;

-- CreateIndex
CREATE INDEX "idx_obligations_cost_center" ON "obligations"("cost_center_id");

-- CreateIndex
CREATE INDEX "idx_obligations_sub_account" ON "obligations"("sub_account_id");

-- AddForeignKey
ALTER TABLE "obligations" ADD CONSTRAINT "obligations_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_centers"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "obligations" ADD CONSTRAINT "obligations_sub_account_id_fkey" FOREIGN KEY ("sub_account_id") REFERENCES "sub_accounts"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
