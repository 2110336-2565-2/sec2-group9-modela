import { RefundStatus } from '@modela/database'
import {
  ApplicationStatus,
  GetPendingActorDebitsByJobDto,
  GetPendingJobsDebitsDto,
  JobStatus,
} from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class DebitRepository {
  constructor(private prisma: PrismaService) {}
  async markAsPaid(applicationId: number) {
    await this.prisma.application.update({
      where: { applicationId },
      data: { isPaid: true },
    })
  }

  // TODO: any one who work with refund API should move this to refund repository
  async getRefundByApplicationId(applicationId: number) {
    return await this.prisma.refund.findFirst({
      where: { applicationId },
    })
  }

  async getPendingJobsDebits(): Promise<GetPendingJobsDebitsDto[]> {
    const jobs = await this.prisma.job.findMany({
      where: {
        status: JobStatus.FINISHED,
        Application: {
          some: {
            isPaid: false,
            status: ApplicationStatus.OFFER_ACCEPTED,
            Refund: { none: {} },
          },
        },
      },
      include: {
        Application: true,
        Casting: {
          include: {
            User: true,
          },
        },
      },
    })

    const resultJobs = jobs.map((job) => ({
      jobId: job.jobId,
      title: job.title,
      companyName: job.Casting.companyName,
      firstname: job.Casting.User.firstName,
      castingId: job.castingId,
      profileImageUrl: job.Casting.User.profileImageUrl,
    }))
    return resultJobs
  }

  async getPendingDebitsByJobId(
    jobId: number,
    jobTitle: string,
  ): Promise<GetPendingActorDebitsByJobDto> {
    const applications = await this.prisma.application.findMany({
      where: {
        jobId,
        isPaid: false,
        status: ApplicationStatus.OFFER_ACCEPTED,
        Refund: {
          //check refund status is not ACCEPTED
          every: {
            refundStatus: {
              not: RefundStatus.ACCEPTED,
            },
          },
        },
      },
      include: {
        Actor: {
          include: {
            User: true,
          },
        },
        Refund: true,
      },
    })
    const resultActor = applications.map((application) => ({
      actorId: application.Actor.actorId,
      firstName: application.Actor.User.firstName,
      middleName: application.Actor.User.middleName,
      lastName: application.Actor.User.lastName,
      profileImageUrl: application.Actor.User.profileImageUrl,
      bankName: application.Actor.User.bankName,
      bankAccount: application.Actor.User.bankAccount,
    }))
    const result: GetPendingActorDebitsByJobDto = {
      jobId: jobId,
      title: jobTitle,
      actorList: resultActor,
    }
    return result
  }
}
