/*
  Warnings:

  - You are about to drop the column `link` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `isPaid` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "isPaid" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "link";
