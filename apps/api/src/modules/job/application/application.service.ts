import {
  ApplicationStatus,
  GetAppliedActorDto,
  GetAppliedActorQuery,
  JobStatus,
} from '@modela/dtos'
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ResumeRepository } from 'src/modules/resume/resume.respository'

import { JobRepository } from '../job.repository'
import { ApplicationRepository } from './application.repository'

@Injectable()
export class ApplicationService {
  constructor(
    private repository: ApplicationRepository,
    private jobRepository: JobRepository,
    private resumeRepository: ResumeRepository,
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

    let actors = await this.repository.getApplicationByJobId(id, query)

    if (job.status !== JobStatus.SELECTION_ENDED || !job.isPaid)
      actors = actors.map((actor) => ({ ...actor, isRefundable: false }))

    return { actors: actors }
  }

  async applyJob(jobId: number, resumeId: number, userId: number) {
    const job = await this.jobRepository.getBaseJobById(jobId)

    if (!job) throw new NotFoundException('Job not found')

    if (job.status !== JobStatus.OPEN)
      throw new ForbiddenException('Job is not accept application now')

    const resume = await this.resumeRepository.getResumeById(resumeId)
    if (!resume) throw new BadRequestException('Resume not found')

    if (resume.actorId !== userId)
      throw new BadRequestException('User is not resume owner')

    const application = await this.repository.getApplicationbyActorJob(
      userId,
      jobId,
    )
    if (application)
      throw new ConflictException('Actor already apply to this job')

    const newApplication = await this.repository.createApplication(
      userId,
      jobId,
      resumeId,
    )
    return {
      applicationId: newApplication.applicationId,
    }
  }

  async rejectApplication(jobId: number, actorId: number, castingId: number) {
    const job = await this.jobRepository.getBaseJobById(jobId)

    if (!job) throw new NotFoundException('Job not found')

    if (job.castingId !== castingId)
      throw new ForbiddenException('User is not the owner of this job')

    const application = await this.repository.getApplicationbyActorJob(
      actorId,
      jobId,
    )

    if (!application)
      throw new BadRequestException(`Actor didn't apply for this job`)

    if (application.status !== ApplicationStatus.PENDING)
      throw new BadRequestException('Application is not pending')

    this.repository.rejectApplication(application.applicationId)
  }

  async cancelApplication(jobId: number, actorId: number) {
    const job = await this.jobRepository.getBaseJobById(jobId)

    if (!job) throw new NotFoundException('Job not found')
    if (job.status !== JobStatus.OPEN) {
      throw new BadRequestException('Job status is not open')
    }

    const application = await this.repository.getApplicationbyActorJob(
      actorId,
      jobId,
    )

    if (!application)
      throw new BadRequestException(`You didn't apply for this job`)
    if (application.status !== ApplicationStatus.PENDING)
      throw new BadRequestException('Application is not pending')

    await this.repository.deleteApplication(application.applicationId)
  }
}
