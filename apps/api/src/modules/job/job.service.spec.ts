import { JobStatus, mock, UserStatus, UserType } from '@modela/database'
import {
  GetJobCardDto,
  GetJobCardWithMaxPageDto,
  SearchJobDto,
} from '@modela/dtos'
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/database/prisma.service'

import { RefundRepository } from '../refund/refund.repository'
import { JobRepository } from './job.repository'
import { JobService } from './job.service'

function createValidJob() {
  const MOCK_START_DATE = new Date()
  MOCK_START_DATE.setFullYear(MOCK_START_DATE.getFullYear() + 2)
  const MOCK_END_DATE = new Date()
  MOCK_END_DATE.setFullYear(MOCK_END_DATE.getFullYear() + 3)
  const MOCK_APPLICATION_DEADLINE = new Date()
  MOCK_APPLICATION_DEADLINE.setFullYear(
    MOCK_APPLICATION_DEADLINE.getFullYear() + 1,
  )
  const MOCK_START_TIME = new Date()
  MOCK_START_TIME.setHours(1)
  const MOCK_END_TIME = new Date()
  MOCK_END_TIME.setHours(16)

  const MOCK_JOB = {
    ...mock('job')
      .omit(['castingId', 'createdAt', 'updatedAt', 'jobId', 'status'])
      .override({ applicationDeadline: MOCK_APPLICATION_DEADLINE })
      .get(),
    shooting: mock('shooting')
      .override({
        startDate: MOCK_START_DATE,
        endDate: MOCK_END_DATE,
        startTime: MOCK_START_TIME,
        endTime: MOCK_END_TIME,
      })
      .get(3),
  }

  // set actorCount, minAge and wage to be 1 if they are less than 1
  if (MOCK_JOB.actorCount < 1) {
    MOCK_JOB.actorCount = 1
  }
  if (MOCK_JOB.minAge < 1) {
    MOCK_JOB.minAge = 1
  }
  if (MOCK_JOB.wage < 1) {
    MOCK_JOB.wage = 1
  }
  return MOCK_JOB
}

describe('JobService', () => {
  let service: JobService
  let repository: JobRepository

  beforeEach(async () => {
    //test module
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobService, JobRepository, PrismaService, RefundRepository],
    }).compile()

    service = module.get<JobService>(JobService)
    repository = module.get<JobRepository>(JobRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
    //generate default where query
    const maxInt32 = 2147483647 //max int32
    const defaultWhere = {
      Shooting: undefined,
      title: undefined,
      castingId: undefined,
      gender: undefined,
      maxAge: {
        gte: 0,
      },
      minAge: {
        lte: maxInt32,
      },
      status: {
        in: ['OPEN'],
      },
      wage: {
        gte: 0,
        lte: maxInt32,
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
          castingName: mock('user').get().firstName,
        }
      },
    )
    //mock user
    const MOCK_USER_ACTOR = {
      userId: 1,
      type: UserType.ACTOR,
      status: UserStatus.ACCEPTED,
    }
    const MOCK_USER_CASTING = {
      userId: MOCK_CASTING_ID,
      type: UserType.CASTING,
      status: UserStatus.ACCEPTED,
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
            expect(repository.getJobJoined).toBeCalledWith(
              prismaParams,
              MOCK_USER_ACTOR,
            )
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
          const userData = mock('user')
            .pick(['profileImageUrl', 'firstName'])
            .get()
          return {
            jobId: i + Math.floor(jobDataLength / 2) + 1,
            ...mock('job').omit(['jobId']).get(),
            castingId: MOCK_CASTING_ID + 1,
            ...mock('casting').pick(['companyName']).get(),
            jobCastingImageUrl: userData.profileImageUrl,
            castingName: userData.firstName,
          }
        },
      )
      const itMockedJobData = Array.from(
        { length: Math.floor(jobDataLength / 2) },
        (v, i) => {
          const userData = mock('user')
            .pick(['profileImageUrl', 'firstName'])
            .get()
          return {
            jobId: i + 1,
            ...mock('job').omit(['jobId']).get(),
            castingId: MOCK_CASTING_ID,
            ...mock('casting').pick(['companyName']).get(),
            jobCastingImageUrl: userData.profileImageUrl,
            castingName: userData.firstName,
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
          expect(repository.getJobJoined).toBeCalledWith(
            prismaParams,
            MOCK_USER_CASTING,
          )
          expect(repository.getJobJoined).toBeCalledWith(
            prismaParams,
            MOCK_USER_ACTOR,
          )
        })
      })
    })

    describe('findAll with filter', () => {
      it('should can be call with params', async () => {
        const reqParams: SearchJobDto = {
          limit: limitQuery,
          page: pageQuery,
        }
        const result = new GetJobCardWithMaxPageDto()
        result.jobs = itMockedJobData.slice(
          limitQuery * (pageQuery - 1),
          limitQuery * pageQuery,
        )
        result.maxPage = Math.ceil(result.jobs.length / limitQuery)

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
          lte: maxInt32,
        }
        thisWhere.castingId = MOCK_CASTING_ID
        const prismaParams = {
          take: limitQuery,
          skip: (pageQuery - 1) * limitQuery,
          where: thisWhere,
        }
        expect(repository.getJobJoined).toBeCalledWith(
          prismaParams,
          MOCK_USER_CASTING,
        )
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
      castingName: mock('user').get().firstName,
    }

    const MOCK_USER = {
      userId: 2,
      type: UserType.ACTOR,
      status: UserStatus.ACCEPTED,
    }
    describe('normal behavior', () => {
      it('should get job by id successfully', async () => {
        jest.spyOn(repository, 'getJobById').mockResolvedValue(MOCK_JOB)

        await expect(service.findOne(MOCK_JOB_ID, MOCK_USER)).resolves.toEqual(
          MOCK_JOB,
        )
        expect(repository.getJobById).toBeCalledWith(MOCK_JOB_ID, MOCK_USER)
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

  describe('postJob', () => {
    const MOCK_CASTING_ID = 1

    describe('normal behavior', () => {
      it('should create the job successfully', async () => {
        const MOCK_JOB = createValidJob()

        const result = mock('job').get()

        jest
          .spyOn(repository, 'createJob')
          .mockResolvedValue({ jobId: result.jobId })

        await service.createJob(MOCK_JOB, MOCK_CASTING_ID)

        expect(repository.createJob).toBeCalledWith(MOCK_JOB, MOCK_CASTING_ID)
      })

      it('should be bad request due to date conflict', async () => {
        const MOCK_JOB = createValidJob()

        const result = mock('job').get()
        MOCK_JOB.applicationDeadline = new Date()
        MOCK_JOB.applicationDeadline.setDate(
          MOCK_JOB.applicationDeadline.getDate() - 1,
        )

        jest
          .spyOn(repository, 'createJob')
          .mockResolvedValue({ jobId: result.jobId })

        await expect(
          service.createJob(MOCK_JOB, MOCK_CASTING_ID),
        ).rejects.toThrow(BadRequestException)

        // expect repository.createJob to not be called
        expect(repository.createJob).not.toBeCalled()
      })
    })
  })

  describe('updateJob', () => {
    const MOCK_CASTING_ID = 1
    const MOCK_UPDATED_TITLE = 'updated title'
    const result = mock('job').get()

    beforeEach(() => {
      jest.spyOn(repository, 'getBaseJobById').mockResolvedValue(
        mock('job')
          .override({
            castingId: MOCK_CASTING_ID,
            jobId: result.jobId,
            status: JobStatus.OPEN,
          })
          .get(),
      )
    })

    describe('normal behavior', () => {
      it('should update the job successfully', async () => {
        const MOCK_JOB = createValidJob()

        jest
          .spyOn(repository, 'updateJob')
          .mockResolvedValue({ jobId: result.jobId })

        const newId = result.jobId

        MOCK_JOB.title = MOCK_UPDATED_TITLE
        await service.update(newId, MOCK_JOB, MOCK_CASTING_ID)

        expect(repository.updateJob).toBeCalledWith(newId, MOCK_JOB)
      })

      it('should be bad request due to user not being the job owner', async () => {
        const MOCK_INVALID_USER_ID = 2394082
        const MOCK_JOB = createValidJob()

        jest
          .spyOn(repository, 'updateJob')
          .mockResolvedValue({ jobId: result.jobId })

        const newId = result.jobId

        MOCK_JOB.title = MOCK_UPDATED_TITLE

        await expect(
          service.update(newId, MOCK_JOB, MOCK_INVALID_USER_ID),
        ).rejects.toThrow(ForbiddenException)

        expect(repository.updateJob).not.toBeCalled()
      })

      it('should be bad request due to endDate being earlier in the same day', async () => {
        const MOCK_JOB = createValidJob()
        MOCK_JOB.shooting[0].endDate = new Date(MOCK_JOB.shooting[0].startDate)
        MOCK_JOB.shooting[0].endDate.setHours(
          MOCK_JOB.shooting[0].endDate.getHours() - 1,
        )

        jest
          .spyOn(repository, 'updateJob')
          .mockResolvedValue({ jobId: result.jobId })

        const newId = result.jobId

        MOCK_JOB.title = MOCK_UPDATED_TITLE

        await expect(
          service.update(newId, MOCK_JOB, MOCK_CASTING_ID),
        ).rejects.toThrow(BadRequestException)

        expect(repository.updateJob).not.toBeCalled()
      })

      it('should be bad request due to endDate being earlier than startDate', async () => {
        const MOCK_JOB = createValidJob()
        MOCK_JOB.shooting[0].endDate = new Date(MOCK_JOB.shooting[0].startDate)
        MOCK_JOB.shooting[0].endDate.setDate(
          MOCK_JOB.shooting[0].endDate.getDate() - 1,
        )

        jest
          .spyOn(repository, 'updateJob')
          .mockResolvedValue({ jobId: result.jobId })

        const newId = result.jobId

        MOCK_JOB.title = MOCK_UPDATED_TITLE

        await expect(
          service.update(newId, MOCK_JOB, MOCK_CASTING_ID),
        ).rejects.toThrow(BadRequestException)

        expect(repository.updateJob).not.toBeCalled()
      })

      it('should be bad request due to minAge being higher than maxAge', async () => {
        const MOCK_JOB = createValidJob()
        MOCK_JOB.minAge = 100
        MOCK_JOB.maxAge = 10

        jest
          .spyOn(repository, 'updateJob')
          .mockResolvedValue({ jobId: result.jobId })

        const newId = result.jobId

        MOCK_JOB.title = MOCK_UPDATED_TITLE

        await expect(
          service.update(newId, MOCK_JOB, MOCK_CASTING_ID),
        ).rejects.toThrow(BadRequestException)

        expect(repository.updateJob).not.toBeCalled()
      })

      it('should be bad request due to startDate being before applicationDeadline', async () => {
        const MOCK_JOB = createValidJob()
        MOCK_JOB.shooting[0].startDate = new Date(MOCK_JOB.applicationDeadline)
        MOCK_JOB.shooting[0].startDate.setDate(
          MOCK_JOB.shooting[0].startDate.getDate() - 1,
        )

        jest
          .spyOn(repository, 'updateJob')
          .mockResolvedValue({ jobId: result.jobId })

        const newId = result.jobId

        MOCK_JOB.title = MOCK_UPDATED_TITLE

        await expect(
          service.update(newId, MOCK_JOB, MOCK_CASTING_ID),
        ).rejects.toThrow(BadRequestException)

        expect(repository.updateJob).not.toBeCalled()
      })
      it('should be bad request due to applicationDeadline being before current time', async () => {
        const MOCK_JOB = createValidJob()
        MOCK_JOB.applicationDeadline = new Date()
        MOCK_JOB.applicationDeadline.setDate(
          MOCK_JOB.applicationDeadline.getDate() - 1,
        )

        jest
          .spyOn(repository, 'updateJob')
          .mockResolvedValue({ jobId: result.jobId })

        const newId = result.jobId

        MOCK_JOB.title = MOCK_UPDATED_TITLE

        await expect(
          service.update(newId, MOCK_JOB, MOCK_CASTING_ID),
        ).rejects.toThrow(BadRequestException)

        expect(repository.updateJob).not.toBeCalled()
      })

      it('should be not found due to giving an ID which should not exist', async () => {
        const MOCK_JOB = createValidJob()

        jest
          .spyOn(repository, 'updateJob')
          .mockResolvedValue({ jobId: result.jobId })

        const newId = 98094832

        jest.spyOn(repository, 'getBaseJobById').mockResolvedValue(null)

        MOCK_JOB.title = MOCK_UPDATED_TITLE

        await expect(
          service.update(newId, MOCK_JOB, MOCK_CASTING_ID),
        ).rejects.toThrow(NotFoundException)

        expect(repository.updateJob).not.toBeCalled()
      })

      it('should be bad request due to endDate being earlier than startDate on the same day', async () => {
        const MOCK_JOB = createValidJob()
        MOCK_JOB.shooting[0].endDate = new Date(MOCK_JOB.shooting[0].startDate)
        MOCK_JOB.shooting[0].endDate.setMinutes(
          MOCK_JOB.shooting[0].endDate.getMinutes() - 1,
        )

        jest
          .spyOn(repository, 'updateJob')
          .mockResolvedValue({ jobId: result.jobId })

        const newId = result.jobId

        MOCK_JOB.title = MOCK_UPDATED_TITLE

        await expect(
          service.update(newId, MOCK_JOB, MOCK_CASTING_ID),
        ).rejects.toThrow(BadRequestException)

        expect(repository.updateJob).not.toBeCalled()
      })
    })
  })

  describe('get job summary by id', () => {
    const MOCK_JOB_SUMMARY = {
      status: JobStatus.OPEN,
      pendingActorCount: 1,
      castingId: 1,
      isPaid: true,
    }
    const MOCK_JOB_ID = 1
    const MOCK_USER_ID = 1

    it('should return job summary', async () => {
      jest
        .spyOn(repository, 'getJobSummaryById')
        .mockResolvedValue(MOCK_JOB_SUMMARY)

      const result = await service.getJobSummaryById(MOCK_JOB_ID, MOCK_USER_ID)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { castingId, ...rest } = MOCK_JOB_SUMMARY
      expect(result).toEqual(rest)
    })

    it('should throw not found exception', async () => {
      jest.spyOn(repository, 'getJobSummaryById').mockResolvedValue(null)

      await expect(
        service.getJobSummaryById(MOCK_JOB_ID, MOCK_USER_ID),
      ).rejects.toThrow(NotFoundException)
    })

    it('should throw forbidden exception', async () => {
      jest
        .spyOn(repository, 'getJobSummaryById')
        .mockResolvedValue({ ...MOCK_JOB_SUMMARY, castingId: 2 })

      await expect(
        service.getJobSummaryById(MOCK_JOB_ID, MOCK_USER_ID),
      ).rejects.toThrow(ForbiddenException)
    })
  })
})
