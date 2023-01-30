import { Injectable } from '@nestjs/common'
import { UserType } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'

import { SignupCastingDto } from './auth.dto'

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async createCasting(payload: SignupCastingDto) {
    const { companyId, companyName, employmentCertUrl, ...userData } = payload
    const castingData = { companyId, companyName, employmentCertUrl }

    await this.prisma.user.create({
      data: {
        ...userData,
        type: UserType.CASTING,
        Casting: {
          create: castingData,
        },
      },
    })
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    })
  }
}
