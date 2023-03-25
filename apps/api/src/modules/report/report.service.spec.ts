import { mock, NotificationType } from '@modela/database'
import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

import { JobRepository } from '../job/job.repository'
import { NotificationModule } from '../notification/notification.module'
import { NotificationService } from '../notification/notification.service'
import { ReportRepository } from './report.repository'
import { ReportService } from './report.service'

describe('ReportService', () => {
  let service: ReportService
  let repository: ReportRepository
  let jobRepository: JobRepository
  let notificationService: NotificationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportRepository,
        PrismaService,
        JobRepository,
        ReportService,
      ],
      imports: [NotificationModule],
    }).compile()

    service = module.get<ReportService>(ReportService)
    repository = module.get<ReportRepository>(ReportRepository)
    jobRepository = module.get<JobRepository>(JobRepository)
    notificationService = module.get<NotificationService>(NotificationService)
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
    const MOCK_REPORT = mock('report')
      .override({ jobId: 1 })
      .omit(['createdAt', 'jobId'])
      .get()
    const MOCK_FIRST_NAME = 'John'
    const MOCK_LAST_NAME = 'Doe'
    const MOCK_REPORTS = {
      reports: [
        {
          ...MOCK_REPORT,
          User: { firstName: MOCK_FIRST_NAME, lastName: MOCK_LAST_NAME },
        },
      ],
      jobId: MOCK_JOB_ID,
    }
    service = new ReportService(repository, jobRepository, notificationService)
    const MOCK_REPORTS_FORMATTED = service.formatReports(MOCK_REPORTS)
    const MOCK_JOB = mock('job').override({ jobId: 1 }).get()

    it('should get reports correctly', async () => {
      jest.spyOn(repository, 'getReports').mockResolvedValue(MOCK_REPORTS)
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(MOCK_JOB)

      const result = await service.getReports(MOCK_JOB_ID)
      expect(repository.getReports).toBeCalledWith(MOCK_JOB_ID)
      expect(result).toEqual({
        reports: MOCK_REPORTS_FORMATTED,
        jobId: MOCK_JOB_ID,
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
      const MOCK_USERS_ID = [1, 2, 3]
      const MOCK_JOB = mock('job').override({ jobId: 1 }).get()
      const MOCK_JOB_ID = 1
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(MOCK_JOB)
      jest
        .spyOn(repository, 'cancelJob')
        .mockResolvedValue({ jobId: MOCK_JOB_ID })

      jest.spyOn(repository, 'getRelatedUsers').mockResolvedValue(MOCK_USERS_ID)
      jest
        .spyOn(notificationService, 'createNotification')
        .mockResolvedValue(null)

      const result = await service.acceptReport(MOCK_JOB_ID)
      expect(repository.cancelJob).toBeCalledWith(MOCK_JOB_ID)

      expect(repository.getRelatedUsers).toBeCalledWith(MOCK_JOB_ID)
      expect(notificationService.createNotification).toBeCalledTimes(
        MOCK_USERS_ID.length,
      )
      expect(notificationService.createNotification).toBeCalledWith({
        userId: MOCK_USERS_ID[0],
        type: NotificationType.CANCEL_JOB,
        jobId: MOCK_JOB_ID,
      })
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
