import { JobStatus } from '@modela/database'
import {
  EditJobDto,
  Gender,
  GetJobCardWithMaxPageDto,
  JwtDto,
  SearchJobDto,
  SearchJobStatus,
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
    const defaultStartDate = new Date('0001-01-01T00:00:00Z')
    const defaultEndDate = new Date('9999-12-31T23:59:59Z')
    const defaultStartTime = new Date('1970-01-01T00:00:00Z')
    const defaultEndTime = new Date('1970-01-01T23:59:59Z')

    const defaultminAgeLte = 999
    const defaultMaxAgeGte = 0
    const defaultMinWageGte = 0
    const defaultMaxWageLte = 999999999

    const params = {
      //take and skip from limit and page
      take: Number(searchJobDto.limit),
      skip: (searchJobDto.page - 1) * searchJobDto.limit,
      //filtering
      where: {
        // Shooting: {
        //   every: {
        //     startDate: {
        //       gte: searchJobDto.startDate || defaultStartDate,
        //     },
        //     endDate: {
        //       lte: searchJobDto.endDate || defaultEndDate,
        //     },
        //     startTime: {
        //       gte: searchJobDto.startTime || defaultStartTime,
        //     },
        //     endTime: {
        //       lte: searchJobDto.endTime || defaultEndTime,
        //     },
        //   },
        //   some: {},
        // },

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
    if (searchJobDto.status) {
      //check searchJobDto.status is array or not
      //let statusQuery = {}

      // if (!Array.isArray(searchJobDto.status)) {
      //   searchJobDto.status = [searchJobDto.status];
      // }
      // //check if searchJobDto.status have 'CLOSE' value
      // if (searchJobDto.status.includes(SearchJobStatus.CLOSE)) {
      // }
      params.where.status = {
        in: searchJobDto.status,
      }
    }
    console.log('test gender input: ', searchJobDto.gender)
    if (searchJobDto.gender) {
      //check searchJobDto.gender is array or not
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
    //handle location undefined
    // if (searchJobDto.location) {
    //   params.where.Shooting.some = {
    //     shootingLocation: searchJobDto.location,
    //   }
    // }

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
