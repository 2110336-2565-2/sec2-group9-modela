-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_resumeId_fkey";

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "resumeUrl" TEXT,
ALTER COLUMN "resumeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("resumeId") ON DELETE SET NULL ON UPDATE CASCADE;
