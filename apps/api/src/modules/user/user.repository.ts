import { Casting, Prisma, User, UserType } from '@modela/database'
import { PendingUserDto } from '@modela/dtos'
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

  async getUsers(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    return await this.prisma.user.findMany({
      ...params,
    })
  }

  async getPendingUsers(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<PendingUserDto[]> {
    const users = await this.prisma.user.findMany({
      ...params,
      orderBy: {
        userId: Prisma.SortOrder.desc,
      },
      include: {
        Casting: true,
        Actor: true,
      },
      //TODO: filter ??????????????????
    })
    const pendingUsers: PendingUserDto[] = []
    for (let i = 0; i < users.length; i++) {
      const user = users[i]
      console.log(user)
      const aPendingUser = {
        userId: user.userId,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        type: user.Casting ? UserType.CASTING : UserType.ACTOR, //TODO: does we need to verify admin?
      }
      /*
      if(user.Casting) {
        aPendingUser = {
          ...aPendingUser,
          companyName: user.Casting.companyName,
          companyId: user.Casting.castingId,
          employmentCertUrl: user.Casting.employmentCertUrl,
        }
      }
      if(user.Actor) {
        aPendingUser = {
          ...aPendingUser,
          idCardImageUrl: user.Actor.idCardImageUrl,
          ssn: user.Actor.ssn,
        }
      }
      */
      pendingUsers.push(aPendingUser)
    }
    return pendingUsers
  }

  async updateUserVerification(userId: number): Promise<User> {
    //accept user
    return await this.prisma.user.update({
      where: { userId },
      data: {
        isVerified: true,
      },
    })
  }
}
