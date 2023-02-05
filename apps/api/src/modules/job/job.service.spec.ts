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

  describe('findAll', () => {
    //generate default where query
    const defaultWhere = {
      Shooting: {
        every: {
          endDate: {
            lte: new Date('9999-12-31T23:59:59.000Z'),
          },
          endTime: {
            lte: new Date('1970-01-01T23:59:59.000Z'),
          },
          startDate: {
            gte: new Date('0001-01-01T00:00:00.000Z'),
          },
          startTime: {
            gte: new Date('1970-01-01T00:00:00.000Z'),
          },
        },
        some: {
          shootingLocation: undefined,
        },
      },
      castingId: undefined,
      gender: undefined,
      maxAge: {
        gte: 0,
      },
      minAge: {
        lte: 999,
      },
      status: {
        in: ['OPEN'],
      },
      wage: {
        gte: 0,
        lte: 999999999,
      },
    }
    //const for all findAll test
    const limitQueryMax = 20 //loop check all limitQuery 1 - limitQueryMax
    const jobDataLength = 50 //fixed mock data length in repository
    const MOCK_CASTING_ID = 22

    const limitQuery = 10 //default limitQuery
    const pageQuery = 1 //default pageQuery
    //mock repository for all findAll test
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
    //mock user
    const MOCK_USER_ACTOR = {
      userId: 1,
      type: UserType.ACTOR,
      isVerified: true,
    }
    const MOCK_USER_CASTING = {
      userId: MOCK_CASTING_ID,
      type: UserType.CASTING,
      isVerified: true,
    }

    //begin each findAll test
    describe('findAll without filter', () => {
      it('should get all job successfully', async () => {
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
            await expect(
              service.findAll(reqParams, MOCK_USER_ACTOR),
            ).resolves.toEqual(result)

            //check repository called with correct params
            const prismaParams = {
              take: limitQuery,
              skip: (pageQuery - 1) * limitQuery,
              where: defaultWhere,
            }
            expect(repository.getJobJoined).toBeCalledWith(prismaParams)
          }
        }
      }) //end it
    })

    describe('findAll by casting', () => {
      describe('Forbidden casting search', () => {
        //input request params
        const reqParams: SearchJobDto = {
          limit: 1,
          page: 1,
          castingId: 1,
        }

        it('should throw not forbidden exception', async () => {
          await expect(
            service.findAll(reqParams, MOCK_USER_CASTING),
          ).rejects.toThrow(ForbiddenException)
        })
      })

      const jobDataLength = 50 //fixed mock data length in repository
      const itMockedJobDataNotEqualCastingId = Array.from(
        { length: Math.ceil(jobDataLength / 2) },
        (v, i) => {
          const userData = mock('user').pick(['profileImageUrl']).get()
          return {
            jobId: i + Math.floor(jobDataLength / 2) + 1,
            ...mock('job').omit(['jobId']).get(),
            castingId: MOCK_CASTING_ID + 1,
            ...mock('casting').pick(['companyName']).get(),
            jobCastingImageUrl: userData.profileImageUrl,
          }
        },
      )
      const itMockedJobData = Array.from(
        { length: Math.floor(jobDataLength / 2) },
        (v, i) => {
          const userData = mock('user').pick(['profileImageUrl']).get()
          return {
            jobId: i + 1,
            ...mock('job').omit(['jobId']).get(),
            castingId: MOCK_CASTING_ID,
            ...mock('casting').pick(['companyName']).get(),
            jobCastingImageUrl: userData.profileImageUrl,
          }
        },
      ).concat(itMockedJobDataNotEqualCastingId)

      describe('get filtered by castingId use case', () => {
        //generate expected result
        const limitQuery = 20
        const pageQuery = 1
        const result = new GetJobCardWithMaxPageDto()
        result.jobs = itMockedJobData
          .filter((job) => job.castingId === MOCK_CASTING_ID)
          .slice(limitQuery * (pageQuery - 1), limitQuery * pageQuery)
        result.maxPage = Math.ceil(result.jobs.length / limitQuery)
        //input request params
        const reqParams: SearchJobDto = {
          limit: limitQuery,
          page: pageQuery,
          castingId: MOCK_CASTING_ID,
        }

        it('should get filtered job successfully with different user', async () => {
          //mock the repository
          jest
            .spyOn(repository, 'getJobCount')
            .mockReturnValue(Promise.resolve(result.jobs.length))
          jest
            .spyOn(repository, 'getJobJoined')
            .mockImplementation(async (reqParams) =>
              itMockedJobData
                .filter((job) => job.castingId === MOCK_CASTING_ID)
                .slice(reqParams.skip, reqParams.skip + reqParams.take),
            )

          //check all property
          await expect(
            service.findAll(reqParams, MOCK_USER_CASTING),
          ).resolves.toEqual(result)
          await expect(
            service.findAll(reqParams, MOCK_USER_ACTOR),
          ).resolves.toEqual(result)

          //check repository called with correct params
          const thisWhere = defaultWhere
          thisWhere.castingId = MOCK_CASTING_ID
          const prismaParams = {
            take: limitQuery,
            skip: (pageQuery - 1) * limitQuery,
            where: thisWhere,
          }
          expect(repository.getJobJoined).toBeCalledWith(prismaParams)
        })
      })
    })

    describe('findAll with filter', () => {
      it('should can be call with params', async () => {
        const reqParams: SearchJobDto = {
          limit: limitQuery,
          page: pageQuery,
        }
        const thisReqParams = reqParams
        const result = new GetJobCardWithMaxPageDto()
        result.maxPage = Math.ceil(1)
        result.jobs = itMockedJobData.slice(
          limitQuery * (pageQuery - 1),
          limitQuery * pageQuery,
        )

        jest
          .spyOn(repository, 'getJobCount')
          .mockReturnValue(Promise.resolve(result.jobs.length))
        jest
          .spyOn(repository, 'getJobJoined')
          .mockImplementation(async (reqParams) =>
            itMockedJobData.slice(
              reqParams.skip,
              reqParams.skip + reqParams.take,
            ),
          )

        await expect(
          service.findAll(reqParams, MOCK_USER_CASTING),
        ).resolves.toEqual(result)

        const thisWhere = defaultWhere
        thisWhere.wage = {
          gte: 0,
          lte: 999999999,
        }
        thisWhere.castingId = MOCK_CASTING_ID
        const prismaParams = {
          take: limitQuery,
          skip: (pageQuery - 1) * limitQuery,
          where: thisWhere,
        }
        expect(repository.getJobJoined).toBeCalledWith(prismaParams)
      })
    })
  })
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
      isVerified: true,
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
