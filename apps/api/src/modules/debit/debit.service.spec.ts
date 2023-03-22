import { JobStatus, mock } from '@modela/database'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

import { ApplicationRepository } from '../job/application/application.repository'
import { JobRepository } from '../job/job.repository'
import { DebitRepository } from './debit.repository'
import { DebitService } from './debit.service'

describe('DebitService', () => {
  let service: DebitService
  let repository: DebitRepository
  let jobRepository: JobRepository
  let applicationRepository: ApplicationRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebitService,
        DebitRepository,
        PrismaService,
        JobRepository,
        ApplicationRepository,
      ],
    }).compile()

    service = module.get<DebitService>(DebitService)
    repository = module.get<DebitRepository>(DebitRepository)
    jobRepository = module.get<JobRepository>(JobRepository)
    applicationRepository = module.get<ApplicationRepository>(
      ApplicationRepository,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createDebit', () => {
    const MOCK_JOB_ID = 1
    const MOCK_ACTOR_ID = 1
    const MOCK_APPLICATION_ID = 1

    beforeEach(() => {
      jest
        .spyOn(jobRepository, 'getBaseJobById')
        .mockResolvedValue(
          mock('job').override({ status: JobStatus.FINISHED }).get(),
        )
      jest
        .spyOn(applicationRepository, 'getApplicationbyActorJob')
        .mockResolvedValue(
          mock('application')
            .override({
              isPaid: false,
              applicationId: MOCK_APPLICATION_ID,
            })
            .get(),
        )

      jest.spyOn(repository, 'markAsPaid').mockResolvedValue(null)
    })

    it('should mark application as paid correctly', async () => {
      await service.markAsPaid(MOCK_JOB_ID, MOCK_ACTOR_ID)

      expect(repository.markAsPaid).toBeCalledWith(MOCK_APPLICATION_ID)
    })

    it('should throw not found error if job not found', async () => {
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(null)

      await expect(
        service.markAsPaid(MOCK_JOB_ID, MOCK_ACTOR_ID),
      ).rejects.toThrowError(NotFoundException)
    })

    it('should throw bad request error if actor did not apply this job', async () => {
      jest
        .spyOn(applicationRepository, 'getApplicationbyActorJob')
        .mockResolvedValue(null)

      await expect(
        service.markAsPaid(MOCK_JOB_ID, MOCK_ACTOR_ID),
      ).rejects.toThrowError(BadRequestException)
    })

    it('should throw bad request error if job is not finished', async () => {
      jest
        .spyOn(jobRepository, 'getBaseJobById')
        .mockResolvedValue(
          mock('job').override({ status: JobStatus.OPEN }).get(),
        )

      await expect(
        service.markAsPaid(MOCK_JOB_ID, MOCK_ACTOR_ID),
      ).rejects.toThrowError(BadRequestException)
    })

    it('should throw bad request error if application is already paid', async () => {
      jest
        .spyOn(applicationRepository, 'getApplicationbyActorJob')
        .mockResolvedValue(
          mock('application')
            .override({
              isPaid: true,
              applicationId: MOCK_APPLICATION_ID,
            })
            .get(),
        )

      await expect(
        service.markAsPaid(MOCK_JOB_ID, MOCK_ACTOR_ID),
      ).rejects.toThrowError(BadRequestException)
    })
  })
})
