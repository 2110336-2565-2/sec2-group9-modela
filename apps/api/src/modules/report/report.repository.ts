import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class ReportRepository {
  constructor(private prisma: PrismaService) {}

  async createReport(jobID: number, userID: number, reason: string) {
    await this.prisma.report.create({
      data: {
        jobId: jobID,
        reporterId: userID,
        reason: reason,
      },
    })
  }
}
