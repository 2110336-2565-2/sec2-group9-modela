import { ConflictException } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { mock } from 'src/common/mocks'
import { PrismaService } from 'src/database/prisma.service'

import { AuthRepository } from './auth.repository'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService
  let repository: AuthRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, JwtModule],
      providers: [AuthService, AuthRepository, PrismaService],
    }).compile()

    service = module.get<AuthService>(AuthService)
    repository = module.get<AuthRepository>(AuthRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createCasting', () => {
    const signupCastingDto = {
      ...mock('user')
        .pick(['email', 'password', 'firstName', 'middleName', 'lastName'])
        .get(),
      ...mock('casting').omit(['castingId']).get(),
    }

    it('should create casting correctly', async () => {
      jest.spyOn(repository, 'getUserByEmail').mockResolvedValue(null)
      jest.spyOn(repository, 'createCasting').mockResolvedValue()

      await service.createCasting(signupCastingDto)
      const { password, ...rest } = signupCastingDto
      expect(repository.createCasting).toBeCalledWith(
        expect.objectContaining(rest),
      )
      expect(repository.createCasting).toBeCalledWith(
        expect.not.objectContaining({ password }),
      )
    })

    describe('email is already used', () => {
      it('should throw conflict exeception', async () => {
        jest
          .spyOn(repository, 'getUserByEmail')
          .mockResolvedValue(mock('user').get())
        jest.spyOn(repository, 'createCasting').mockResolvedValue()

        await expect(service.createCasting(signupCastingDto)).rejects.toThrow(
          ConflictException,
        )
      })
    })
  })

  describe('createActor', () => {
    const signupActorDto = {
      ...mock('user')
        .pick([
          'email',
          'password',
          'firstName',
          'middleName',
          'lastName',
          'phoneNumber',
        ])
        .get(),
      ...mock('actor')
        .pick(['prefix', 'nationality', 'ssn', 'gender', 'idCardImageUrl'])
        .get(),
    }

    it('should create actor correctly', async () => {
      jest.spyOn(repository, 'getUserByEmail').mockResolvedValue(null)
      jest.spyOn(repository, 'createActor').mockResolvedValue()

      await service.createActor(signupActorDto)
      const { password, ...rest } = signupActorDto
      expect(repository.createActor).toBeCalledWith(
        expect.objectContaining(rest),
      )
      expect(repository.createActor).toBeCalledWith(
        expect.not.objectContaining({ password }),
      )
    })

    describe('email is already used', () => {
      it('should throw conflict exeception', async () => {
        jest
          .spyOn(repository, 'getUserByEmail')
          .mockResolvedValue(mock('user').get())
        jest.spyOn(repository, 'createActor').mockResolvedValue()

        await expect(service.createActor(signupActorDto)).rejects.toThrow(
          ConflictException,
        )
      })
    })
  })
})
