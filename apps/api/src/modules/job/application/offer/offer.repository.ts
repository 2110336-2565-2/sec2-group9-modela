import { ApplicationStatus } from '@modela/database'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class OfferRepository {
  constructor(private prisma: PrismaService) {}

  async updateApplicationStatus(
    applicationId: number,
    status: ApplicationStatus,
  ) {
    await this.prisma.application.update({
      where: {
        applicationId: applicationId,
      },
      data: {
        status: status,
      },
    })
    return
  }

  async getJobById(jobId: number) {
    return await this.prisma.job.findFirst({
      where: {
        jobId: jobId,
      },
    })
  }
}
