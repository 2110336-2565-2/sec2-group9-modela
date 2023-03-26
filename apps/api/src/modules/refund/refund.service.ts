import { NotificationType, RefundStatus } from '@modela/database'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { ApplicationRepository } from '../job/application/application.repository'
import { JobRepository } from '../job/job.repository'
import { NotificationService } from '../notification/notification.service'
import { RefundRepository } from './refund.repository'

@Injectable()
export class RefundService {
  constructor(
    private repository: RefundRepository,
    private jobRepository: JobRepository,
    private applicationReposity: ApplicationRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async getJobApplicationRefundByActorJobId(jobId: number, actorId: number) {
    const job = await this.jobRepository.getBaseJobById(jobId)
    if (!job) throw new NotFoundException('Job not found')

    //find applicationId by jobId and actorId
    const application =
      await this.applicationReposity.getApplicationbyActorJobId(actorId, jobId)
    if (!application)
      throw new BadRequestException('no application of this actor in this job')

    //get refund by applicationId
    const refund = await this.repository.getRefundByApplicationId(
      application.applicationId,
    )
    if (!refund)
      throw new BadRequestException(
        'no refund request of this actor in this job',
      )

    if (refund.refundStatus !== RefundStatus.PENDING)
      throw new BadRequestException('refund status is not pending')

    return { job, application, refund }
  }

  async acceptRefund(jobId: number, actorId: number) {
    const { job, application, refund } =
      await this.getJobApplicationRefundByActorJobId(jobId, actorId)
    const updatedRefund = await this.repository.acceptRefund(refund.refundId)

    //send notification to actor and casting
    await this.notificationService.createNotification({
      userId: actorId,
      jobId: job.jobId,
      applicationId: application.applicationId,
      type: NotificationType.APPROVE_REFUND,
    })

    await this.notificationService.createNotification({
      userId: job.castingId,
      jobId: job.jobId,
      applicationId: application.applicationId,
      type: NotificationType.APPROVE_REFUND,
    })
    return updatedRefund
  }

  async rejectRefund(jobId: number, actorId: number) {
    const { job, application, refund } =
      await this.getJobApplicationRefundByActorJobId(jobId, actorId)

    const updatedRefund = await this.repository.rejectRefund(refund.refundId)

    //send notification to casting
    await this.notificationService.createNotification({
      userId: job.castingId,
      jobId: job.jobId,
      applicationId: application.applicationId,
      type: NotificationType.REJECT_REFUND,
    })
    return updatedRefund
  }
}
