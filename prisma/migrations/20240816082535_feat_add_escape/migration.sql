-- CreateEnum
CREATE TYPE "StepType" AS ENUM ('TEXT', 'QUESTION', 'GEO');

-- CreateTable
CREATE TABLE "Escape" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Escape_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscapeStep" (
    "id" TEXT NOT NULL,
    "escapeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" "StepType" NOT NULL,

    CONSTRAINT "EscapeStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscapeSession" (
    "id" TEXT NOT NULL,
    "escapeId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EscapeSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscapePlayer" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "escapeSessionId" TEXT NOT NULL,

    CONSTRAINT "EscapePlayer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EscapeStep" ADD CONSTRAINT "EscapeStep_escapeId_fkey" FOREIGN KEY ("escapeId") REFERENCES "Escape"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscapeSession" ADD CONSTRAINT "EscapeSession_escapeId_fkey" FOREIGN KEY ("escapeId") REFERENCES "Escape"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscapePlayer" ADD CONSTRAINT "EscapePlayer_escapeSessionId_fkey" FOREIGN KEY ("escapeSessionId") REFERENCES "EscapeSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
