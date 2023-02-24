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
    return this.repository.createResume(postResumeDto, user.userId)
  }

  async getResumeById(resumeId: number, user: JwtDto) {
    const resume = await this.repository.getResumeById(resumeId)
    if (!resume) {
      throw new NotFoundException('Resume not found')
    }
    if (user.type === UserType.ACTOR) {
      if (resume.actorId !== user.userId) {
        throw new ForbiddenException(
          'You are not allowed to access this resume',
        )
      }
    }
    return resume
  }

  async getResumesByUser(user: JwtDto) {
    return this.repository.getResumesByActorId(user.userId)
  }

  async deleteResume(resumeId: number, user: JwtDto) {
    const resume = await this.repository.getResumeById(resumeId)
    if (!resume) throw new NotFoundException()
    if (resume.actorId !== user.userId)
      throw new ForbiddenException('You are not allowed to delete this resume')

    const deletedResume = await this.repository.deleteResume(resumeId)

    return deletedResume
  }
}
