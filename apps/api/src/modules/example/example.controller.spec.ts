import { Test, TestingModule } from '@nestjs/testing'
import { Example } from '@prisma/client'
import { getMock } from 'src/common/mocks'
import { PrismaService } from 'src/database/prisma.service'

import { ExampleController } from './example.controller'
import { CreateExampleDto } from './example.dto'
import { ExampleRepository } from './example.repository'
import { ExampleService } from './example.service'

describe('ExampleController', () => {
  let controller: ExampleController
  let service: ExampleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [ExampleService, ExampleRepository, PrismaService],
    }).compile()

    controller = module.get<ExampleController>(ExampleController)
    service = module.get<ExampleService>(ExampleService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('createExample', () => {
    it('should create example', async () => {
      const MOCK_EXAMPLE: Example = getMock('example')
      jest
        .spyOn(service, 'createExample')
        .mockImplementation(async (data: CreateExampleDto) => {
          return { id: 1, ...data }
        })

      expect(
        await controller.createExample({ name: MOCK_EXAMPLE.name }),
      ).toMatchObject(MOCK_EXAMPLE)
    })
  })
})
