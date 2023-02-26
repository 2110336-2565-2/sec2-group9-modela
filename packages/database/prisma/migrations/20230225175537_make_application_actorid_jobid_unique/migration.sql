/*
  Warnings:

  - A unique constraint covering the columns `[actorId,jobId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Application_actorId_jobId_key" ON "Application"("actorId", "jobId");
