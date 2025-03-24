/*
  Warnings:

  - You are about to drop the column `status` on the `Todos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todos" DROP COLUMN "status",
ADD COLUMN     "complete" BOOLEAN NOT NULL DEFAULT false;
