import { Injectable, NotFoundException } from '@nestjs/common'

import { JobRepository } from '../job.repository'
import { ApplicationRepository } from './application.repository'

@Injectable()
export class ApplicationService {
  constructor(
    private repository: ApplicationRepository,
    private jobRepository: JobRepository,
  ) {}

  async findByJobId(id: number) {
    if (!(await this.jobRepository.getJobById(id)))
      throw new NotFoundException('Job not found')

    return this.repository.getApplicationByJobId(id)
  }
}
