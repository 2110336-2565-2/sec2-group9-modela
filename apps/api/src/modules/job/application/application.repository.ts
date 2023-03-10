import { ActorDto, ApplicationStatus, GetAppliedActorQuery } from '@modela/dtos'
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
        Resume: {
          select: {
            resumeUrl: true,
          },
        },
        status: true,
        actorId: true,
        applicationId: true,
      },
    })

    let result = application.map(({ Actor: { User }, Resume, ...rest }) => ({
      ...rest,
      ...User,
      ...Resume,
    }))

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
}
