import { mock } from '@modela/database'
import { ConflictException, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { response } from 'express'
import { PrismaService } from 'src/database/prisma.service'

import { AuthRepository } from './auth.repository'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService
  let repository: AuthRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        AuthRepository,
        PrismaService,
        JwtService,
        ConfigService,
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
    repository = module.get<AuthRepository>(AuthRepository)
    jest
      .spyOn(service, 'createJwtToken')
      .mockReturnValue({ message: 'Login Successful' })
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

      await service.createCasting(signupCastingDto, response)
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

        await expect(
          service.createCasting(signupCastingDto, response),
        ).rejects.toThrow(ConflictException)
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

      await service.createActor(signupActorDto, response)
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

        await expect(
          service.createActor(signupActorDto, response),
        ).rejects.toThrow(ConflictException)
      })
    })
  })

  describe('login', () => {
    const password = 'password'
    const mockUser = {
      ...mock('user').get(),
    }

    it('should login correctly', async () => {
      jest.spyOn(repository, 'getUserByEmail').mockResolvedValue(mockUser)
      const res = response
      await expect(
        service.verfyPassword(
          {
            email: mockUser.email,
            password,
          },
          res,
        ),
      ).resolves.toEqual({ message: 'Login Successful' })
    })

    describe('wrong email', () => {
      it('should throw exeception', async () => {
        jest.spyOn(repository, 'getUserByEmail').mockResolvedValue(null)
        const res = response
        await expect(
          service.verfyPassword(
            {
              email: mockUser.email,
              password,
            },
            res,
          ),
        ).rejects.toThrow(UnauthorizedException)
      })
    })

    describe('wrong password', () => {
      it('should throw exeception', async () => {
        jest.spyOn(repository, 'getUserByEmail').mockResolvedValue(null)
        const res = response
        await expect(
          service.verfyPassword(
            {
              email: mockUser.email,
              password: '12345',
            },
            res,
          ),
        ).rejects.toThrow(UnauthorizedException)
      })
    })
  })
})
