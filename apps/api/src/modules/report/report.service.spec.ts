import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

import { JobRepository } from '../job/job.repository'
import { ReportRepository } from './report.repository'
import { ReportService } from './report.service'

describe('ReportService', () => {
  let service: ReportService
  let repository: ReportRepository

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
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('postReport', () => {
    const postReportDTO = {
      reason: 'Insert reason',
    }

    it('should post report correctly', async () => {
      jest.spyOn(repository, 'createReport').mockResolvedValue()

      await service.postReport(1, postReportDTO, 1)
      expect(repository.createReport).toBeCalledWith(
        expect.objectContaining(postReportDTO),
      )
    })
  })
})
