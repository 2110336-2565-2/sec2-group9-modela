import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'
import { FileService } from 'src/modules/file/file.service'

import { InfoRepository } from './info.repository'
import { InfoService } from './info.service'

describe('InfoService', () => {
  let service: InfoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InfoService,
        PrismaService,
        FileService,
        InfoRepository,
        ConfigService,
      ],
    }).compile()

    service = module.get<InfoService>(InfoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
