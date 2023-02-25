import {
  EditActorProfileDto,
  EditCastingProfileDto,
  GetProfileForEditingDto,
  GetProfileForViewingDto,
  UserType,
} from '@modela/dtos'
import { Injectable, NotFoundException } from '@nestjs/common'

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

  async getProfileById(id: number): Promise<GetProfileForViewingDto> {
    const user = await this.repository.getUserProfileById(id)
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }
}
