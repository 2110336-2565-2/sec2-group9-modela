import {
  EditJobDto,
  GetJobCardWithMaxPageDto,
  JwtDto,
  SearchJobDto,
  UserType,
} from '@modela/dtos'
import { Injectable, NotFoundException } from '@nestjs/common'
import { ForbiddenException } from '@nestjs/common/exceptions'

import { JobRepository } from './job.repository'

@Injectable()
export class JobService {
  constructor(private repository: JobRepository) {}

  create(createJobDto: EditJobDto) {
    return 'This action adds a new job'
  }

  // @function create prisma params from request
  // @helper for findAll function
  convertRequestToParams(searchJobDto: SearchJobDto) {
    //const define default value for undefined params
    //declare here for easy to change
    const defaultStartDate = '0001-01-01T00:00:00Z'
    const defaultEndDate = '9999-12-31T23:59:59Z'
    const defaultStartTime = '00:00:00'
    const defaultEndTime = '23:59:59'
    const defaultminAge = 0
    const defaultMaxAge = 999
    const defaultMinWage = 0
    const defaultMaxWage = 999999999

    const params = {
      //take and skip from limit and page
      take: Number(searchJobDto.limit),
      skip: (searchJobDto.page - 1) * searchJobDto.limit,
      //filtering
      where: {
        shooting: {
          startDate: {
            gte: searchJobDto.startDate || defaultStartDate,
          },
          endDate: {
            lte: searchJobDto.endDate || defaultEndDate,
          },
          startTime: {
            gte: searchJobDto.startTime || defaultStartTime,
          },
          endTime: {
            lte: searchJobDto.endTime || defaultEndTime,
          },
          some: {},
        },

        minAge: {
          lte: searchJobDto.age || defaultminAge,
        },
        maxAge: {
          gte: searchJobDto.age || defaultMaxAge,
        },

        wage: {
          gte: searchJobDto.minWage || defaultMinWage,
          lte: searchJobDto.maxWage || defaultMaxWage,
        },

        status: undefined,
        gender: undefined,
        castingId: Number(searchJobDto.castingId) || undefined,
      },
    }
    //handle array and undefined
    if (searchJobDto.status) {
      params.where.status = {
        in: searchJobDto.status,
      }
    }
    if (searchJobDto.gender) {
      params.where.gender = {
        in: searchJobDto.gender,
      }
    }
    //handle location undefined
    if (searchJobDto.location) {
      params.where.shooting.some = {
        shootingLocation: searchJobDto.location,
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
    const params = this.convertRequestToParams(searchJobDto)

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

  update(id: number, updateJobDto: EditJobDto) {
    return `This action updates a #${id} job`
  }

  remove(id: number) {
    return `This action removes a #${id} job`
  }
}
