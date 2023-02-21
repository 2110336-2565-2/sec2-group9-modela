import { mock, UserStatus, UserType } from '@modela/database'
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
})
