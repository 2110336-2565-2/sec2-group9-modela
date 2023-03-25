import {
  ApplicationStatus,
  Casting,
  JobStatus,
  Prisma,
  User,
  UserStatus,
} from '@modela/database'
import {
  GetJobCardDto,
  PendingUserDto,
  UpdateUserStatusDto,
} from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

import { FileService } from '../file/file.service'

@Injectable()
export class UserRepository {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  async getUserById(userId: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { userId },
    })
  }

  async getCastingById(castingId: number): Promise<Casting> {
    return await this.prisma.casting.findUnique({
      where: { castingId },
    })
  }

  async getPendingUsers(): Promise<PendingUserDto[]> {
    const users = await this.prisma.user.findMany({
      orderBy: {
        updatedAt: Prisma.SortOrder.asc,
      },
      include: {
        Casting: true,
        Actor: true,
      },
      where: {
        status: UserStatus.PENDING,
      },
    })
    const pendingUsers = users.map(async (user) => ({
      type: user.type,
      data: {
        userId: user.userId,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        ...(user.Casting && {
          companyName: user.Casting.companyName,
          companyId: user.Casting.companyId,
          employmentCertUrl: await this.fileService.getDownloadUrl(
            user.Casting.employmentCertUrl,
          ),
        }),
        ...(user.Actor && {
          idCardImageUrl: await this.fileService.getDownloadUrl(
            user.Actor.idCardImageUrl,
          ),
          ssn: user.Actor.ssn,
        }),
      },
    }))
    return await Promise.all(pendingUsers)
  }

  async updateUserStatus(
    userId: number,
    updateUserStatusDto: UpdateUserStatusDto,
  ): Promise<PendingUserDto> {
    //update user status
    const updatedUser = await this.prisma.user.update({
      where: { userId },
      data: {
        status: updateUserStatusDto.status,
        rejectedReason: updateUserStatusDto.rejectedReason,
      },
      include: {
        Casting: true,
        Actor: true,
      },
    })
    const respondUpdatedUser = {
      type: updatedUser.type,
      data: {
        userId: updatedUser.userId,
        firstName: updatedUser.firstName,
        middleName: updatedUser.middleName,
        lastName: updatedUser.lastName,
        rejectedReason: updatedUser.rejectedReason,
        ...(updatedUser.Casting && {
          companyName: updatedUser.Casting.companyName,
          companyId: updatedUser.Casting.companyId,
          employmentCertUrl: await this.fileService.getDownloadUrl(
            updatedUser.Casting.employmentCertUrl,
          ),
        }),
        ...(updatedUser.Actor && {
          idCardImageUrl: await this.fileService.getDownloadUrl(
            updatedUser.Actor.idCardImageUrl,
          ),
          ssn: updatedUser.Actor.ssn,
        }),
      },
    }
    return respondUpdatedUser
  }

  async getActorsWorkHistory(paramId: number): Promise<GetJobCardDto[]> {
    const jobs = await this.prisma.job.findMany({
      orderBy: {
        jobId: Prisma.SortOrder.desc,
      },
      where: {
        status: JobStatus.FINISHED,
        Application: {
          some: {
            actorId: paramId,
            status: ApplicationStatus.OFFER_ACCEPTED,
          },
        },
      },
      include: {
        Casting: {
          include: {
            User: true,
          },
        },
      },
    })

    const returnJobs = jobs.map((job) => ({
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

    return returnJobs
  }

  async getCastingWorkHistory(paramId: number): Promise<GetJobCardDto[]> {
    const jobs = await this.prisma.job.findMany({
      orderBy: {
        jobId: Prisma.SortOrder.desc,
      },
      where: {
        castingId: paramId,
        status: JobStatus.FINISHED,
      },
      include: {
        Casting: {
          include: {
            User: true,
          },
        },
      },
    })

    const returnJobs = jobs.map((job) => ({
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

    return returnJobs
  }
}
