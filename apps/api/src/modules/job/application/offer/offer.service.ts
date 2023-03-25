import { ApplicationStatus } from '@modela/database'
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { JobRepository } from '../../job.repository'
import { ApplicationRepository } from '../application.repository'

@Injectable()
export class OfferService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly jobRepository: JobRepository,
  ) {}

  async sendJobOffer(jobId: number, castingId: number, actorId: number) {
    const job = await this.jobRepository.getBaseJobById(jobId)
    if (!job) {
      throw new NotFoundException('Job not found')
    }
    if (job.castingId !== castingId) {
      throw new ForbiddenException('You are not the owner of this job')
    }
    const application =
      await this.applicationRepository.getApplicationbyActorJob(actorId, jobId)
    if (!application) {
      throw new BadRequestException('Actor has not applied to this job')
    }
    if (application.status !== ApplicationStatus.PENDING) {
      throw new BadRequestException('A job offer has already been sent')
    }
    await this.applicationRepository.updateApplicationStatus(
      application.applicationId,
      ApplicationStatus.OFFER_SENT,
    )
    return { message: 'Job offer sent' }
  }
}
