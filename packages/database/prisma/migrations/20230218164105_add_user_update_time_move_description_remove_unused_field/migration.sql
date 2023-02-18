/*
  Warnings:

  - You are about to drop the column `bodyModifications` on the `Actor` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Actor` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actor" DROP COLUMN "bodyModifications",
DROP COLUMN "description";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
