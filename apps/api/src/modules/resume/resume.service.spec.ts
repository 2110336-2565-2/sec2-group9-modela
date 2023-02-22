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
      const MOCK_DB_ACTOR = mock('actor').get()
      jest.spyOn(repository, 'createResume').mockResolvedValue({ resumeId: 11 })
      jest
        .spyOn(repository, 'getActorFromUser')
        .mockResolvedValue(MOCK_DB_ACTOR)
      const result = await service.createResume(postResumeDto, MOCK_ACTOR)
      expect(repository.createResume).toBeCalledWith(
        postResumeDto,
        MOCK_DB_ACTOR,
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

    // by id

    it('should get resume correctly', async () => {
      jest.spyOn(repository, 'getResumeById').mockResolvedValue(MOCK_RESUME)
      const MOCK_ACTOR_DB = mock('actor').override({ actorId: 1 }).get()
      jest
        .spyOn(repository, 'getActorFromUser')
        .mockResolvedValue(MOCK_ACTOR_DB)
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
      const MOCK_ACTOR_ALT_DB = mock('actor').override({ actorId: 2 }).get()
      jest
        .spyOn(repository, 'getActorFromUser')
        .mockResolvedValue(MOCK_ACTOR_ALT_DB)
      await expect(service.getResumeById(1, MOCK_ACTOR_ALT)).rejects.toThrow(
        ForbiddenException,
      )
    })
  })
})
