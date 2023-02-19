import { Casting, Prisma, User, UserStatus } from '@modela/database'
import { PendingUserDto, UpdateUserStatusDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

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
    const pendingUsers = users.map((user) => ({
      type: user.type,
      data: {
        userId: user.userId,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        ...(user.Casting && {
          companyName: user.Casting.companyName,
          companyId: user.Casting.companyId,
          employmentCertUrl: user.Casting.employmentCertUrl,
        }),
        ...(user.Actor && {
          idCardImageUrl: user.Actor.idCardImageUrl,
          ssn: user.Actor.ssn,
        }),
      },
    }))
    return pendingUsers
  }

  async updateUserStatus(
    userId: number,
    updateUserStatusDto: UpdateUserStatusDto,
  ): Promise<User> {
    //accept user
    return await this.prisma.user.update({
      where: { userId },
      data: {
        status: updateUserStatusDto.status,
      },
    })
  }
}
