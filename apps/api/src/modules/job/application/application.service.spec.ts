import { ApplicationStatus, JobStatus, mock } from '@modela/database'
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'
import { ResumeRepository } from 'src/modules/resume/resume.respository'

import { JobRepository } from '../job.repository'
import { ApplicationRepository } from './application.repository'
import { ApplicationService } from './application.service'

describe('ApplicationService', () => {
  let service: ApplicationService
  let repository: ApplicationRepository
  let jobRepository: JobRepository
  let resumeRepository: ResumeRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        JobRepository,
        PrismaService,
        ApplicationRepository,
        ResumeRepository,
      ],
    }).compile()

    service = module.get<ApplicationService>(ApplicationService)
    repository = module.get<ApplicationRepository>(ApplicationRepository)
    jobRepository = module.get<JobRepository>(JobRepository)
    resumeRepository = module.get<ResumeRepository>(ResumeRepository)
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
      .map((actor, idx) => ({
        ...actor,
        actorId: idx + 2,
        resumeId: idx + 2,
        resumeUrl: '',
        status: ApplicationStatus.PENDING,
        applicationId: idx + 2,
        isRefundable: false,
      }))

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
      await expect(
        service.findByJobId(MOCK_JOB_ID, MOCK_CASTING_ID, {}),
      ).resolves.toEqual({ actors: MOCK_ACTORS })
    })

    it('should throw not found error if job not found', async () => {
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(null)
      await expect(
        service.findByJobId(MOCK_JOB_ID, MOCK_CASTING_ID, {}),
      ).rejects.toThrow(NotFoundException)
    })

    it('should throw forbidden error if user is not owner of this job', async () => {
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(
        mock('job')
          .override({ castingId: MOCK_CASTING_ID + 1 })
          .get(),
      )
      await expect(
        service.findByJobId(MOCK_JOB_ID, MOCK_CASTING_ID, {}),
      ).rejects.toThrow(ForbiddenException)
    })
  })

  describe('applyJob', () => {
    const MOCK_JOB_ID = 1
    const MOCK_ACTORS_ID = 2
    const MOCK_RESUME = mock('resume')
      .override({ actorId: MOCK_ACTORS_ID })
      .get()

    const MOCK_APPLICATION = mock('application')
      .override({
        resumeId: MOCK_RESUME.resumeId,
        actorId: MOCK_ACTORS_ID,
        jobId: MOCK_JOB_ID,
      })
      .get()

    beforeEach(() => {
      jest
        .spyOn(repository, 'createApplication')
        .mockResolvedValue(MOCK_APPLICATION)
      jest
        .spyOn(jobRepository, 'getBaseJobById')
        .mockResolvedValue(
          mock('job')
            .override({ jobId: MOCK_JOB_ID, status: JobStatus.OPEN })
            .get(),
        )
      jest
        .spyOn(resumeRepository, 'getResumeById')
        .mockResolvedValue(MOCK_RESUME)
      jest.spyOn(repository, 'getApplicationbyActorJob').mockResolvedValue(null)
    })

    it('should apply by job id correctly', async () => {
      await expect(
        service.applyJob(MOCK_JOB_ID, MOCK_RESUME.resumeId, MOCK_ACTORS_ID),
      ).resolves.toEqual({ applicationId: MOCK_APPLICATION.applicationId })
    })

    it('should throw not found error if job not found', async () => {
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(null)
      await expect(
        service.applyJob(MOCK_JOB_ID, MOCK_RESUME.resumeId, MOCK_ACTORS_ID),
      ).rejects.toThrow(NotFoundException)
    })

    it('should throw forbidden error if job is not open', async () => {
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(
        mock('job')
          .override({
            status: JobStatus.SELECTING,
          })
          .get(),
      )
      await expect(
        service.applyJob(MOCK_JOB_ID, MOCK_RESUME.resumeId, MOCK_ACTORS_ID),
      ).rejects.toThrow(ForbiddenException)
    })

    it('should throw bad request error if resume not found', async () => {
      jest.spyOn(resumeRepository, 'getResumeById').mockResolvedValue(null)
      await expect(
        service.applyJob(MOCK_JOB_ID, MOCK_RESUME.resumeId, MOCK_ACTORS_ID),
      ).rejects.toThrow(BadRequestException)
    })

    it('should throw bad request error if user not the owner of resume', async () => {
      jest.spyOn(resumeRepository, 'getResumeById').mockResolvedValue(
        mock('resume')
          .override({ actorId: MOCK_ACTORS_ID + 1 })
          .get(),
      )
      await expect(
        service.applyJob(MOCK_JOB_ID, MOCK_RESUME.resumeId, MOCK_ACTORS_ID),
      ).rejects.toThrow(BadRequestException)
    })

    it('should throw conflict error if user already applied job', async () => {
      jest
        .spyOn(repository, 'getApplicationbyActorJob')
        .mockResolvedValue(MOCK_APPLICATION)
      await expect(
        service.applyJob(MOCK_JOB_ID, MOCK_RESUME.resumeId, MOCK_ACTORS_ID),
      ).rejects.toThrow(ConflictException)
    })
  })

  describe('rejectApplication', () => {
    const MOCK_JOB_ID = 1
    const MOCK_CASTING_ID = 1
    const MOCK_ACTOR_ID = 1
    const MOCK_APPLICATION_ID = 1

    beforeEach(() => {
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(
        mock('job')
          .override({
            castingId: MOCK_CASTING_ID,
            status: JobStatus.SELECTING,
          })
          .get(),
      )
      jest.spyOn(repository, 'getApplicationbyActorJob').mockResolvedValue(
        mock('application')
          .override({
            applicationId: MOCK_APPLICATION_ID,
            status: ApplicationStatus.PENDING,
          })
          .get(),
      )

      jest.spyOn(repository, 'rejectApplication').mockResolvedValue(null)
    })

    it('should reject application correctly', async () => {
      await service.rejectApplication(
        MOCK_JOB_ID,
        MOCK_ACTOR_ID,
        MOCK_CASTING_ID,
      )

      expect(repository.rejectApplication).toBeCalledWith(MOCK_APPLICATION_ID)
    })

    it('should throw bad request error if job is not selecting', async () => {
      jest
        .spyOn(jobRepository, 'getBaseJobById')
        .mockResolvedValue(
          mock('job')
            .override({ castingId: MOCK_CASTING_ID, status: JobStatus.OPEN })
            .get(),
        )
      await expect(
        service.rejectApplication(MOCK_JOB_ID, MOCK_ACTOR_ID, MOCK_CASTING_ID),
      ).rejects.toThrow(BadRequestException)
    })

    it('should throw not found error if application not found', async () => {
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(null)
      await expect(
        service.rejectApplication(MOCK_JOB_ID, MOCK_ACTOR_ID, MOCK_CASTING_ID),
      ).rejects.toThrow(NotFoundException)
    })

    it('should throw forbidden error if user is not owener of this job', async () => {
      jest.spyOn(jobRepository, 'getBaseJobById').mockResolvedValue(
        mock('job')
          .override({ castingId: MOCK_CASTING_ID + 1 })
          .get(),
      )
      await expect(
        service.rejectApplication(MOCK_JOB_ID, MOCK_ACTOR_ID, MOCK_CASTING_ID),
      ).rejects.toThrow(ForbiddenException)
    })

    it('should throw bad request error if actor did not apply this job', async () => {
      jest.spyOn(repository, 'getApplicationbyActorJob').mockResolvedValue(null)
      await expect(
        service.rejectApplication(MOCK_JOB_ID, MOCK_ACTOR_ID, MOCK_CASTING_ID),
      ).rejects.toThrow(BadRequestException)
    })

    it('should throw bad request error if application is not pending', async () => {
      jest
        .spyOn(repository, 'getApplicationbyActorJob')
        .mockResolvedValue(
          mock('application')
            .override({ status: ApplicationStatus.OFFER_SENT })
            .get(),
        )
      await expect(
        service.rejectApplication(MOCK_JOB_ID, MOCK_ACTOR_ID, MOCK_CASTING_ID),
      ).rejects.toThrow(BadRequestException)
    })
  })
})
