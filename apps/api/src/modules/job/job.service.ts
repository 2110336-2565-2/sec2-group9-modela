import { JobStatus } from '@modela/database'
import {
  CreateJobDto,
  EditJobDto,
  Gender,
  GetJobCardWithMaxPageDto,
  JwtDto,
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
    // for each shooting, if the start time is greater than the end time, throw error
    for (let i = 0; i < createJobDto.shooting.length; i++) {
      if (
        createJobDto.shooting[i].startTime > createJobDto.shooting[i].endTime &&
        createJobDto.shooting[i].startDate === createJobDto.shooting[i].endDate
      ) {
        throw new BadRequestException(
          'startTime is greater than endTime in the same day',
        )
      }
      if (
        createJobDto.shooting[i].startDate > createJobDto.shooting[i].endDate
      ) {
        throw new BadRequestException('startDate is greater than endDate')
      }
      if (
        createJobDto.shooting[i].startDate < createJobDto.applicationDeadline
      ) {
        throw new BadRequestException(
          'startDate is less than applicationDeadline',
        )
      }
    }
    // actorCount is less than 1
    if (createJobDto.actorCount < 1) {
      throw new BadRequestException('actorCount is less than 1')
    }
    // minAge is less than 1
    if (createJobDto.minAge < 1) {
      throw new BadRequestException('minAge is less than 1')
    }
    // wage is less than 0
    if (createJobDto.wage < 0) {
      throw new BadRequestException('wage is less than 0')
    }
    const applicationDeadline = new Date(createJobDto.applicationDeadline)
    const now = new Date()
    if (applicationDeadline < now) {
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

  // @function create prisma params from request
  // @helper for findAll function
  convertRequestToParams(searchJobDto: SearchJobDto, user: JwtDto) {
    //const define default value for undefined params
    //declare here for easy to change
    const defaultStartDate = new Date('0001-01-01T00:00:00Z')
    const defaultEndDate = new Date('9999-12-31T23:59:59Z')
    const defaultStartTime = new Date('1970-01-01T00:00:00Z')
    const defaultEndTime = new Date('1970-01-01T23:59:59Z')

    const minInt32 = -2147483647 //min int32
    const maxInt32 = 2147483647 //max int32
    const defaultminAgeLte = maxInt32
    const defaultMaxAgeGte = minInt32
    const defaultMinWageGte = minInt32
    const defaultMaxWageLte = maxInt32

    const params = {
      //take and skip from limit and page
      take: Number(searchJobDto.limit),
      skip: (searchJobDto.page - 1) * searchJobDto.limit,
      //filtering
      where: {
        //job always have shooting
        Shooting: undefined,

        title: undefined,
        minAge: {
          lte: Number(searchJobDto.age) || defaultminAgeLte,
        },
        maxAge: {
          gte: Number(searchJobDto.age) || defaultMaxAgeGte,
        },

        wage: {
          gte: Number(searchJobDto.minWage) || defaultMinWageGte,
          lte: Number(searchJobDto.maxWage) || defaultMaxWageLte,
        },

        status: undefined,
        gender: undefined,
        castingId: Number(searchJobDto.castingId) || undefined,
      },
    }
    //handle array and undefined
    searchJobDto.status = searchJobDto.status || [SearchJobStatus.OPEN]
    //check searchJobDto.status is array or not
    if (!Array.isArray(searchJobDto.status)) {
      searchJobDto.status = [searchJobDto.status]
    }

    //handle status qyery
    const statusQuery = []
    //make OPEN for default
    searchJobDto.status = searchJobDto.status || [SearchJobStatus.OPEN]
    if (searchJobDto.status.includes(SearchJobStatus.OPEN)) {
      statusQuery.push(JobStatus.OPEN)
    }
    if (searchJobDto.status.includes(SearchJobStatus.CLOSE)) {
      statusQuery.push(
        JobStatus.SELECTING,
        JobStatus.SELECTION_ENDED,
        JobStatus.FINISHED,
      )
      if (user.type != UserType.ACTOR) {
        statusQuery.push(JobStatus.CANCELLED)
      }
    }
    params.where.status = {
      in: statusQuery,
    }

    //handle gender qyery
    if (searchJobDto.gender) {
      //check searchJobDto.gender is array or not (the case that only one params it will not be array)
      if (!Array.isArray(searchJobDto.gender)) {
        searchJobDto.gender = [searchJobDto.gender]
      }
      //if Query only Gender.ANY return all
      if (
        !(
          searchJobDto.gender &&
          searchJobDto.gender.length === 1 &&
          searchJobDto.gender[0] === Gender.ANY
        )
      ) {
        params.where.gender = {
          in: [...searchJobDto.gender, Gender.ANY],
        }
      }
    }
    //handle shooting query
    if (
      searchJobDto.location ||
      searchJobDto.startDate ||
      searchJobDto.endDate ||
      searchJobDto.startTime ||
      searchJobDto.endTime
    ) {
      //ignore millisecond (Timezone offset is considered as millisecond)
      //assume that user will not search with millisecond and in database we don't have timezone

      let queryStartTime = defaultStartTime
      if (searchJobDto.startTime) {
        queryStartTime = new Date(searchJobDto.startTime)
        queryStartTime.setMilliseconds(0)
      }
      let queryEndTime = defaultEndTime
      if (searchJobDto.endTime) {
        queryEndTime = new Date(searchJobDto.endTime)
        queryEndTime.setMilliseconds(0)
      }

      params.where.Shooting = {
        every: {
          startDate: {
            gte: searchJobDto.startDate || defaultStartDate,
          },
          endDate: {
            lte: searchJobDto.endDate || defaultEndDate,
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
            contains: searchJobDto.location,
            mode: 'insensitive',
          },
        },
      }
    }
    //handle title substring query
    if (searchJobDto.title) {
      params.where.title = {
        contains: searchJobDto.title,
        mode: 'insensitive',
      }
    }
    return params
  }
  async findAll(searchJobDto: SearchJobDto, user: JwtDto) {
    //set Default value for limit and page
    searchJobDto.limit = searchJobDto.limit || 20
    searchJobDto.page = searchJobDto.page || 1

    //check if castingId is not equal to user.userId
    if (user.type == UserType.CASTING) {
      if (searchJobDto.castingId == undefined)
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

  async findOne(id: number, user: JwtDto) {
    const job = await this.repository.getJobById(id)

    if (!job) throw new NotFoundException()

    const { castingId, ...jobDetail } = job
    if (user.type == UserType.CASTING && user.userId != castingId)
      throw new ForbiddenException()

    return jobDetail
  }

  async update(id: number, updateJobDto: EditJobDto, userId: number) {
    const job = await this.repository.getJobById(id)
    if (!job) throw new NotFoundException('Job not found')
    if (job.castingId !== userId) {
      throw new ForbiddenException(
        "You don't have permission to update this job",
      )
    }

    this.validateJobDto(updateJobDto)
    return this.repository.updateJob(id, updateJobDto)
  }

  remove(id: number) {
    return `This action removes a #${id} job`
  }
}
