import { JwtDto, PostResumeDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'

import { ResumeRepository } from './resume.respository'

@Injectable()
export class ResumeService {
  constructor(private readonly repository: ResumeRepository) {}

  private validateResumeDto() {
    return true
  }

  async createResume(postResumeDto: PostResumeDto, user: JwtDto) {
    this.validateResumeDto()
    return this.repository.createResume(postResumeDto, user)
  }
}
