import { mock } from '@modela/database'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

import { JobRepository } from '../job/job.repository'
import { ReportRepository } from './report.repository'
import { ReportService } from './report.service'

describe('ReportService', () => {
  let service: ReportService
  let repository: ReportRepository
  let jobRepository: JobRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        ReportRepository,
        PrismaService,
        JobRepository,
      ],
    }).compile()

    service = module.get<ReportService>(ReportService)
    repository = module.get<ReportRepository>(ReportRepository)
    jobRepository = module.get<JobRepository>(JobRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('postReport', () => {
    const postReportDto = {
      reason: 'Insert reason',
    }

    const MOCK_CASTING_ID = 22
    const MOCK_JOB_ID = 1
    const MOCK_USER_ID = 2

    const MOCK_JOB = {
      ...mock('job').omit(['castingId', 'createdAt', 'updatedAt']).get(),
      castingId: MOCK_CASTING_ID,
      shooting: mock('shooting').get(3),
      companyName: mock('casting').get().companyName,
      jobCastingImageUrl: mock('user').get().profileImageUrl,
    }

    it('should post report correctly', async () => {
      jest.spyOn(repository, 'createReport').mockResolvedValue()
      jest.spyOn(jobRepository, 'getJobById').mockResolvedValue(MOCK_JOB)

      await service.postReport(MOCK_JOB_ID, postReportDto, MOCK_USER_ID)
      expect(repository.createReport).toBeCalledWith(
        MOCK_JOB_ID,
        MOCK_USER_ID,
        postReportDto.reason,
      )
    })
  })
})
