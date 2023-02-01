/*
  Warnings:

  - You are about to drop the column `location` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `workEndDate` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `workStartDate` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "location",
DROP COLUMN "workEndDate",
DROP COLUMN "workStartDate";

-- CreateTable
CREATE TABLE "Shooting" (
    "shootingId" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "shootingLocation" TEXT NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,

    CONSTRAINT "Shooting_pkey" PRIMARY KEY ("shootingId")
);

-- AddForeignKey
ALTER TABLE "Shooting" ADD CONSTRAINT "Shooting_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("jobId") ON DELETE RESTRICT ON UPDATE CASCADE;
