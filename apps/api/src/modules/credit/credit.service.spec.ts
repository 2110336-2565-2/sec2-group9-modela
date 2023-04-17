import { mock } from '@modela/database'
import { GetJobCardDto } from '@modela/dtos'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

import { ApplicationRepository } from '../job/application/application.repository'
import { JobRepository } from '../job/job.repository'
import { CreditRepository } from './credit.repository'
import { CreditService } from './credit.service'

describe('CreditService', () => {
  let service: CreditService
  let repository: CreditRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditService,
        CreditRepository,
        PrismaService,
        JobRepository,
        ApplicationRepository,
      ],
    }).compile()

    service = module.get<CreditService>(CreditService)
    repository = module.get<CreditRepository>(CreditRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getUnpaidJob', () => {
    it('should return unpaid job correctly', () => {
      const MOCK_JOBS = mock('job').get(2) as unknown as GetJobCardDto[]
      const MOCK_CASTING_ID = 1

      jest.spyOn(repository, 'getUnpaidJob').mockResolvedValue(MOCK_JOBS)

      expect(service.getUnpaidJob(MOCK_CASTING_ID)).resolves.toEqual(MOCK_JOBS)
      expect(repository.getUnpaidJob).toBeCalledWith(MOCK_CASTING_ID)
    })
  })
})
