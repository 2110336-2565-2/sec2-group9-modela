import { EditActorProfileDto, mock, UserType } from '@modela/dtos'
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

  describe('editProfile', () => {
    const MOCK_USER_ID = 1
    const MOCK_USER_PROFILE = mock('user')
      .pick([
        'profileImageUrl',
        'phoneNumber',
        'description',
        'bankAccount',
        'bankName',
      ])
      .get()
    const MOCK_ACTOR_ONLY_PROFILE = mock('actor')
      .omit([
        'actorId',
        'idCardImageUrl',
        'prefix',
        'nationality',
        'ssn',
        'gender',
      ])
      .get()

    describe('editActor', () => {
      it('should edit actor profile correctly', async () => {
        const payload: EditActorProfileDto = {
          ...MOCK_USER_PROFILE,
          ...MOCK_ACTOR_ONLY_PROFILE,
        }

        jest.spyOn(repository, 'editActor').mockResolvedValue()
        jest.spyOn(repository, 'editUser').mockResolvedValue()

        await service.editActor(MOCK_USER_ID, payload)
        expect(repository.editUser).toBeCalledWith(
          MOCK_USER_ID,
          MOCK_USER_PROFILE,
        )
        expect(repository.editActor).toBeCalledWith(
          MOCK_USER_ID,
          MOCK_ACTOR_ONLY_PROFILE,
        )
      })
    })

    describe('editCasting', () => {
      it('should edit casting profile correctly', async () => {
        jest.spyOn(repository, 'editUser').mockResolvedValue()

        await service.editCasting(MOCK_USER_ID, MOCK_USER_PROFILE)

        expect(repository.editUser).toBeCalledWith(
          MOCK_USER_ID,
          MOCK_USER_PROFILE,
        )
      })
    })

    describe('getProfileForEditing', () => {
      it('should get casting profile correctly', async () => {
        jest
          .spyOn(repository, 'getUserProfileForEditing')
          .mockResolvedValue(MOCK_USER_PROFILE)

        const result = await service.getProfileForEditing(
          MOCK_USER_ID,
          UserType.CASTING,
        )

        expect(repository.getUserProfileForEditing).toBeCalledWith(MOCK_USER_ID)
        expect(result).toEqual({
          type: UserType.CASTING,
          data: MOCK_USER_PROFILE,
        })
      })

      it('should get casting profile correctly', async () => {
        jest
          .spyOn(repository, 'getUserProfileForEditing')
          .mockResolvedValue(MOCK_USER_PROFILE)

        jest
          .spyOn(repository, 'getActorProfileForEditing')
          .mockResolvedValue(MOCK_ACTOR_ONLY_PROFILE)

        const result = await service.getProfileForEditing(
          MOCK_USER_ID,
          UserType.ACTOR,
        )

        expect(repository.getUserProfileForEditing).toBeCalledWith(MOCK_USER_ID)
        expect(result).toEqual({
          type: UserType.ACTOR,
          data: { ...MOCK_USER_PROFILE, ...MOCK_ACTOR_ONLY_PROFILE },
        })
      })
    })
  })
})
