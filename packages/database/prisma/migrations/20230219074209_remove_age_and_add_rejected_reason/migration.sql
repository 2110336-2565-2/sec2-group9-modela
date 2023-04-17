/*
  Warnings:

  - You are about to drop the column `age` on the `Actor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Actor" DROP COLUMN "age";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rejectedReason" TEXT;
