import { GetAppliedActorDto, GetAppliedActorQuery } from '@modela/dtos'
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { JobRepository } from '../job.repository'
import { ApplicationRepository } from './application.repository'

@Injectable()
export class ApplicationService {
  constructor(
    private repository: ApplicationRepository,
    private jobRepository: JobRepository,
  ) {}

  async findByJobId(
    id: number,
    userId: number,
    query: GetAppliedActorQuery,
  ): Promise<GetAppliedActorDto> {
    const job = await this.jobRepository.getBaseJobById(id)

    if (!job) throw new NotFoundException('Job not found')
    if (job.castingId !== userId)
      throw new ForbiddenException('User is not the owner of this job')

    return { actors: await this.repository.getApplicationByJobId(id, query) }
  }
}
