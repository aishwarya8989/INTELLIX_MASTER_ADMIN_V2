/*
  Warnings:

  - A unique constraint covering the columns `[contact_no]` on the table `MasterAdmin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MasterAdmin" ALTER COLUMN "contact_no" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "MasterAdmin_contact_no_key" ON "MasterAdmin"("contact_no");
