/*
  Warnings:

  - You are about to drop the column `evidenceUrl` on the `Credit` table. All the data in the column will be lost.
  - You are about to drop the column `evidenceUrl` on the `Refund` table. All the data in the column will be lost.
  - Added the required column `proofUrl` to the `Credit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proofUrl` to the `Refund` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credit" DROP COLUMN "evidenceUrl",
ADD COLUMN     "proofUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Refund" DROP COLUMN "evidenceUrl",
ADD COLUMN     "proofUrl" TEXT NOT NULL;
