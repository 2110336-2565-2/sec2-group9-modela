import {
  EditActorProfileDto,
  EditCastingProfileDto,
  GetProfileForEditingDto,
  GetProfileForViewingDto,
  JwtDto,
  UserType,
} from '@modela/dtos'
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { ProfileRepository } from './profile.repository'
@Injectable()
export class ProfileService {
  constructor(private repository: ProfileRepository) {}

  async editActor(id: number, editActorProfileDto: EditActorProfileDto) {
    const {
      profileImageUrl,
      phoneNumber,
      bankName,
      bankAccount,
      description,
      ...rest
    } = editActorProfileDto

    await this.repository.editUser(id, {
      profileImageUrl,
      phoneNumber,
      bankName,
      bankAccount,
      description,
    })

    await this.repository.editActor(id, rest)
  }

  async editCasting(id: number, editCastingProfileDto: EditCastingProfileDto) {
    await this.repository.editUser(id, editCastingProfileDto)
  }

  async getProfileForEditing(
    id: number,
    type: UserType,
  ): Promise<GetProfileForEditingDto> {
    const data = await this.repository.getUserProfileForEditing(id)
    if (type === UserType.CASTING) {
      return { type: UserType.CASTING, data }
    }
    return {
      type: UserType.ACTOR,
      data: {
        ...data,
        ...(await this.repository.getActorProfileForEditing(id)),
      },
    }
  }

  async getProfileById(
    id: number,
    user: JwtDto,
  ): Promise<GetProfileForViewingDto> {
    const targetUser = await this.repository.getUserProfileById(id)

    if (!targetUser) {
      throw new NotFoundException()
    }
    if (user.userId !== id && user.type === targetUser.type) {
      // user can't see other user's profile if they are the same type
      throw new ForbiddenException()
    }
    return targetUser
  }
}
