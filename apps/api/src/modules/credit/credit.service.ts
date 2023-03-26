import { GetJobCardDto, GetPendingTransactionDto } from '@modela/dtos'
import {
  BadRequestException,
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
