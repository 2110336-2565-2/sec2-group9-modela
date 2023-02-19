import { EditActorProfileDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'

import { ProfileRepository } from './profile.repository'
@Injectable()
export class ProfileService {
  constructor(private repository: ProfileRepository) {}

  async updateActor(id: number, editActorProfileDto: EditActorProfileDto) {
    await this.repository.updateActor(id, editActorProfileDto)
  }
}
