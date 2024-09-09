/*
  Warnings:

  - A unique constraint covering the columns `[escapeId,order]` on the table `EscapeStep` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "EscapeSession" ALTER COLUMN "progress" SET DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "EscapeStep_escapeId_order_key" ON "EscapeStep"("escapeId", "order");
