import { RefundStatus } from '@modela/database'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class RefundRepository {
  constructor(private prisma: PrismaService) {}

  async getRefundByApplicationId(applicationId: number) {
    return await this.prisma.refund.findUnique({
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

  async rejectRefund(refundId: number) {
    //delete refund
    const deletedRefund = await this.prisma.refund.delete({
      where: { refundId },
    })
    return deletedRefund
  }
}
