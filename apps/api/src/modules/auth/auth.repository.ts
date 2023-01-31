import { SignupActorDto, SignupCastingDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { UserType } from 'database'
import { PrismaService } from 'src/database/prisma.service'

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

  async createActor(payload: SignupActorDto) {
    const { prefix, nationality, ssn, gender, idCardImageUrl, ...userData } =
      payload
    const actorData = { prefix, nationality, ssn, gender, idCardImageUrl }
    await this.prisma.user.create({
      data: { ...userData, type: UserType.ACTOR, Actor: { create: actorData } },
    })
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    })
  }
}
