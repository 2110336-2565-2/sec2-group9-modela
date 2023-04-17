import { RefundStatus } from '@modela/database'
import { SendRefundDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class RefundRepository {
  constructor(private prisma: PrismaService) {}

  async getPendingRefunds() {
    const refunds = await this.prisma.refund.findMany({
      where: { refundStatus: RefundStatus.PENDING },
      select: {
        reason: true,
        proofUrl: true,
        Application: {
          select: {
            Actor: {
              select: {
                actorId: true,
                User: {
                  select: {
                    firstName: true,
                    middleName: true,
                    lastName: true,
                  },
                },
              },
            },
            Job: {
              select: {
                jobId: true,
                title: true,
                wage: true,
                Casting: {
                  select: {
                    castingId: true,
                    companyName: true,
                    User: {
                      select: {
                        firstName: true,
                        middleName: true,
                        lastName: true,
                        profileImageUrl: true,
                        bankName: true,
                        bankAccount: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })

    return refunds.map((refund) => {
      const { reason, proofUrl } = refund
      const { jobId, title, wage } = refund.Application.Job
      const { castingId, companyName } = refund.Application.Job.Casting
      const {
        firstName,
        middleName,
        lastName,
        profileImageUrl,
        bankAccount,
        bankName,
      } = refund.Application.Job.Casting.User
      const {
        firstName: actorFirstName,
        middleName: actorMiddleName,
        lastName: actorLastName,
      } = refund.Application.Actor.User
      const { actorId } = refund.Application.Actor
      const casting = {
        firstName,
        middleName,
        lastName,
        castingId,
        profileImageUrl,
        companyName,
        bankAccount,
        bankName,
      }
      const actor = {
        firstName: actorFirstName,
        middleName: actorMiddleName,
        lastName: actorLastName,
        actorId,
      }
      return { reason, proofUrl, casting, jobId, title, actor, wage }
    })
  }

  async sendRefund(applicationId: number, data: SendRefundDto) {
    await this.prisma.refund.create({
      data: {
        applicationId,
        refundStatus: RefundStatus.PENDING,
        ...data,
      },
    })
  }

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

  async removeRefundsFromJob(jobId: number) {
    await this.prisma.refund.deleteMany({
      where: {
        Application: {
          jobId,
        },
      },
    })
  }
}
