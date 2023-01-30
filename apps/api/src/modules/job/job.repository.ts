import { Injectable } from '@nestjs/common'
import { Casting, Job, Prisma } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'

import { GetJobCardDto } from './job.dto'

@Injectable()
export class JobRepository {
  constructor(private prisma: PrismaService) {}

  async getJob(params: {
    skip?: number
    take?: number
    cursor?: Prisma.JobWhereUniqueInput
    where?: Prisma.JobWhereInput
    orderBy?: Prisma.JobOrderByWithRelationInput
  }): Promise<Job[]> {
    return this.prisma.job.findMany(params)
  }

  async getJobJoined(params: {
    skip?: number
    take?: number
    cursor?: Prisma.JobWhereUniqueInput
    where?: Prisma.JobWhereInput
    orderBy?: Prisma.JobOrderByWithRelationInput
  }): Promise<GetJobCardDto[]> {
    //join casting and user table
    const paramsWithInclude = {
      ...params,
      include: {
        Casting: {
          include: {
            User: true,
          },
        },
      },
    }
    //get data
    const jobs = await this.prisma.job.findMany(paramsWithInclude)
    //unwind joined tables
    const unwoundJobs = jobs.map((job) => {
      const casting = job.Casting
      const user = casting.User
      return {
        ...job,
        ...casting,
        ...user,
      }
    })
    //select fields of GetJobDto
    const selectedFields = unwoundJobs.map((job) => ({
      jobId: job.jobId,
      title: job.title,
      companyName: job.companyName,
      description: job.description,
      status: job.status,
      actorCount: job.actorCount,
      gender: job.gender,
      wage: job.wage,
      applicationDeadline: job.applicationDeadline,
      jobCastingImageUrl: job.profileImageUrl,
    }))
    return selectedFields
  }
}
