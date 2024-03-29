import { JobStatus } from '@modela/database'
import {
  GetPendingActorDebitsByJobDto,
  GetPendingJobsDebitsDto,
} from '@modela/dtos'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { ApplicationRepository } from '../job/application/application.repository'
import { JobRepository } from '../job/job.repository'
import { RefundRepository } from '../refund/refund.repository'
import { DebitRepository } from './debit.repository'

@Injectable()
export class DebitService {
  constructor(
    private repository: DebitRepository,
    private applicationRepository: ApplicationRepository,
    private jobRepository: JobRepository,
    private refundRepository: RefundRepository,
  ) {}

  async markAsPaid(jobId: number, actorId: number) {
    const job = await this.jobRepository.getBaseJobById(jobId)

    if (!job) throw new NotFoundException('Job not found')

    const application =
      await this.applicationRepository.getApplicationbyActorJob(actorId, jobId)

    if (!application)
      throw new BadRequestException('Actor didn’t apply for this job')
    if (job.status !== JobStatus.FINISHED)
      throw new BadRequestException('Job status is not finished')
    if (application.isPaid)
      throw new BadRequestException('Already mark this transaction')

    const refund = await this.refundRepository.getRefundByApplicationId(
      application.applicationId,
    )
    if (refund) throw new BadRequestException('Already refund')

    await this.repository.markAsPaid(application.applicationId)
  }

  async getPendingJobsDebits(): Promise<GetPendingJobsDebitsDto[]> {
    return await this.repository.getPendingJobsDebits()
  }

  async getPendingDebitsByJobId(
    jobId: number,
  ): Promise<GetPendingActorDebitsByJobDto> {
    //check if job is exist
    const job = await this.jobRepository.getBaseJobById(jobId)
    if (!job) throw new NotFoundException('Job not found')

    if (job.status !== JobStatus.FINISHED)
      throw new BadRequestException('Job status is not finished')

    return await this.repository.getPendingDebitsByJobId(jobId, job.title)
  }
}
