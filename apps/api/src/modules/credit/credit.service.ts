import {
  GetJobCardDto,
  GetPendingTransactionDto,
  GetTransactionDetailDto,
  JobStatus,
  SendProofOfTransactionDto,
} from '@modela/dtos'
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { JobRepository } from '../job/job.repository'
import { CreditRepository } from './credit.repository'

@Injectable()
export class CreditService {
  constructor(
    private repository: CreditRepository,
    private jobRepository: JobRepository,
  ) {}

  async getUnpaidJob(castingId: number): Promise<GetJobCardDto[]> {
    return await this.repository.getUnpaidJob(castingId)
  }

  async getPendingTransactions(): Promise<GetPendingTransactionDto[]> {
    const credits = await this.repository.getPendingTransactions()
    return credits.map(
      ({
        Job: {
          Casting: { User, ...casting },
          ...job
        },
        ...credit
      }) => ({
        ...credit,
        ...job,
        ...casting,
        ...User,
      }),
    )
  }

  async getTransactionDetail(
    jobId: number,
    castingId: number,
  ): Promise<GetTransactionDetailDto> {
    const job = await this.jobRepository.getBaseJobById(jobId)
    if (!job) throw new NotFoundException('No job found')
    if (job.castingId !== castingId)
      throw new ForbiddenException('User is not owner of this job')
    if (job.status !== JobStatus.SELECTION_ENDED)
      throw new BadRequestException('Job selection is not ended')
    const actorCount = await this.jobRepository.getActorCount(jobId)
    return {
      jobId,
      title: job.title,
      amount: job.wage * actorCount,
      //Mock might change later
      bankAccount: '1234567890',
      bankName: 'Bank BCA',
    }
  }

  async sendProofOfTransaction(
    jobId: number,
    data: SendProofOfTransactionDto,
    castingId: number,
  ) {
    const job = await this.jobRepository.getBaseJobById(jobId)

    if (!job) throw new NotFoundException('No job found')

    if (job.castingId !== castingId)
      throw new ForbiddenException('User is not owner of this job')

    if (job.status !== JobStatus.SELECTION_ENDED)
      throw new BadRequestException('Job selection is not ended')
    if (job.isPaid) throw new BadRequestException('Job is already paid')

    const actorCount = await this.jobRepository.getActorCount(jobId)

    await this.repository.createCreditTransaction(
      jobId,
      job.wage * actorCount,
      data.proofUrl,
    )
  }

  async updatePendingTransactions(jobId: number, isAccepted: boolean) {
    const job = await this.jobRepository.getBaseJobById(jobId)
    if (!job) throw new NotFoundException('No job found')
    const credit = await this.repository.getPendingCreditByJob(jobId)
    if (!credit)
      throw new BadRequestException('No credit transaction for this job')

    if (isAccepted) {
      await this.jobRepository.confirmJobCredit(jobId)
    }

    await this.repository.removeCreditTransaction(jobId)
  }
}
