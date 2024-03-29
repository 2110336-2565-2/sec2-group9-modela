import {
  ApplicationStatus,
  Job,
  JobStatus,
  Prisma,
  UserType,
} from '@modela/database'
import {
  CreateJobDto,
  EditJobDto,
  GetAppliedJobDto,
  GetJobCardByAdminDto,
  GetJobCardDto,
  GetJobDto,
  JobSummaryDto,
  JwtDto,
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

  async confirmJobCredit(jobId: number) {
    const updatedJob = await this.prisma.job.update({
      where: { jobId },
      data: {
        isPaid: true,
      },
    })
    return { jobId: updatedJob.jobId }
  }

  async updateJobStatus(id: number, updateStatus: JobStatus) {
    const updatedJob = await this.prisma.job.update({
      where: { jobId: id },
      data: {
        status: updateStatus,
      },
    })
    //update application status
    await this.prisma.application.updateMany({
      where: {
        jobId: id,
        Job: {
          status: {
            in: [JobStatus.SELECTION_ENDED, JobStatus.CANCELLED],
          },
        },
        status: {
          in: [ApplicationStatus.PENDING, ApplicationStatus.OFFER_SENT],
        },
      },

      data: {
        status: ApplicationStatus.REJECTED,
      },
    })
    await this.prisma.application.updateMany({
      where: {
        jobId: id,
        Job: {
          status: JobStatus.CANCELLED,
        },
        status: ApplicationStatus.OFFER_ACCEPTED,
      },
      data: {
        status: ApplicationStatus.REJECTED,
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

  async getJobJoined(
    params: {
      skip?: number
      take?: number
      cursor?: Prisma.JobWhereUniqueInput
      where?: Prisma.JobWhereInput
      orderBy?: Prisma.JobOrderByWithRelationInput
    },
    user: JwtDto,
  ): Promise<GetJobCardDto[]> {
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
        Application: {
          where: {
            actorId: user.userId,
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
      castingId: job.castingId,
      castingName: job.Casting.User.firstName,
      isApplied:
        user.type === UserType.ACTOR ? job.Application.length > 0 : undefined,
      isPaid: user.type === UserType.CASTING ? job.isPaid : undefined,
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
      isPaid: job.isPaid,
    }))
    return selectedFields
  }

  async getJobApplied(
    titleSearch: string,
    statusQuery: JobStatus[],
    applicationStatus: ApplicationStatus[],
    userId: number,
  ): Promise<GetAppliedJobDto[]> {
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
        Application: {
          where: {
            actorId: userId,
          },
        },
      },
      where: {
        status: {
          in: statusQuery,
        },
        Application: {
          some: {
            actorId: userId,
            status: {
              in: applicationStatus,
            },
          },
        },
        title: titleSearch
          ? {
              contains: titleSearch,
              mode: 'insensitive',
            }
          : undefined,
      },
    })
    const jobsWithApplicationStatus = jobs.map((job) => ({
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
      appliedStatus: job.Application[0].status,
      isPaid: job.isPaid,
    }))

    return jobsWithApplicationStatus
  }

  async getJobById(
    id: number,
    user: JwtDto,
  ): Promise<GetJobDto & { castingId: number }> {
    const job = await this.prisma.job.findUnique({
      where: { jobId: id },
      include: {
        Casting: {
          include: {
            User: true,
          },
        },
        Application: {
          where: {
            actorId: user.userId,
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
      isApplied:
        user.type === UserType.ACTOR ? job.Application.length > 0 : undefined,
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
      select: { status: true, castingId: true, isPaid: true },
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
      isPaid: job.isPaid,
      pendingActorCount,
    }
  }

  async getActorCount(jobId: number) {
    return await this.prisma.application.count({
      where: {
        jobId,
        status: ApplicationStatus.OFFER_ACCEPTED,
      },
    })
  }
}
