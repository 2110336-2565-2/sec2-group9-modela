import { JobStatus } from '@modela/database'
import { GetJobCardDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class CreditRepository {
  constructor(private prisma: PrismaService) {}

  async getUnpaidJob(castingId: number): Promise<GetJobCardDto[]> {
    const jobs = await this.prisma.job.findMany({
      where: {
        castingId,
        status: JobStatus.SELECTION_ENDED,
        isPaid: false,
      },
      select: {
        jobId: true,
        title: true,
        wage: true,
        gender: true,
        actorCount: true,
        status: true,
        description: true,
        applicationDeadline: true,

        Casting: {
          select: {
            castingId: true,
            companyName: true,
            User: {
              select: {
                firstName: true,
                profileImageUrl: true,
              },
            },
          },
        },
      },
    })

    return jobs.map(({ Casting: { User, ...casting }, ...job }) => ({
      ...job,
      ...casting,
      jobCastingImageUrl: User.profileImageUrl,
      castingName: User.firstName,
    }))
  }

  async getPendingTransactions() {
    const credits = await this.prisma.credit.findMany({
      select: {
        jobId: true,
        proofUrl: true,
        amount: true,
        Job: {
          select: {
            castingId: true,
            title: true,
            Casting: {
              select: {
                companyName: true,
                User: {
                  select: {
                    firstName: true,
                    middleName: true,
                    lastName: true,
                    bankName: true,
                    bankAccount: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return credits
  }

  async getPendingCreditByJob(jobId: number) {
    return await this.prisma.credit.findUnique({
      where: {
        jobId,
      },
    })
  }

  async removeCreditTransaction(jobId: number) {
    return await this.prisma.credit.delete({
      where: {
        jobId,
      },
    })
  }
}
