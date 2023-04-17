/*
  Warnings:

  - The values [ACCEPTOFFER,REJECTOFFER,RECEIVEOFFER,CANCELJOB,APPROVEREFUND,REJECTREFUND] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('ACCEPT_OFFER', 'REJECT_OFFER', 'RECEIVE_OFFER', 'CANCEL_JOB', 'APPROVE_REFUND', 'REJECT_REFUND');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "NotificationType_old";
COMMIT;
