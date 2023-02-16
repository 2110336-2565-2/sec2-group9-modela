import { Example, mock } from '@modela/database'
import { CreateExampleDto, UpdateExampleDto } from '@modela/dtos'
import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

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

  describe('createExample', () => {
    it('should create example', async () => {
      const result: Example = mock('example').get()
      const data: CreateExampleDto = {
        name: result.name,
      }
      jest.spyOn(repository, 'createExample').mockResolvedValue(result)
      await expect(service.createExample(data)).resolves.toEqual(result)
      expect(repository.createExample).toBeCalledWith({ data })
    })
  })

  describe('getAllExample', () => {
    it('should return list of example', async () => {
      const result: Example[] = mock('example').get(2)
      jest.spyOn(repository, 'getExample').mockResolvedValue(result)
      expect(service.getAllExample()).resolves.toEqual(result)
    })
  })

  describe('getExampleById', () => {
    it('should return example that have id', async () => {
      const result: Example = mock('example').get()
      jest.spyOn(repository, 'getExampleById').mockResolvedValue(result)
      await expect(service.getExampleById(1)).resolves.toEqual(result)
      expect(repository.getExampleById).toBeCalledWith(result.id)
    })

    it('should throw not found exception', async () => {
      const result: Example = null
      const queryID = 2
      jest.spyOn(repository, 'getExampleById').mockResolvedValue(result)
      await expect(service.getExampleById(queryID)).rejects.toThrow(
        NotFoundException,
      )
      expect(repository.getExampleById).toBeCalledWith(queryID)
    })
  })

  describe('updateExample', () => {
    it('should return updated example', async () => {
      const mockedExample: Example = mock('example').get()
      const updatedExample: Example = {
        id: mockedExample.id,
        ...mock('example').get(),
      }
      const queryExample: UpdateExampleDto = {
        name: mockedExample.name,
      }

      jest.spyOn(repository, 'getExampleById').mockResolvedValue(mockedExample)
      jest.spyOn(repository, 'updateExample').mockResolvedValue(updatedExample)
      await expect(
        service.updateExample(updatedExample.id, queryExample),
      ).resolves.toEqual(updatedExample)
      expect(repository.getExampleById).toBeCalledWith(mockedExample.id)
      expect(repository.updateExample).toBeCalledWith({
        where: { id: updatedExample.id },
        data: { name: mockedExample.name },
      })
    })

    it('should throw error when cannot find id', async () => {
      const mockedExample: Example = null
      const queryID = 2
      const queryExample: UpdateExampleDto = mock('example').omit(['id']).get()

      jest.spyOn(repository, 'getExampleById').mockResolvedValue(mockedExample)
      jest.spyOn(repository, 'updateExample').mockResolvedValue(null)
      await expect(
        service.updateExample(queryID, queryExample),
      ).rejects.toThrow(NotFoundException)
      expect(repository.getExampleById).toBeCalledWith(queryID)
      expect(repository.updateExample).not.toHaveBeenCalled()
    })
  })

  describe('deleteExample', () => {
    it('should return deleted value', async () => {
      const mockedExample: Example = mock('example').get()

      jest.spyOn(repository, 'getExampleById').mockResolvedValue(mockedExample)
      jest.spyOn(repository, 'deleteExample').mockResolvedValue(mockedExample)
      await expect(service.deleteExample(mockedExample.id)).resolves.toEqual(
        mockedExample,
      )
      expect(repository.getExampleById).toBeCalledWith(mockedExample.id)
      expect(repository.deleteExample).toBeCalledWith(mockedExample.id)
    })

    it('should throw error when cannot find id', async () => {
      const mockedExample: Example = null
      const queryID = 2

      jest.spyOn(repository, 'getExampleById').mockResolvedValue(mockedExample)
      jest.spyOn(repository, 'deleteExample').mockResolvedValue(mockedExample)
      await expect(service.deleteExample(queryID)).rejects.toThrow(
        NotFoundException,
      )
      expect(repository.getExampleById).toBeCalledWith(queryID)
      expect(repository.deleteExample).not.toHaveBeenCalled()
    })
  })
})
