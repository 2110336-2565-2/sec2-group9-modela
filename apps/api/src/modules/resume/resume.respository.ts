import { Actor } from '@modela/database'
import { JwtDto, PostResumeDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class ResumeRepository {
  constructor(private prisma: PrismaService) {}

  async getActorFromUser(user: JwtDto) {
    const actor = await this.prisma.actor.findUnique({
      where: { actorId: user.userId },
    })
    return actor
  }

  async createResume(
    postResumeDto: PostResumeDto,
    actor: Actor,
    userId: number,
  ) {
    const resume = await this.prisma.resume.create({
      data: {
        ...postResumeDto,
        Actor: {
          connect: {
            actorId: userId,
          },
        },
      },
    })

    return { resumeId: resume.resumeId }
  }
}
