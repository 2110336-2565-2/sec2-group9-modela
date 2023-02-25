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
    const reports = await this.prisma.report.findMany({
      where: {
        jobId: jobId,
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
        status: 'CANCELLED',
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
