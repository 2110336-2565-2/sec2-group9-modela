import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Example } from '@prisma/client'

import { PrismaService } from '../../database/prisma.service'
import { ExampleRepository } from './example.repository'
import { ExampleService } from './example.service'

describe('ExampleService', () => {
  let service: ExampleService
  let repository: ExampleRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleService, ExampleRepository, PrismaService],
    }).compile()

    service = module.get<ExampleService>(ExampleService)
    repository = module.get<ExampleRepository>(ExampleRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getAllExample', () => {
    it('should return list of example', async () => {
      const result: Example[] = [
        {
          id: 1,
          name: 'test1',
        },
        {
          id: 2,
          name: 'test2',
        },
      ]
      jest
        .spyOn(repository, 'getExample')
        .mockImplementation(async () => result)
      expect(await service.getAllExample()).toBe(result)
    })
  })

  describe('getExampleById', () => {
    it('should return example that have id', async () => {
      const result: Example = {
        id: 1,
        name: 'test1',
      }
      jest
        .spyOn(repository, 'getExampleById')
        .mockImplementation(async () => result)
      expect(await service.getExampleById(1)).toBe(result)
    })

    it('should throw not found exception', async () => {
      const result: Example = null
      jest
        .spyOn(repository, 'getExampleById')
        .mockImplementation(async () => result)
      await expect(service.getExampleById(2)).rejects.toThrow(NotFoundException)
    })
  })
})
