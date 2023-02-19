import { EditActorProfileDto, mock } from '@modela/dtos'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

import { ProfileRepository } from './profile.repository'
import { ProfileService } from './profile.service'

describe('ProfileService', () => {
  let service: ProfileService
  let repository: ProfileRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService, ProfileRepository, PrismaService],
    }).compile()

    service = module.get<ProfileService>(ProfileService)
    repository = module.get<ProfileRepository>(ProfileRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('editActor', () => {
    it('should edit actor profile correctly', () => {
      const MOCK_USER_ID = 1
      const payload: EditActorProfileDto = {
        ...mock('actor')
          .omit([
            'actorId',
            'idCardImageUrl',
            'prefix',
            'nationality',
            'ssn',
            'gender',
          ])
          .get(),
        ...mock('user')
          .pick([
            'profileImageUrl',
            'phoneNumber',
            'description',
            'bankAccount',
            'bankName',
          ])
          .get(),
      }

      jest.spyOn(repository, 'editActor').mockResolvedValue()
      service.editActor(MOCK_USER_ID, payload)
      expect(repository.editActor).toBeCalledWith(MOCK_USER_ID, payload)
    })
  })
})
