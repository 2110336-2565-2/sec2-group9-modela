import { Casting, Prisma, User, UserStatus } from '@modela/database'
import { PendingUserDto, UpdateUserStatusDto } from '@modela/dtos'
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
}
