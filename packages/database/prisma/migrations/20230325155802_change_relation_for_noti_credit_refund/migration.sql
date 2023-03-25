/*
  Warnings:

  - You are about to drop the column `actorId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `refundId` on the `Notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jobId]` on the table `Credit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationId]` on the table `Refund` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'REJECT_APPLICATION';

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_actorId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_refundId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "actorId",
DROP COLUMN "refundId",
ADD COLUMN     "applicationId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Credit_jobId_key" ON "Credit"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "Refund_applicationId_key" ON "Refund"("applicationId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("applicationId") ON DELETE SET NULL ON UPDATE CASCADE;
