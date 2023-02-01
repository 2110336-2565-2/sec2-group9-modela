/*
  Warnings:

  - The values [LGBTQ] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `companyName` to the `Casting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'ANY');
ALTER TABLE "Actor" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TABLE "Job" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- AlterTable
ALTER TABLE "Casting" ADD COLUMN     "companyName" TEXT NOT NULL;
