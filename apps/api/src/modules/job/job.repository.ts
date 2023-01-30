import { Injectable } from '@nestjs/common'
import { Job, Prisma } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'

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
}
