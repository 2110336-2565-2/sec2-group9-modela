import { ActorDto, GetAppliedActorQuery } from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class ApplicationRepository {
  constructor(private prisma: PrismaService) {}

  async getApplicationByJobId(
    jobId: number,
    query: GetAppliedActorQuery,
  ): Promise<ActorDto[]> {
    console.log(query)
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
}
