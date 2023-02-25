import { ApplicationStatus, JobStatus } from '@modela/database'
import {
  CreateJobDto,
  EditJobDto,
  Gender,
  GetJobCardByAdminWithMaxPageDto,
  GetJobCardWithMaxPageDto,
  JobSummaryDto,
  JwtDto,
  SearchAppliedJobDto,
  SearchJobByAdminDto,
  SearchJobByAdminStatus,
  SearchJobDto,
  SearchJobStatus,
  UserType,
} from '@modela/dtos'
import { Injectable, NotFoundException } from '@nestjs/common'
import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions'

import { JobRepository } from './job.repository'

@Injectable()
export class JobService {
  constructor(private repository: JobRepository) {}

  private validateJobDto(createJobDto: CreateJobDto) {
    // if minAge is greater than maxAge, throw error
    if (createJobDto.minAge > createJobDto.maxAge) {
      throw new BadRequestException('minAge is greater than maxAge')
    }

    const { applicationDeadline } = createJobDto
    // for each shooting, if the start time is greater than the end time, throw error
    for (let i = 0; i < createJobDto.shooting.length; i++) {
      const { startTime, endTime, startDate, endDate } =
        createJobDto.shooting[i]
      if (startTime > endTime) {
        throw new BadRequestException('startTime is greater than endTime')
      }
      if (startDate > endDate) {
        throw new BadRequestException('startDate is greater than endDate')
      }
      if (startDate < applicationDeadline) {
        throw new BadRequestException(
          'startDate is less than applicationDeadline',
        )
      }
    }
    const now = new Date()
    if (new Date(applicationDeadline) < now) {
      throw new BadRequestException('applicationDeadline is less than now')
    }
  }

  async createJob(createJobDto: CreateJobDto, userId: number) {
    this.validateJobDto(createJobDto)
    try {
      return await this.repository.createJob(createJobDto, userId)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }

  statusConverter(
    searchJobByAnyDto: SearchJobDto | SearchJobByAdminDto,
    user: JwtDto,
    endpoint: string,
  ) {
    const statusQuery = []

    //check searchJobByAnyDto is SearchJobByAdminDto or SearchJobDto
    if (endpoint === '/jobs/admin') {
      const searchJobByAdminDto = searchJobByAnyDto as SearchJobByAdminDto
      //make OPEN for default
      searchJobByAdminDto.status = searchJobByAdminDto.status || [
        SearchJobByAdminStatus.OPEN,
      ]
      if (!Array.isArray(searchJobByAdminDto.status)) {
        searchJobByAdminDto.status = [searchJobByAdminDto.status]
      }

      // Edge case: if only status is reported, return default JobStatus search (OPEN only)
      if (
        searchJobByAdminDto.status.length === 1 &&
        searchJobByAdminDto.status.includes(SearchJobByAdminStatus.REPORTED)
      ) {
        searchJobByAdminDto.status = [SearchJobByAdminStatus.OPEN]
      }

      if (searchJobByAdminDto.status.includes(SearchJobByAdminStatus.OPEN)) {
        statusQuery.push(JobStatus.OPEN)
      }
      if (searchJobByAdminDto.status.includes(SearchJobByAdminStatus.CLOSE)) {
        statusQuery.push(
          JobStatus.SELECTING,
          JobStatus.SELECTION_ENDED,
          JobStatus.FINISHED,
        )
      }
      if (
        searchJobByAdminDto.status.includes(SearchJobByAdminStatus.CANCELLED)
      ) {
        statusQuery.push(JobStatus.CANCELLED)
      }
    }
    if (endpoint === '/jobs') {
      const searchJobByUserDto = searchJobByAnyDto as SearchJobDto
      //make OPEN for default
      searchJobByUserDto.status = searchJobByUserDto.status || [
        SearchJobStatus.OPEN,
      ]
      if (!Array.isArray(searchJobByUserDto.status)) {
        searchJobByUserDto.status = [searchJobByUserDto.status]
      }

      if (searchJobByUserDto.status.includes(SearchJobStatus.OPEN)) {
        statusQuery.push(JobStatus.OPEN)
      }
      if (searchJobByUserDto.status.includes(SearchJobStatus.CLOSE)) {
        statusQuery.push(
          JobStatus.SELECTING,
          JobStatus.SELECTION_ENDED,
          JobStatus.FINISHED,
        )
        if (user.type === UserType.CASTING) {
          statusQuery.push(JobStatus.CANCELLED)
        }
      }
    }
    return statusQuery
  }

  // @function create prisma params from request
  // @helper for findAll function
  convertRequestToParams(
    searchJobByAnyDto: SearchJobDto | SearchJobByAdminDto,
    user: JwtDto,
  ) {
    //const define default value for undefined params
    //declare here for easy to change
    const defaultStartDate = new Date('0001-01-01T00:00:00Z')
    const defaultEndDate = new Date('9999-12-31T23:59:59Z')
    const defaultStartTime = new Date('1970-01-01T00:00:00Z')
    const defaultEndTime = new Date('1970-01-01T23:59:59Z')

    const maxInt32 = 2147483647 //max int32
    const defaultminAgeLte = maxInt32
    const defaultMaxAgeGte = 0
    const defaultMinWageGte = 0
    const defaultMaxWageLte = maxInt32

    const defaultLimit = 20
    const defaultPage = 1

    //set Default value for limit and page
    searchJobByAnyDto.limit = searchJobByAnyDto.limit || defaultLimit
    searchJobByAnyDto.page = searchJobByAnyDto.page || defaultPage

    const params = {
      //take and skip from limit and page
      take: Number(searchJobByAnyDto.limit),
      skip:
        (Number(searchJobByAnyDto.page) - 1) * Number(searchJobByAnyDto.limit),
      //filtering
      where: {
        //joined filter
        Shooting: undefined,
        Report: undefined,

        title: undefined,
        minAge: {
          lte: Number(searchJobByAnyDto.age) || defaultminAgeLte,
        },
        maxAge: {
          gte: Number(searchJobByAnyDto.age) || defaultMaxAgeGte,
        },

        wage: {
          gte: Number(searchJobByAnyDto.minWage) || defaultMinWageGte,
          lte: searchJobByAnyDto.maxWage
            ? Number(searchJobByAnyDto.maxWage)
            : defaultMaxWageLte,
        },

        status: undefined,
        gender: undefined,
        castingId: Number(searchJobByAnyDto.castingId) || undefined,
      },
    }
    //handle array and undefined
    searchJobByAnyDto.status = searchJobByAnyDto.status || [
      SearchJobStatus.OPEN,
    ]
    //check searchJobDto.status is array or not
    if (!Array.isArray(searchJobByAnyDto.status)) {
      searchJobByAnyDto.status = [searchJobByAnyDto.status]
    }

    if (user.type == UserType.ADMIN) {
      const searchJobByAdminDto = searchJobByAnyDto as SearchJobByAdminDto
      if (
        searchJobByAdminDto.status.includes(SearchJobByAdminStatus.REPORTED)
      ) {
        //filter only reported job
        params.where.Report = {
          some: {},
        }
      }
    }
    const statusQuery = this.statusConverter(
      searchJobByAnyDto,
      user,
      user.type == UserType.ADMIN ? '/jobs/admin' : '/jobs',
    )

    params.where.status = {
      in: statusQuery,
    }

    //handle gender qyery
    if (searchJobByAnyDto.gender) {
      //check searchJobDto.gender is array or not (the case that only one params it will not be array)
      if (!Array.isArray(searchJobByAnyDto.gender)) {
        searchJobByAnyDto.gender = [searchJobByAnyDto.gender]
      }
      //if Query only Gender.ANY return all
      if (
        !(
          searchJobByAnyDto.gender &&
          searchJobByAnyDto.gender.length === 1 &&
          searchJobByAnyDto.gender[0] === Gender.ANY
        )
      ) {
        params.where.gender = {
          in: [...searchJobByAnyDto.gender, Gender.ANY],
        }
      }
    }
    //handle shooting query
    if (
      searchJobByAnyDto.location ||
      searchJobByAnyDto.startDate ||
      searchJobByAnyDto.endDate ||
      searchJobByAnyDto.startTime ||
      searchJobByAnyDto.endTime
    ) {
      //ignore millisecond (Timezone offset is considered as millisecond)
      //assume that user will not search with millisecond and in database we don't have timezone

      let queryStartTime = defaultStartTime
      if (searchJobByAnyDto.startTime) {
        queryStartTime = new Date(searchJobByAnyDto.startTime)
        queryStartTime.setMilliseconds(0)
      }
      let queryEndTime = defaultEndTime
      if (searchJobByAnyDto.endTime) {
        queryEndTime = new Date(searchJobByAnyDto.endTime)
        queryEndTime.setMilliseconds(0)
      }

      params.where.Shooting = {
        every: {
          startDate: {
            gte: searchJobByAnyDto.startDate || defaultStartDate,
          },
          endDate: {
            lte: searchJobByAnyDto.endDate || defaultEndDate,
          },
          startTime: {
            gte: queryStartTime,
          },
          endTime: {
            lte: queryEndTime,
          },
        },
        some: {
          shootingLocation: {
            contains: searchJobByAnyDto.location,
            mode: 'insensitive',
          },
        },
      }
    }
    //handle title substring query
    if (searchJobByAnyDto.title) {
      params.where.title = {
        contains: searchJobByAnyDto.title,
        mode: 'insensitive',
      }
    }
    return params
  }

  async findAll(searchJobDto: SearchJobDto, user: JwtDto) {
    //check if castingId is not equal to user.userId
    if (user.type === UserType.CASTING) {
      if (searchJobDto.castingId === undefined)
        searchJobDto.castingId = user.userId
      if (searchJobDto.castingId != user.userId) throw new ForbiddenException()
    }

    //set params for getJob
    const params = this.convertRequestToParams(searchJobDto, user)

    //get jobs with params from repository
    const jobsJoinCasting = await this.repository.getJobJoined(params)
    const result = new GetJobCardWithMaxPageDto()
    result.jobs = jobsJoinCasting

    //calculate maxPage
    const allJobsCount = await this.repository.getJobCount({
      where: params.where,
    })
    result.maxPage = Math.ceil(allJobsCount / searchJobDto.limit)

    //return jobs
    return result
  }

  async findAllByAdmin(searchJobByAdminDto: SearchJobByAdminDto, user: JwtDto) {
    //set params for getJob
    const params = this.convertRequestToParams(searchJobByAdminDto, user)

    //get jobs with params from repository
    const jobsJoinCastingReport = await this.repository.getJobJoinedByAdmin(
      params,
    )
    const result = new GetJobCardByAdminWithMaxPageDto()
    result.jobs = jobsJoinCastingReport

    //calculate maxPage
    const allJobsCount = await this.repository.getJobCount({
      where: params.where,
    })
    result.maxPage = Math.ceil(allJobsCount / searchJobByAdminDto.limit)

    //return jobs
    return result
  }

  async findAllApplied(searchAppliedJobDto: SearchAppliedJobDto, user: JwtDto) {
    //assign and set default value
    let applicationStatus = searchAppliedJobDto.applicationStatus || [
      ApplicationStatus.PENDING,
    ]
    let statusQuery = searchAppliedJobDto.status || [
      JobStatus.OPEN,
      JobStatus.SELECTING,
      JobStatus.SELECTION_ENDED,
    ]
    if (!Array.isArray(applicationStatus))
      applicationStatus = [applicationStatus]
    if (!Array.isArray(statusQuery)) statusQuery = [statusQuery]
    return await this.repository.getJobApplied(
      statusQuery,
      applicationStatus,
      user.userId,
    )
  }
  async findOne(id: number, user: JwtDto) {
    const job = await this.repository.getJobById(id)

    if (!job) throw new NotFoundException()

    if (user.type === UserType.CASTING && user.userId !== job.castingId)
      throw new ForbiddenException()

    return job
  }

  async update(id: number, updateJobDto: EditJobDto, userId: number) {
    const job = await this.repository.getBaseJobById(id)
    if (!job) throw new NotFoundException('Job not found')
    if (job.castingId !== userId) {
      throw new ForbiddenException(
        "You don't have permission to update this job",
      )
    }
    if (job.status !== JobStatus.OPEN)
      throw new ForbiddenException("You can't update job that is not open.")
    this.validateJobDto(updateJobDto)
    return this.repository.updateJob(id, updateJobDto)
  }

  async updateStatus(id: number, updateJobStatus: JobStatus, userId: number) {
    const job = await this.repository.getBaseJobById(id)
    if (!job) throw new NotFoundException('Job not found')
    if (job.castingId !== userId) {
      throw new ForbiddenException(
        "You don't have permission to update status of this job",
      )
    }
    if (job.status === JobStatus.CANCELLED || job.status === JobStatus.FINISHED)
      throw new ForbiddenException(
        "You can't update status job that is cancelled or finished.",
      )
    return this.repository.updateJobStatus(id, updateJobStatus)
  }

  async getJobSummaryById(
    jobId: number,
    userId: number,
  ): Promise<JobSummaryDto> {
    const job = await this.repository.getJobSummaryById(jobId)
    if (!job) throw new NotFoundException()
    const { castingId, ...summary } = job
    if (castingId !== userId) throw new ForbiddenException()

    return summary
  }
}
