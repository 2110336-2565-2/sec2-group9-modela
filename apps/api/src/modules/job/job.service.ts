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
    const params = {
      //take and skip from limit and page
      take: Number(searchJobDto.limit),
      skip: (searchJobDto.page - 1) * searchJobDto.limit,
      //filtering
      //TODO: filtering in the task [24] drafted
      where: {
        //TODO: will find out how to filter joined and range later [24]
        // startDate: searchJobDto.startDate || undefined,
        // startTime: searchJobDto.startTime || undefined,
        // endDate: searchJobDto.endDate || undefined,
        // endTime: searchJobDto.endTime || undefined,

        //TODO: will find out how to filter joined later [24]
        // location: searchJobDto.location || undefined,

        minAge: {
          lte: searchJobDto.age || 0, //0 is default value for minAge when age is undefined
        },
        maxAge: {
          gte: searchJobDto.age || 200, //200 is default value for maxAge when age is undefined
        },

        wage: {
          gte: searchJobDto.minWage || 0, //0 is default value for minWage when minWage is undefined
          lte: searchJobDto.maxWage || 1e9, //1000000000 is default value for maxWage when maxWage is undefined
        },

        status: {
          in: searchJobDto.status,
        },
        gender: {
          in: searchJobDto.gender,
        },
        castingId: Number(searchJobDto.castingId) || undefined,
      },
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
    //TODO: will calculate maxPage with filter later [24]
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
