import { Test, TestingModule } from '@nestjs/testing'
import { Job } from '@prisma/client'
import { mock } from 'src/common/mocks'
import { PrismaService } from 'src/database/prisma.service'

import { GetJobCardWithMaxPageDto, SearchJobDto } from './job.dto'
import { JobRepository } from './job.repository'
import { JobService } from './job.service'

describe('JobService', () => {
  let service: JobService
  let repository: JobRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobService, JobRepository, PrismaService],
    }).compile()

    service = module.get<JobService>(JobService)
    repository = module.get<JobRepository>(JobRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAllJob', () => {
    const limitQueryMax = 20 //loop check all limitQuery 1-20
    const dataLength = 40 //fixed mock data length in repository
    for (let limitQuery = 1; limitQuery <= limitQueryMax; limitQuery++) {
      it('should have correct maxPage and data', async () => {
        //test environment
        const result = new GetJobCardWithMaxPageDto()
        const stableMock = mock('job').get(dataLength)

        result.jobs = stableMock

        result.maxPage = Math.ceil(dataLength / limitQuery)
        const reqParams: SearchJobDto = {
          limit: limitQuery,
          page: 1,
        }

        //build repository mock
        jest.spyOn(repository, 'getJob').mockResolvedValue(stableMock)

        //check all property
        await expect(service.findAll(reqParams)).resolves.toEqual(result)

        //check repository called with correct params
        const prismaParams = service.convertRequestToParams(reqParams)
        expect(repository.getJob).toBeCalledWith(prismaParams)
      })
    }
  })
})
