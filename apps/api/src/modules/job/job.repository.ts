import { Injectable } from '@nestjs/common'
import { Casting, Job, Prisma } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'

import { GetJobCardDto } from './job.dto'

@Injectable()
export class JobRepository {
  constructor(private prisma: PrismaService) {}

  async getJobCount(): Promise<number> {
    return await this.prisma.job.count()
  }

  async getJobJoined(params: {
    skip?: number
    take?: number
    cursor?: Prisma.JobWhereUniqueInput
    where?: Prisma.JobWhereInput
    orderBy?: Prisma.JobOrderByWithRelationInput
  }): Promise<GetJobCardDto[]> {
    //generate join casting and user table params
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
    //select fields of GetJobDto
    const selectedFields = jobs.map((job) => ({
      jobId: job.jobId,
      title: job.title,
      companyName: job.Casting.companyName,
      description: job.description,
      status: job.status,
      actorCount: job.actorCount,
      gender: job.gender,
      wage: job.wage,
      applicationDeadline: job.applicationDeadline,
      jobCastingImageUrl: job.Casting.User.profileImageUrl,
    }))
    return selectedFields
  }
}
