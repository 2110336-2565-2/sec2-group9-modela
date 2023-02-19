import { EditActorProfileDto, EditUserProfileDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

type OnlyActorProfile = Pick<
  EditActorProfileDto,
  Exclude<keyof EditActorProfileDto, keyof EditUserProfileDto>
>

@Injectable()
export class ProfileRepository {
  constructor(private prisma: PrismaService) {}

  async editActor(id: number, editActorProfileDto: OnlyActorProfile) {
    await this.prisma.actor.update({
      where: { actorId: id },
      data: editActorProfileDto,
    })
  }

  async editUser(id: number, editUserProfileDto: EditUserProfileDto) {
    await this.prisma.user.update({
      where: { userId: id },
      data: editUserProfileDto,
    })
  }

  async getUserProfileForEditing(id: number): Promise<EditUserProfileDto> {
    return await this.prisma.user.findUnique({
      where: {
        userId: id,
      },
      select: {
        profileImageUrl: true,
        phoneNumber: true,
        bankName: true,
        bankAccount: true,
        description: true,
      },
    })
  }

  async getActorProfileForEditing(id: number): Promise<OnlyActorProfile> {
    return await this.prisma.actor.findUnique({
      where: {
        actorId: id,
      },
      select: {
        nickname: true,
        height: true,
        weight: true,
        eyeColor: true,
        hairColor: true,
        waist: true,
        bust: true,
        hips: true,
        shoeSize: true,
        skinShade: true,
        ethnicity: true,
        religion: true,
        birthDate: true,
      },
    })
  }
}
