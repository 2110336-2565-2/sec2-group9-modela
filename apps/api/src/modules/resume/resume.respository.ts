import { JwtDto, PostResumeDto } from '@modela/dtos'
import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class ResumeRepository {
  constructor(private prisma: PrismaService) {}

  async createResume(postResumeDto: PostResumeDto, user: JwtDto) {
    const actor = await this.prisma.actor.findUnique({
      where: { actorId: user.userId },
    })
    if (!actor) {
      throw new NotFoundException('Actor not found')
    }
    const resume = await this.prisma.resume.create({
      data: {
        ...postResumeDto,
        Actor: {
          connect: {
            actorId: user.userId,
          },
        },
      },
    })

    return { resumeId: resume.resumeId }
  }
}
