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
    //test module
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobService, JobRepository, PrismaService],
    }).compile()

    service = module.get<JobService>(JobService)
    repository = module.get<JobRepository>(JobRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  it('should get all job successfully', async () => {
    const limitQueryMax = 10 //loop check all limitQuery 1-10
    const jobDataLength = 10 //fixed mock data length in repository

    //mock repository
    jest
      .spyOn(repository, 'getJob')
      .mockResolvedValue(mock('job').get(jobDataLength))

    //get mocked repository
    const itMockedJobData = await repository.getJobJoined({
      take: jobDataLength,
    })

    //loop check all limitQuery 1-10 and pageQuery 1-10
    for (let limitQuery = 1; limitQuery <= limitQueryMax; limitQuery++) {
      for (
        let pageQuery = 1;
        pageQuery <= Math.ceil(jobDataLength / limitQuery) + 1;
        pageQuery++
      ) {
        //test environment
        const result = new GetJobCardWithMaxPageDto()
        result.maxPage = Math.ceil(jobDataLength / limitQuery)
        result.jobs = itMockedJobData
        const reqParams: SearchJobDto = {
          limit: limitQuery,
          page: pageQuery,
        }

        //check repository mock
        jest
          .spyOn(repository, 'getJobJoined')
          .mockResolvedValue(itMockedJobData)

        //check all property
        await expect(service.findAll(reqParams)).resolves.toEqual(result)

        //check repository called with correct params
        const prismaParams = service.convertRequestToParams(reqParams)
        expect(repository.getJobJoined).toBeCalledWith(prismaParams)
      }
    }
  }) //end it
})
