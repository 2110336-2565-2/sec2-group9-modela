import { JwtDto, PostResumeDto, UserType } from '@modela/dtos'
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

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

  async getResumeById(resumeId: number, user: JwtDto) {
    const resume = await this.repository.getResumeById(resumeId)
    if (!resume) {
      throw new NotFoundException('Resume not found')
    }
    if (user.type == UserType.ACTOR) {
      const actor = await this.repository.getActorFromUser(user)
      if (!actor) {
        throw new NotFoundException('Actor not found')
      }
      if (resume.actorId != actor.actorId) {
        throw new ForbiddenException(
          'You are not allowed to access this resume',
        )
      }
    }
    return resume
  }

  async getResumesByUser(user: JwtDto) {
    const actor = await this.repository.getActorFromUser(user)
    if (!actor) {
      throw new ForbiddenException('User is not an actor')
    }
    return this.repository.getResumesByActorId(actor.actorId)
  }
}
