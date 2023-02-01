-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ACTOR', 'CASTING', 'ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'LGBTQ');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('OPEN', 'SELECTING', 'SELECTION_ENDED', 'FINISHED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'OFFER_SENT', 'REJECTED', 'OFFER_ACCEPTED', 'OFFER_REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "UserType" NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileImageUrl" TEXT,
    "phoneNumber" TEXT,
    "bankName" TEXT,
    "bankAccount" TEXT,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Actor" (
    "actorId" INTEGER NOT NULL,
    "idCardImageUrl" TEXT NOT NULL,
    "age" INTEGER,
    "prefix" TEXT,
    "nickname" TEXT,
    "nationality" TEXT,
    "ssn" TEXT,
    "gender" "Gender",
    "ethnicity" TEXT,
    "birthDate" TIMESTAMP(3),
    "religion" TEXT,
    "description" TEXT,
    "hairColor" TEXT,
    "eyeColor" TEXT,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "bust" DOUBLE PRECISION,
    "waist" DOUBLE PRECISION,
    "hips" DOUBLE PRECISION,
    "shoeSize" INTEGER,
    "skinShade" TEXT,
    "bodyModifications" TEXT,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("actorId")
);

-- CreateTable
CREATE TABLE "Casting" (
    "castingId" INTEGER NOT NULL,
    "companyId" TEXT NOT NULL,
    "employmentCertUrl" TEXT NOT NULL,

    CONSTRAINT "Casting_pkey" PRIMARY KEY ("castingId")
);

-- CreateTable
CREATE TABLE "Resume" (
    "resumeId" SERIAL NOT NULL,
    "actorId" INTEGER NOT NULL,
    "resumeUrl" TEXT NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("resumeId")
);

-- CreateTable
CREATE TABLE "Job" (
    "jobId" SERIAL NOT NULL,
    "castingId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL,
    "role" TEXT NOT NULL,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "actorCount" INTEGER NOT NULL,
    "wage" INTEGER NOT NULL,
    "workStartDate" TIMESTAMP(3) NOT NULL,
    "workEndDate" TIMESTAMP(3) NOT NULL,
    "applicationDeadline" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("jobId")
);

-- CreateTable
CREATE TABLE "Application" (
    "applicationId" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "actorId" INTEGER NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "status" "ApplicationStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("applicationId")
);

-- CreateTable
CREATE TABLE "Report" (
    "reportId" SERIAL NOT NULL,
    "reporterId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("reportId")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notificationId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notificationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Actor" ADD CONSTRAINT "Actor_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Casting" ADD CONSTRAINT "Casting_castingId_fkey" FOREIGN KEY ("castingId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("actorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_castingId_fkey" FOREIGN KEY ("castingId") REFERENCES "Casting"("castingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("jobId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("actorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("resumeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("jobId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
