import { mock, UserType } from '@modela/database'
import {
  GetJobCardDto,
  GetJobCardWithMaxPageDto,
  SearchJobDto,
} from '@modela/dtos'
import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

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
    const limitQueryMax = 20 //loop check all limitQuery 1 - limitQueryMax
    const jobDataLength = 50 //fixed mock data length in repository

    //mock repository
    const itMockedJobData: GetJobCardDto[] = Array.from(
      { length: jobDataLength },
      (v, i) => {
        const userData = mock('user').pick(['profileImageUrl']).get()
        return {
          jobId: i + 1,
          ...mock('job').omit(['jobId']).get(),
          ...mock('casting').pick(['companyName']).get(),
          jobCastingImageUrl: userData.profileImageUrl,
        }
      },
    )

    //loop check all limitQuery 1 - limitQueryMax and all pageQuery
    for (let limitQuery = 1; limitQuery <= limitQueryMax; limitQuery++) {
      for (
        let pageQuery = 1;
        pageQuery <= Math.ceil(jobDataLength / limitQuery) + 1;
        pageQuery++
      ) {
        //generate expected result
        const result = new GetJobCardWithMaxPageDto()
        result.maxPage = Math.ceil(jobDataLength / limitQuery)
        result.jobs = itMockedJobData.slice(
          limitQuery * (pageQuery - 1),
          limitQuery * pageQuery,
        )
        //input request params
        const reqParams: SearchJobDto = {
          limit: limitQuery,
          page: pageQuery,
        }

        //mock the repository
        jest
          .spyOn(repository, 'getJobCount')
          .mockReturnValue(Promise.resolve(jobDataLength))
        jest
          .spyOn(repository, 'getJobJoined')
          .mockImplementation(async (reqParams) =>
            itMockedJobData.slice(
              reqParams.skip,
              reqParams.skip + reqParams.take,
            ),
          )

        //check all property
        await expect(service.findAll(reqParams)).resolves.toEqual(result)

        //check repository called with correct params
        const prismaParams = {
          take: limitQuery,
          skip: (pageQuery - 1) * limitQuery,
          where: {},
        }
        expect(repository.getJobJoined).toBeCalledWith(prismaParams)
      }
    }
  }) //end it

  describe('findOne', () => {
    const MOCK_CASTING_ID = 1
    const MOCK_JOB_ID = 1
    const MOCK_JOB = {
      ...mock('job').omit(['castingId', 'createdAt', 'updatedAt']).get(),
      castingId: MOCK_CASTING_ID,
      shooting: mock('shooting').get(3),
      companyName: mock('casting').get().companyName,
      jobCastingImageUrl: mock('user').get().profileImageUrl,
    }

    const MOCK_USER = {
      userId: 2,
      type: UserType.ACTOR,
    }
    describe('normal behavior', () => {
      it('should get job by id successfully', async () => {
        jest.spyOn(repository, 'getJobById').mockResolvedValue(MOCK_JOB)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { castingId, ...result } = MOCK_JOB

        await expect(service.findOne(MOCK_JOB_ID, MOCK_USER)).resolves.toEqual(
          result,
        )
        expect(repository.getJobById).toBeCalledWith(MOCK_JOB_ID)
      })
    })

    describe('job not found', () => {
      it('should throw not found exception', async () => {
        jest.spyOn(repository, 'getJobById').mockResolvedValue(null)

        await expect(service.findOne(MOCK_JOB_ID, MOCK_USER)).rejects.toThrow(
          NotFoundException,
        )
      })
    })

    describe('user is casting but not the owner of the job', () => {
      it('should throw forbidden exception', () => {
        jest.spyOn(repository, 'getJobById').mockResolvedValue(MOCK_JOB)

        expect(
          service.findOne(MOCK_JOB_ID, {
            ...MOCK_USER,
            type: UserType.CASTING,
          }),
        ).rejects.toThrow(ForbiddenException)
      })
    })
  })
})
