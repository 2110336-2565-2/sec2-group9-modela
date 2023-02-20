import { UserType } from '@modela/database'
import { SignupActorDto, SignupCastingDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { Express } from 'express'
import { PrismaService } from 'src/database/prisma.service'

import { FileService } from '../file/file.service'

@Injectable()
export class AuthRepository {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  async createCasting(payload: SignupCastingDto, file: Express.Multer.File) {
    const { companyId, companyName, employmentCertUrl, ...userData } = payload
    const castingData = { companyId, companyName, employmentCertUrl }
    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          ...userData,
          type: UserType.CASTING,
          Casting: {
            create: castingData,
          },
        },
      })
      const fileName = 'user/credential/' + user.userId
      this.fileService.postUploadFile(file, fileName)

      return await tx.user.update({
        where: {
          userId: user.userId,
        },
        data: {
          Casting: {
            update: {
              employmentCertUrl: fileName,
            },
          },
        },
      })
    })
  }

  async createActor(payload: SignupActorDto, file: Express.Multer.File) {
    const { prefix, nationality, ssn, gender, idCardImageUrl, ...userData } =
      payload
    const actorData = { prefix, nationality, ssn, gender, idCardImageUrl }
    return await this.prisma.$transaction(async (tx) => {
      const user = await this.prisma.user.create({
        data: {
          ...userData,
          type: UserType.ACTOR,
          Actor: { create: actorData },
        },
      })
      const fileName = 'user/credential/' + user.userId
      this.fileService.postUploadFile(file, fileName)

      return await tx.user.update({
        where: {
          userId: user.userId,
        },
        data: {
          Actor: {
            update: {
              idCardImageUrl: fileName,
            },
          },
        },
      })
    })
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    })
  }
}
