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

  async acceptJobOffer(jobId: number, actorId: number) {
    const job = await this.jobRepository.getBaseJobById(jobId)
    if (!job) {
      throw new NotFoundException('Job not found')
    }
    const application =
      await this.applicationRepository.getApplicationbyActorJob(actorId, jobId)
    if (!application) {
      throw new BadRequestException('You have not applied to this job')
    }
    if (application.status === ApplicationStatus.OFFER_ACCEPTED) {
      throw new BadRequestException('You have already accepted this job offer')
    }
    if (application.status !== ApplicationStatus.OFFER_SENT) {
      throw new BadRequestException('You cannot accept this job offer')
    }
    await this.applicationRepository.updateApplicationStatus(
      application.applicationId,
      ApplicationStatus.OFFER_ACCEPTED,
    )
  }

  async rejectJobOffer(jobId: number, actorId: number) {
    const job = await this.jobRepository.getBaseJobById(jobId)
    if (!job) {
      throw new NotFoundException('Job not found')
    }
    const application =
      await this.applicationRepository.getApplicationbyActorJob(actorId, jobId)
    if (!application) {
      throw new BadRequestException('You have not applied to this job')
    }
    if (application.status === ApplicationStatus.OFFER_REJECTED) {
      throw new BadRequestException('You have already rejected this job offer')
    }
    if (application.status !== ApplicationStatus.OFFER_SENT) {
      throw new BadRequestException('You cannot reject this job offer')
    }
    await this.applicationRepository.updateApplicationStatus(
      application.applicationId,
      ApplicationStatus.OFFER_REJECTED,
    )
  }
}
