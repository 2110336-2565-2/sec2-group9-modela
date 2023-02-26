import { mock } from '@modela/database'
import { NotFoundException } from '@nestjs/common'
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

    const MOCK_JOB_ID = 1
    const MOCK_USER_ID = 2

    it('should post report correctly', async () => {
      jest.spyOn(repository, 'createReport').mockResolvedValue()
      jest
        .spyOn(jobRepository, 'getBaseJobById')
        .mockResolvedValue(mock('job').get())

      await service.postReport(MOCK_JOB_ID, postReportDto, MOCK_USER_ID)
      expect(repository.createReport).toBeCalledWith(
        MOCK_JOB_ID,
        MOCK_USER_ID,
        postReportDto.reason,
      )
    })
  })

  describe('getReports', () => {
    const MOCK_JOB_ID = 1
    const MOCK_REPORT = mock('report').override({ jobId: 1 }).get()
    const MOCK_JOB = mock('job').override({ jobId: 1 }).get()

    it('should get reports correctly', async () => {
      jest
        .spyOn(repository, 'getReports')
        .mockResolvedValue({ reports: [MOCK_REPORT], jobId: MOCK_JOB_ID })
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(MOCK_JOB)

      const result = await service.getReports(MOCK_JOB_ID)
      expect(repository.getReports).toBeCalledWith(MOCK_JOB_ID)
      expect(result).toEqual({
        jobId: MOCK_JOB_ID,
        reports: [MOCK_REPORT],
        jobTitle: MOCK_JOB.title,
      })
    })

    it('should throw error if job does not exist', async () => {
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(undefined)

      await expect(service.getReports(MOCK_JOB_ID)).rejects.toThrow(
        NotFoundException,
      )
    })
  })

  describe('acceptReport', () => {
    it('should accept report correctly', async () => {
      const MOCK_JOB = mock('job').override({ jobId: 1 }).get()
      const MOCK_JOB_ID = 1
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(MOCK_JOB)
      jest
        .spyOn(repository, 'cancelJob')
        .mockResolvedValue({ jobId: MOCK_JOB_ID })

      const result = await service.acceptReport(MOCK_JOB_ID)
      expect(repository.cancelJob).toBeCalledWith(MOCK_JOB_ID)
      expect(result).toEqual({ jobId: MOCK_JOB_ID })
    })

    it('should throw error if job does not exist', async () => {
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(undefined)

      await expect(service.acceptReport(1)).rejects.toThrow(NotFoundException)
    })
  })

  describe('rejectReport', () => {
    const MOCK_JOB = mock('job').override({ jobId: 1 }).get()
    const MOCK_JOB_ID = 1

    it('should reject reports correctly', async () => {
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(MOCK_JOB)
      jest
        .spyOn(repository, 'rejectReportForJob')
        .mockResolvedValue({ jobId: MOCK_JOB_ID })

      const result = await service.rejectReport(MOCK_JOB_ID)
      expect(repository.rejectReportForJob).toBeCalledWith(MOCK_JOB_ID)
      expect(result).toEqual({ jobId: MOCK_JOB_ID })
    })

    it('should throw error if job does not exist', async () => {
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(undefined)

      await expect(service.rejectReport(1)).rejects.toThrow(NotFoundException)
    })
  })
})
