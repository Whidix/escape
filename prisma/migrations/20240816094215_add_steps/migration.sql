/*
  Warnings:

  - The primary key for the `EscapePlayer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EscapePlayer` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `EscapePlayer` table. All the data in the column will be lost.
  - You are about to drop the `Escape` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[escapeSessionId,token]` on the table `EscapePlayer` will be added. If there are existing duplicate values, this will fail.
  - The required column `token` was added to the `EscapePlayer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterEnum
ALTER TYPE "StepType" ADD VALUE 'PUZZLE';

-- DropForeignKey
ALTER TABLE "EscapeSession" DROP CONSTRAINT "EscapeSession_escapeId_fkey";

-- DropForeignKey
ALTER TABLE "EscapeStep" DROP CONSTRAINT "EscapeStep_escapeId_fkey";

-- AlterTable
ALTER TABLE "EscapePlayer" DROP CONSTRAINT "EscapePlayer_pkey",
DROP COLUMN "id",
DROP COLUMN "sessionId",
ADD COLUMN     "token" TEXT NOT NULL,
ADD CONSTRAINT "EscapePlayer_pkey" PRIMARY KEY ("token");

-- AlterTable
ALTER TABLE "EscapeSession" ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "EscapeStep" ADD COLUMN     "answer" TEXT,
ADD COLUMN     "geo" TEXT,
ADD COLUMN     "puzzle" TEXT,
ADD COLUMN     "text" TEXT;

-- DropTable
DROP TABLE "Escape";

-- CreateTable
CREATE TABLE "EscapeGame" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "EscapeGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscapeItem" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "escapeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EscapeItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EscapeItem_sessionId_id_key" ON "EscapeItem"("sessionId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "EscapeItem_escapeId_name_key" ON "EscapeItem"("escapeId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "EscapePlayer_escapeSessionId_token_key" ON "EscapePlayer"("escapeSessionId", "token");

-- AddForeignKey
ALTER TABLE "EscapeStep" ADD CONSTRAINT "EscapeStep_escapeId_fkey" FOREIGN KEY ("escapeId") REFERENCES "EscapeGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscapeSession" ADD CONSTRAINT "EscapeSession_escapeId_fkey" FOREIGN KEY ("escapeId") REFERENCES "EscapeGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscapeItem" ADD CONSTRAINT "EscapeItem_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "EscapeSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscapeItem" ADD CONSTRAINT "EscapeItem_escapeId_fkey" FOREIGN KEY ("escapeId") REFERENCES "EscapeStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
