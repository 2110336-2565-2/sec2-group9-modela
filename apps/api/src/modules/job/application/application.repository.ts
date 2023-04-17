import {
  ActorDto,
  ApplicationStatus,
  GetAppliedActorQuery,
  JobStatus,
} from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class ApplicationRepository {
  constructor(private prisma: PrismaService) {}

  async getApplicationByJobId(
    jobId: number,
    query: GetAppliedActorQuery,
  ): Promise<ActorDto[]> {
    const application = await this.prisma.application.findMany({
      where: { jobId, status: { in: query.status } },
      select: {
        Actor: {
          select: {
            User: {
              select: {
                firstName: true,
                middleName: true,
                lastName: true,
                profileImageUrl: true,
              },
            },
          },
        },
        Job: {
          select: {
            status: true,
          },
        },
        Resume: {
          select: {
            resumeUrl: true,
          },
        },
        status: true,
        actorId: true,
        applicationId: true,
        rating: true,
        Refund: true,
      },
    })

    let result = application.map(
      ({
        Actor: { User },
        Resume,
        Refund,
        status,
        Job: { status: jobStatus },
        rating,
        ...rest
      }) => ({
        ...rest,
        ...User,
        ...Resume,
        status,
        rating: jobStatus === JobStatus.FINISHED ? rating : undefined,
        isRefundable: !Refund && status === ApplicationStatus.OFFER_ACCEPTED,
      }),
    )

    if (query.name && query.name !== '') {
      result = result.filter(({ firstName, middleName, lastName }) =>
        `${firstName} ${middleName} ${lastName}`
          .toLocaleLowerCase()
          .includes(query.name.toLocaleLowerCase()),
      )
    }

    return result
  }

  async getApplicationbyActorJob(actorId: number, jobId: number) {
    return await this.prisma.application.findFirst({
      where: {
        actorId,
        jobId,
      },
    })
  }

  async createApplication(actorId: number, jobId: number, resumeId: number) {
    return await this.prisma.application.create({
      data: {
        actorId,
        jobId,
        resumeId,
        status: ApplicationStatus.PENDING,
      },
    })
  }

  async deleteApplication(applicationId: number) {
    return await this.prisma.application.delete({
      where: { applicationId },
    })
  }

  async rejectApplication(applicationId: number) {
    return await this.prisma.application.update({
      where: { applicationId },
      data: { status: ApplicationStatus.REJECTED },
    })
  }

  async updateApplicationStatus(
    applicationId: number,
    status: ApplicationStatus,
  ) {
    await this.prisma.application.update({
      where: {
        applicationId: applicationId,
      },
      data: {
        status: status,
      },
    })
    return
  }

  async rateActor(applicationId: number, rating: number) {
    await this.prisma.application.update({
      where: {
        applicationId,
      },
      data: {
        rating: rating,
      },
    })
  }
}
