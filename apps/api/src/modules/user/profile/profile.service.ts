import { EditActorProfileDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'

import { ProfileRepository } from './profile.repository'
@Injectable()
export class ProfileService {
  constructor(private repository: ProfileRepository) {}

  updateActor(id: number, editActorProfileDto: EditActorProfileDto) {
    this.repository.updateActor(id, editActorProfileDto)
  }
}
