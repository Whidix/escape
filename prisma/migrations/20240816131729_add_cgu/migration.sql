/*
  Warnings:

  - Added the required column `cgu` to the `EscapePlayer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EscapePlayer" ADD COLUMN     "cgu" BOOLEAN NOT NULL;
