import { mock } from '@modela/database'
import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

import { JobRepository } from '../job.repository'
import { ApplicationRepository } from './application.repository'
import { ApplicationService } from './application.service'

describe('ApplicationService', () => {
  let service: ApplicationService
  let repository: ApplicationRepository
  let jobRepository: JobRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        JobRepository,
        PrismaService,
        ApplicationRepository,
      ],
    }).compile()

    service = module.get<ApplicationService>(ApplicationService)
    repository = module.get<ApplicationRepository>(ApplicationRepository)
    jobRepository = module.get<JobRepository>(JobRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findByJobId', () => {
    const MOCK_CASTING_ID = 1
    const MOCK_JOB_ID = 1
    const MOCK_ACTORS = mock('user')
      .pick(['firstName', 'middleName', 'lastName', 'profileImageUrl'])
      .get(3)
      .map((actor) => ({ ...actor, actorId: 1, resumeId: 1 }))

    beforeEach(() => {
      jest
        .spyOn(repository, 'getApplicationByJobId')
        .mockResolvedValue(MOCK_ACTORS)
    })

    it('should find applications by job id correctly', async () => {
      jest
        .spyOn(jobRepository, 'getBaseJobById')
        .mockResolvedValue(
          mock('job').override({ castingId: MOCK_CASTING_ID }).get(),
        )
      expect(
        service.findByJobId(MOCK_JOB_ID, MOCK_CASTING_ID),
      ).resolves.toEqual({ actors: MOCK_ACTORS })
    })

    it('should throw not found error if job not found', async () => {
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(null)
      expect(service.findByJobId(MOCK_JOB_ID, MOCK_CASTING_ID)).rejects.toThrow(
        NotFoundException,
      )
    })

    it('should throw forbidden error if user is not owener of this job', async () => {
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(
        mock('job')
          .override({ castingId: MOCK_CASTING_ID + 1 })
          .get(),
      )
      expect(service.findByJobId(MOCK_JOB_ID, MOCK_CASTING_ID)).rejects.toThrow(
        ForbiddenException,
      )
    })
  })
})
