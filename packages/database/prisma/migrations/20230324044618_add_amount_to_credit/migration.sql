/*
  Warnings:

  - Added the required column `amount` to the `Credit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credit" ADD COLUMN     "amount" INTEGER NOT NULL;
