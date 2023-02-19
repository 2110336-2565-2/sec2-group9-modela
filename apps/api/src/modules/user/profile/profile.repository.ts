import { EditActorProfileDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class ProfileRepository {
  constructor(private prisma: PrismaService) {}

  async updateActor(id: number, editActorProfileDto: EditActorProfileDto) {
    const {
      profileImageUrl,
      phoneNumber,
      bankName,
      bankAccount,
      description,
      ...rest
    } = editActorProfileDto

    await this.prisma.actor.update({
      where: { actorId: id },
      data: rest,
    })

    await this.prisma.user.update({
      where: { userId: id },
      data: {
        profileImageUrl,
        phoneNumber,
        bankName,
        bankAccount,
        description,
      },
    })
  }
}
