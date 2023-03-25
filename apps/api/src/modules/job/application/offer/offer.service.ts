import { ApplicationStatus, NotificationType } from '@modela/database'
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { NotificationService } from 'src/modules/notification/notification.service'

import { JobRepository } from '../../job.repository'
import { ApplicationRepository } from '../application.repository'

@Injectable()
export class OfferService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly jobRepository: JobRepository,
    private readonly notificationService: NotificationService,
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
    await this.notificationService.createNotification({
      userId: actorId,
      jobId: job.jobId,
      actorId: actorId,
      type: NotificationType.RECEIVE_OFFER,
    })
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
    if (application.status !== ApplicationStatus.OFFER_SENT) {
      throw new BadRequestException('You cannot accept this job offer')
    }
    await this.applicationRepository.updateApplicationStatus(
      application.applicationId,
      ApplicationStatus.OFFER_ACCEPTED,
    )
    await this.notificationService.createNotification({
      userId: job.castingId,
      jobId: job.jobId,
      actorId: actorId,
      type: NotificationType.ACCEPT_OFFER,
    })
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
    if (application.status !== ApplicationStatus.OFFER_SENT) {
      throw new BadRequestException('You cannot reject this job offer')
    }
    await this.applicationRepository.updateApplicationStatus(
      application.applicationId,
      ApplicationStatus.OFFER_REJECTED,
    )
    await this.notificationService.createNotification({
      userId: job.castingId,
      jobId: job.jobId,
      actorId: actorId,
      type: NotificationType.REJECT_OFFER,
    })
  }
}
