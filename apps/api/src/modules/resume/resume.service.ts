import { JwtDto, PostResumeDto } from '@modela/dtos'
import { Injectable, NotFoundException } from '@nestjs/common'

import { ResumeRepository } from './resume.respository'

@Injectable()
export class ResumeService {
  constructor(private readonly repository: ResumeRepository) {}

  async createResume(postResumeDto: PostResumeDto, user: JwtDto) {
    const actor = await this.repository.getActorFromUser(user)
    if (!actor) {
      throw new NotFoundException('Actor not found')
    }
    return this.repository.createResume(postResumeDto, actor, user.userId)
  }
}
