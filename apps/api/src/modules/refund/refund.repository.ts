import { RefundStatus } from '@modela/database'
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

  async acceptRefund(refundId: number) {
    //update refund status to accepted
    const updatedRefund = await this.prisma.refund.update({
      where: { refundId },
      data: { refundStatus: RefundStatus.ACCEPTED },
    })
    return updatedRefund
  }
}
