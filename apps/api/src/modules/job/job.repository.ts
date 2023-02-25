import { ApplicationStatus, Job, JobStatus, Prisma } from '@modela/database'
import {
  CreateJobDto,
  EditJobDto,
  GetJobCardByAdminDto,
  GetJobCardDto,
  GetJobDto,
  JobSummaryDto,
} from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class JobRepository {
  constructor(private prisma: PrismaService) {}

  async createJob(createJobDto: CreateJobDto, userId: number) {
    const { shooting, ...field } = createJobDto
    const job = await this.prisma.job.create({
      data: {
        status: JobStatus.OPEN,
        castingId: userId,
        ...field,
        Shooting: {
          create: shooting,
        },
      },
    })
    return { jobId: job.jobId }
  }

  async updateJob(id: number, updateJobDto: EditJobDto) {
    const { shooting, ...field } = updateJobDto

    const updatedJob = await this.prisma.job.update({
      where: { jobId: id },
      data: {
        ...field,
        Shooting: {
          deleteMany: {},
          create: shooting,
        },
      },
    })
    return { jobId: updatedJob.jobId }
  }

  async updateJobStatus(id: number, status: JobStatus) {
    const updatedJob = await this.prisma.job.update({
      where: { jobId: id },
      data: {
        status,
      },
    })
    return { jobId: updatedJob.jobId }
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
      orderBy: {
        jobId: Prisma.SortOrder.desc,
      },
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
      castingId: job.castingId,
      castingName: job.Casting.User.firstName,
    }))
    return selectedFields
  }

  async getJobJoinedByAdmin(params: {
    skip?: number
    take?: number
    cursor?: Prisma.JobWhereUniqueInput
    where?: Prisma.JobWhereInput
    orderBy?: Prisma.JobOrderByWithRelationInput
  }): Promise<GetJobCardByAdminDto[]> {
    //generate join casting and user table params
    const paramsWithInclude = {
      ...params,
      orderBy: {
        jobId: Prisma.SortOrder.desc,
      },
      include: {
        Casting: {
          include: {
            User: true,
          },
        },
        Shooting: true,
        Report: true,
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
      castingId: job.castingId,
      castingName: job.Casting.User.firstName,
      isReported: job.Report.length > 0,
    }))
    return selectedFields
  }

  async getJobApplied(
    statusQuery: JobStatus[],
    applicationStatus: ApplicationStatus[],
    userId: number,
  ): Promise<(GetJobCardDto & { ApplicationStatus })[]> {
    const jobs = await this.prisma.job.findMany({
      orderBy: {
        jobId: Prisma.SortOrder.desc,
      },
      include: {
        Casting: {
          include: {
            User: true,
          },
        },
        Shooting: true,
        Application: true,
      },
      where: {
        status: {
          in: statusQuery,
        },
        Application: {
          some: {
            actorId: userId,
          },
        },
      },
    })

    const jobsWithApplicationStatus = []
    //check only lastest application status
    for (const job of jobs) {
      //check if lastest application status is in applicationStatus
      const applicationStatusList = []
      for (const application of job.Application) {
        if (application.actorId === userId)
          applicationStatusList.push(application.status)
      }
      if (
        applicationStatus.includes(
          applicationStatusList[applicationStatusList.length - 1],
        )
      ) {
        jobsWithApplicationStatus.push({
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
          castingId: job.castingId,
          castingName: job.Casting.User.firstName,
          ApplicationStatus:
            applicationStatusList[applicationStatusList.length - 1],
        })
      }
    }
    return jobsWithApplicationStatus
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
      castingName: Casting.User.firstName,
    }
  }

  async getBaseJobById(id: number): Promise<Job> {
    return this.prisma.job.findUnique({
      where: { jobId: id },
    })
  }

  async getJobSummaryById(
    jobId: number,
  ): Promise<JobSummaryDto & { castingId: number }> {
    const job = await this.prisma.job.findUnique({
      where: { jobId },
      select: { status: true, castingId: true },
    })

    if (!job) return null

    const pendingActorCount = await this.prisma.application.count({
      where: {
        jobId,
        status: ApplicationStatus.PENDING,
      },
    })

    return {
      castingId: job.castingId,
      status: job.status,
      pendingActorCount,
    }
  }
}
