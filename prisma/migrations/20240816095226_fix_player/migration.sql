/*
  Warnings:

  - The primary key for the `EscapePlayer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[token]` on the table `EscapePlayer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "EscapePlayer" DROP CONSTRAINT "EscapePlayer_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "EscapePlayer_token_key" ON "EscapePlayer"("token");
