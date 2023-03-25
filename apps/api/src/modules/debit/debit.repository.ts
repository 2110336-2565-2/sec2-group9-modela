import {
  ApplicationStatus,
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
        status: JobStatus.SELECTION_ENDED,
        Application: {
          some: {
            isPaid: false,
            status: ApplicationStatus.OFFER_ACCEPTED,
          },
        },
      },
      include: {
        Application: true,
        Casting: true,
      },
    })

    const resultJobs = jobs.map((job) => ({
      jobId: job.jobId,
      title: job.title,
      companyName: job.Casting.companyName,
    }))
    return resultJobs
  }
}
