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
}
