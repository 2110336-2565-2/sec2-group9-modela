import { Casting, User } from '@modela/database'
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
}
