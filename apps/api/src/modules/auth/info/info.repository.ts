import { ActorInfoDto, ActorInfoWithReasonDto } from '@modela/dtos'
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
}
