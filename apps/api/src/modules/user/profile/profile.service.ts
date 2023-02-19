import { EditActorProfileDto, EditCastingProfileDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'

import { ProfileRepository } from './profile.repository'
@Injectable()
export class ProfileService {
  constructor(private repository: ProfileRepository) {}

  async editActor(id: number, editActorProfileDto: EditActorProfileDto) {
    await this.repository.editActor(id, editActorProfileDto)
  }

  async editCasting(id: number, editCastingProfileDto: EditCastingProfileDto) {
    await this.repository.editCasting(id, editCastingProfileDto)
  }
}
