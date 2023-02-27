import { JobStatus } from '@modela/database'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class ReportRepository {
  constructor(private prisma: PrismaService) {}

  async createReport(jobId: number, userId: number, reason: string) {
    await this.prisma.report.create({
      data: {
        jobId: jobId,
        reporterId: userId,
        reason: reason,
      },
    })
  }

  async getReports(jobId: number) {
    // get reports excluding its createdAt
    const reports = await this.prisma.report.findMany({
      where: {
        jobId: jobId,
      },
      select: {
        reportId: true,
        reporterId: true,
        reason: true,
        User: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    })
    return {
      reports: reports,
      jobId: jobId,
    }
  }

  async cancelJob(jobId: number) {
    await this.prisma.report.deleteMany({
      where: {
        jobId: jobId,
      },
    })
    await this.prisma.job.update({
      where: {
        jobId: jobId,
      },
      data: {
        status: JobStatus.CANCELLED,
      },
    })
    return { jobId: jobId }
  }

  async rejectReportForJob(jobId: number) {
    await this.prisma.report.deleteMany({
      where: {
        jobId: jobId,
      },
    })
    return { jobId: jobId }
  }
}
