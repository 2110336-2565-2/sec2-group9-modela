import { UserStatus } from '@modela/database'
import {
  ActorInfoDto,
  ActorInfoWithReasonDto,
  CastingInfoDto,
  CastingInfoWithReasonDto,
} from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { Express } from 'express'
import { PrismaService } from 'src/database/prisma.service'
import { FileService } from 'src/modules/file/file.service'

@Injectable()
export class InfoRepository {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  async getActorInfoById(userId: number): Promise<ActorInfoWithReasonDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId,
      },
      include: {
        Actor: true,
      },
    })
    const {
      firstName,
      middleName,
      lastName,
      phoneNumber,
      rejectedReason,
      Actor,
    } = user
    const { prefix, nationality, gender, ssn, idCardImageUrl } = Actor
    return {
      rejectedReason,
      data: {
        firstName,
        middleName,
        lastName,
        phoneNumber,
        prefix,
        nationality,
        gender,
        ssn,
        idCardImageUrl: await this.fileService.getDownloadUrl(idCardImageUrl),
      },
    }
  }

  async getCastingInfoById(userId: number): Promise<CastingInfoWithReasonDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId,
      },
      include: {
        Casting: true,
      },
    })
    const { firstName, middleName, lastName, rejectedReason, Casting } = user
    const { companyName, companyId, employmentCertUrl } = Casting
    return {
      rejectedReason,
      data: {
        firstName,
        middleName,
        lastName,
        companyName,
        companyId,
        employmentCertUrl: await this.fileService.getDownloadUrl(
          employmentCertUrl,
        ),
      },
    }
  }

  async editActorInfo(
    body: ActorInfoDto,
    file: Express.Multer.File,
    actorId: number,
  ) {
    const { prefix, nationality, gender, ssn, ...rest } = body
    await this.prisma.$transaction(
      async (tx) => {
        await tx.actor.update({
          where: { actorId },
          data: {
            prefix,
            nationality,
            gender,
            ssn,
            User: {
              update: {
                status: UserStatus.PENDING,
                ...rest,
              },
            },
          },
        })

        if (!file) return
        const fileName = 'user/credential/' + actorId
        const idCardImageUrl = await this.fileService.postUploadFile(
          file,
          fileName,
        )
        await tx.actor.update({
          where: { actorId },
          data: {
            idCardImageUrl,
          },
        })
      },
      { timeout: 10000 },
    )
  }

  async editCastingInfo(
    body: CastingInfoDto,
    file: Express.Multer.File,
    castingId: number,
  ) {
    const { companyId, companyName, ...rest } = body
    await this.prisma.$transaction(
      async (tx) => {
        await tx.casting.update({
          where: { castingId },
          data: {
            companyId,
            companyName,
            User: {
              update: {
                status: UserStatus.PENDING,
                ...rest,
              },
            },
          },
        })

        if (!file) return
        const fileName = 'user/credential/' + castingId
        const employmentCertUrl = await this.fileService.postUploadFile(
          file,
          fileName,
        )
        await tx.casting.update({
          where: { castingId },
          data: {
            employmentCertUrl,
          },
        })
      },
      { timeout: 10000 },
    )
  }
}
