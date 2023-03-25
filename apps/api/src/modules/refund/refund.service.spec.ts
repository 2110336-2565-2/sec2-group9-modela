//import { mock } from '@modela/database'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

import { RefundRepository } from './refund.repository'
import { RefundService } from './refund.service'

describe('RefundService', () => {
  let service: RefundService
  //let repository: RefundRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefundService, RefundRepository, PrismaService],
    }).compile()

    service = module.get<RefundService>(RefundService)
    //repository = module.get<RefundRepository>(RefundRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
