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
    const resume = await this.prisma.resume.findUnique({
      where: { resumeId },
      include: { Application: true },
    })
    if (resume.Application.length > 0) {
      //have application -> actorId = null and remove from actor
      const deleteResumeId = Number(resumeId)
      const deletedResume = await this.prisma.resume.update({
        where: { resumeId: deleteResumeId },
        data: {
          actorId: null,
        },
      })
      return deletedResume
    } else {
      //not have any application -> directly delete
      const deleteResumeId = Number(resumeId)
      const deletedResume = await this.prisma.resume.delete({
        where: { resumeId: deleteResumeId },
      })
      return deletedResume
    }
  }
}
