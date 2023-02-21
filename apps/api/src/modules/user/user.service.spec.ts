import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

import { FileService } from '../file/file.service'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        PrismaService,
        FileService,
        ConfigService,
      ],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
