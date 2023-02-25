import { Resume } from '@modela/database'
import { PostResumeDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class ResumeRepository {
  constructor(private prisma: PrismaService) {}

  async createResume(postResumeDto: PostResumeDto, userId: number) {
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

  async getResumeById(resumeId: number) {
    const resume = await this.prisma.resume.findUnique({
      where: { resumeId },
    })

    return resume
  }

  async getResumesByActorId(actorId: number) {
    const resumes = await this.prisma.resume.findMany({
      where: { actorId },
    })
    return { resumes }
  }

  async deleteResume(resumeId: number): Promise<Resume> {
    const deleteResumeId = Number(resumeId)
    const resume = await this.prisma.resume.delete({
      where: { resumeId: deleteResumeId },
    })
    return resume
  }
}
