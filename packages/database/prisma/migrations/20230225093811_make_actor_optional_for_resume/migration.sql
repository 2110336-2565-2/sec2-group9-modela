-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_actorId_fkey";

-- AlterTable
ALTER TABLE "Resume" ALTER COLUMN "actorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("actorId") ON DELETE SET NULL ON UPDATE CASCADE;
