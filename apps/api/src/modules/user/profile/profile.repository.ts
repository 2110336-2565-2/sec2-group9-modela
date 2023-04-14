import {
  EditActorProfileDto,
  EditUserProfileDto,
  GetProfileForViewingDto,
  UserType,
} from '@modela/dtos'
import { BadRequestException, Injectable } from '@nestjs/common'
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

  async getUserProfileById(id: number): Promise<GetProfileForViewingDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: id,
      },
      include: {
        Actor: {
          include: {
            Application: true,
          },
        },
        Casting: true,
      },
    })
    if (!user) {
      //Not found exception is thrown in the service
      return null
    }
    const returnUser = {
      type: user.type,
      data: undefined,
    }
    const userCommon = {
      profileImageUrl: user.profileImageUrl,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      description: user.description,
    }
    if (user.type === UserType.ACTOR) {
      //calculate age from birthDate
      let actorAge = 0
      let rating = 0
      let ratingCount = 0

      user.Actor.Application.forEach((application) => {
        if (application.rating === null) return
        rating += application.rating
        ratingCount++
      })

      if (user.Actor.birthDate) {
        const birthDate = new Date(user.Actor.birthDate)
        const today = new Date()
        actorAge = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          actorAge--
        }
      }
      const actorProfile = {
        ...userCommon,
        prefix: user.Actor.prefix,
        nationality: user.Actor.nationality,
        gender: user.Actor.gender,
        ethnicity: user.Actor.ethnicity,
        age: actorAge,
        religion: user.Actor.religion,
        nickname: user.Actor.nickname,
        height: user.Actor.height,
        weight: user.Actor.weight,
        eyeColor: user.Actor.eyeColor,
        hairColor: user.Actor.hairColor,
        waist: user.Actor.waist,
        bust: user.Actor.bust,
        hips: user.Actor.hips,
        shoeSize: user.Actor.shoeSize,
        skinShade: user.Actor.skinShade,
        rating: ratingCount !== 0 ? rating / ratingCount : undefined,
      }
      returnUser.data = actorProfile
      return returnUser
    } else if (user.type === UserType.CASTING) {
      const castingProfile = {
        ...userCommon,
        companyName: user.Casting.companyName,
      }
      returnUser.data = castingProfile
      return returnUser
    }
    throw new BadRequestException()
  }
}
