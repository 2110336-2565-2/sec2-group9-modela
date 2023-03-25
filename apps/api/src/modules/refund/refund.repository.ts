import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class RefundRepository {
  constructor(private prisma: PrismaService) {}

  async getRefundByApplicationId(applicationId: number) {
    return await this.prisma.refund.findFirst({
      where: { applicationId },
    })
  }

  async acceptRefund(jobId: number, actorId: number) {
    //TODO accept refund
    return { jobId, actorId }
  }
}
