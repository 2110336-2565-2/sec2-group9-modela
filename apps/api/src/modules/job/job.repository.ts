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

  async getJobJoinCasting(params: {
    skip?: number
    take?: number
    cursor?: Prisma.JobWhereUniqueInput
    where?: Prisma.JobWhereInput
    orderBy?: Prisma.JobOrderByWithRelationInput
  }): Promise<GetJobCardDto[]> {
    //join casting table
    const jobs = await this.prisma.job.findMany({
      include: {
        Casting: true,
      },
    })
    //unwind casting
    const unwoundJobs = jobs.map((job) => {
      const casting = job.Casting
      return {
        ...job,
        ...casting,
      }
    })
    //remove Casting, companyId, employmentCertUrl out of unwoundJobs
    unwoundJobs.forEach((job) => {
      delete job.Casting
      delete job.companyId
      delete job.employmentCertUrl
    })
    return unwoundJobs
  }
}
