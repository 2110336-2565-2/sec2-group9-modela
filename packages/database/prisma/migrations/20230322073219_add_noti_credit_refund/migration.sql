/*
  Warnings:

  - You are about to drop the column `message` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `isPaid` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('ACCEPTOFFER', 'REJECTOFFER', 'RECEIVEOFFER', 'CANCELJOB', 'APPROVEREFUND', 'REJECTREFUND');

-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('PENDING', 'ACCEPTED');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "isPaid" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "message",
ADD COLUMN     "actorId" INTEGER,
ADD COLUMN     "jobId" INTEGER,
ADD COLUMN     "refundId" INTEGER,
ADD COLUMN     "type" "NotificationType" NOT NULL;

-- CreateTable
CREATE TABLE "Credit" (
    "creditId" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "evidenceUrl" TEXT NOT NULL,

    CONSTRAINT "Credit_pkey" PRIMARY KEY ("creditId")
);

-- CreateTable
CREATE TABLE "Refund" (
    "refundId" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "evidenceUrl" TEXT NOT NULL,
    "refundStatus" "RefundStatus" NOT NULL,

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("refundId")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("actorId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("jobId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_refundId_fkey" FOREIGN KEY ("refundId") REFERENCES "Refund"("refundId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("jobId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("applicationId") ON DELETE RESTRICT ON UPDATE CASCADE;
