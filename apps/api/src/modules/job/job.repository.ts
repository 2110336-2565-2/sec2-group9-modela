import { Job, JobStatus, Prisma } from '@modela/database'
import {
  CreateJobDto,
  GetJobCardDto,
  GetJobDto,
  ShootingDto,
} from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class JobRepository {
  constructor(private prisma: PrismaService) {}

  async createJob(createJobDto: CreateJobDto, userId: number) {
    const job = await this.prisma.job.create({
      data: {
        title: createJobDto.title,
        description: createJobDto.description,
        status: JobStatus.OPEN,
        role: createJobDto.role,
        minAge: createJobDto.minAge,
        maxAge: createJobDto.maxAge,
        gender: createJobDto.gender,
        wage: createJobDto.wage,
        actorCount: createJobDto.actorCount,
        applicationDeadline: createJobDto.applicationDeadline,
        castingId: userId,
        Shooting: {
          create: createJobDto.shooting.map((shooting) => ({
            startDate: shooting.startDate,
            endDate: shooting.endDate,
            startTime: shooting.startTime,
            endTime: shooting.endTime,
            shootingLocation: shooting.shootingLocation,
          })),
        },
      },
    })
  }

  async getJobCount(params: {
    skip?: number
    take?: number
    cursor?: Prisma.JobWhereUniqueInput
    where?: Prisma.JobWhereInput
    orderBy?: Prisma.JobOrderByWithRelationInput
  }): Promise<number> {
    //get count of data query be params.where
    const count = await this.prisma.job.count(params)
    return count
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
        Shooting: true,
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

  async getJobById(id: number): Promise<GetJobDto & { castingId: number }> {
    const job = await this.prisma.job.findUnique({
      where: { jobId: id },
      include: {
        Casting: {
          include: {
            User: true,
          },
        },
        Shooting: true,
      },
    })

    if (!job) return null

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { Casting, Shooting, createdAt, updatedAt, ...rest } = job

    return {
      ...rest,
      shooting: Shooting,
      companyName: Casting.companyName,
      jobCastingImageUrl: Casting.User.profileImageUrl,
    }
  }
}
