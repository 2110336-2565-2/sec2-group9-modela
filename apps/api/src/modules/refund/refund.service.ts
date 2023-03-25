import { Injectable } from '@nestjs/common'

import { RefundRepository } from './refund.repository'

@Injectable()
export class RefundService {
  constructor(private repository: RefundRepository) {}

  async acceptRefund(jobId: number, actorId: number) {
    return await this.repository.acceptRefund(jobId, actorId)
  }
}
