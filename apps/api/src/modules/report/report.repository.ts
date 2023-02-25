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
}
