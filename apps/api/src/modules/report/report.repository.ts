import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

import { ReportPostData } from './report.type'

@Injectable()
export class ReportRepository {
  constructor(private prisma: PrismaService) {}

  async createReport(payload: ReportPostData) {
    const { jobID, userID, reason } = payload
    await this.prisma.report.create({
      data: {
        jobId: jobID,
        reporterId: userID,
        reason: reason,
      },
    })
  }
}
