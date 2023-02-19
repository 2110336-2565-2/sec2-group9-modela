import { ActorDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class ApplicationRepository {
  constructor(private prisma: PrismaService) {}

  async getApplicationByJobId(jobId: number): Promise<ActorDto[]> {
    const application = await this.prisma.application.findMany({
      where: { jobId },
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
        resumeId: true,
        actorId: true,
      },
    })

    return application.map(({ Actor: { User }, ...rest }) => ({
      ...rest,
      ...User,
    }))
  }
}
