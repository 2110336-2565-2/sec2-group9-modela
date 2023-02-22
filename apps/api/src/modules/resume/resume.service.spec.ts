import { mock, UserStatus, UserType } from '@modela/database'
import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

import { ResumeRepository } from './resume.respository'
import { ResumeService } from './resume.service'

describe('ResumeService', () => {
  let service: ResumeService
  let repository: ResumeRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResumeService, ResumeRepository, PrismaService],
    }).compile()

    service = module.get<ResumeService>(ResumeService)
    repository = module.get<ResumeRepository>(ResumeRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })

  describe('postResume', () => {
    const MOCK_RESUME_NAME = 'Test Resume'
    const MOCK_RESUME_URL = 'github.com'

    const MOCK_ACTOR = {
      userId: 1,
      status: UserStatus.ACCEPTED,
      type: UserType.ACTOR,
    }

    const postResumeDto = {
      name: MOCK_RESUME_NAME,
      resumeUrl: MOCK_RESUME_URL,
    }

    it('should post resume correctly', async () => {
      jest.spyOn(repository, 'createResume').mockResolvedValue({ resumeId: 11 })
      const result = await service.createResume(postResumeDto, MOCK_ACTOR)
      expect(repository.createResume).toBeCalledWith(
        postResumeDto,
        MOCK_ACTOR.userId,
      )
      expect(result).toEqual({ resumeId: 11 })
    })
  })

  describe('getResume', () => {
    const MOCK_ACTOR = {
      userId: 1,
      status: UserStatus.ACCEPTED,
      type: UserType.ACTOR,
    }

    const MOCK_ACTOR_ALT = {
      userId: 2,
      status: UserStatus.ACCEPTED,
      type: UserType.ACTOR,
    }

    const MOCK_CASTING = {
      userId: 1,
      status: UserStatus.ACCEPTED,
      type: UserType.CASTING,
    }

    const MOCK_RESUME = {
      resumeId: 1,
      name: 'Test Resume',
      resumeUrl: 'github.com',
      actorId: 1,
    }

    const MOCK_RESUME_ALT = {
      resumeId: 2,
      name: 'Test Resume',
      resumeUrl: 'github.com',
      actorId: 1,
    }

    // by id

    it('should get resume correctly', async () => {
      jest.spyOn(repository, 'getResumeById').mockResolvedValue(MOCK_RESUME)
      const result = await service.getResumeById(1, MOCK_ACTOR)
      expect(repository.getResumeById).toBeCalledWith(1)
      expect(result).toEqual(MOCK_RESUME)
    })

    it('should throw error if resume not found', async () => {
      jest.spyOn(repository, 'getResumeById').mockResolvedValue(null)
      await expect(
        service.getResumeById(123456789, MOCK_ACTOR),
      ).rejects.toThrow(NotFoundException)
    })

    it('should get resume correctly if user is casting', async () => {
      jest.spyOn(repository, 'getResumeById').mockResolvedValue(MOCK_RESUME)
      const result = await service.getResumeById(1, MOCK_CASTING)
      expect(repository.getResumeById).toBeCalledWith(1)
      expect(result).toEqual(MOCK_RESUME)
    })

    it('should throw error if user is not the owner of the resume', async () => {
      jest.spyOn(repository, 'getResumeById').mockResolvedValue(MOCK_RESUME)
      await expect(service.getResumeById(1, MOCK_ACTOR_ALT)).rejects.toThrow(
        ForbiddenException,
      )
    })

    // by actor id

    it('should get resume correctly', async () => {
      jest
        .spyOn(repository, 'getResumesByActorId')
        .mockResolvedValue({ resumes: [MOCK_RESUME, MOCK_RESUME_ALT] })
      const MOCK_ACTOR_USER = mock('user').override({ userId: 1 }).get()
      const result = await service.getResumesByUser(MOCK_ACTOR_USER)
      expect(repository.getResumesByActorId).toBeCalledWith(1)
      expect(result).toEqual({ resumes: [MOCK_RESUME, MOCK_RESUME_ALT] })
    })
  })
})
