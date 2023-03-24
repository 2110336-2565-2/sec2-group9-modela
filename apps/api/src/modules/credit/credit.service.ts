import { GetJobCardDto, GetPendingTransactionDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'

import { CreditRepository } from './credit.repository'

@Injectable()
export class CreditService {
  constructor(private repository: CreditRepository) {}

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
}
