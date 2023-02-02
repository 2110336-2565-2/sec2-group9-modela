import {
  EditJobDto,
  GetJobCardWithMaxPageDto,
  SearchJobDto,
} from '@modela/dtos'
import { Injectable, NotFoundException } from '@nestjs/common'

import { JobRepository } from './job.repository'

@Injectable()
export class JobService {
  constructor(private repository: JobRepository) {}

  create(createJobDto: EditJobDto) {
    return 'This action adds a new job'
  }

  convertRequestToParams(searchJobDto: SearchJobDto) {
    const params = {
      //take and skip from limit and page
      take: Number(searchJobDto.limit),
      skip: (searchJobDto.page - 1) * searchJobDto.limit,
      //filtering
      //TODO: filtering in the task [24] drafted
      where: {
        //TODO: will find out how to filter range later [24]
        // startDate: searchJobDto.startDate || undefined,
        // startTime: searchJobDto.startTime || undefined,
        // endDate: searchJobDto.endDate || undefined,
        // endTime: searchJobDto.endTime || undefined,

        //TODO: will find out how to filter const into range later [24]
        // age: searchJobDto.age || undefined,

        //TODO: will find out how to filter range later [24]
        // minWage: searchJobDto.minWage || undefined,
        // maxWage: searchJobDto.maxWage || undefined,

        //TODO: will find out how to filter enum later [24]
        //status: searchJobDto.status || undefined,
        //gender: searchJobDto.gender || undefined,

        //TODO: Draft for filtering castingId task [19]
        castingId: Number(searchJobDto.castingId) || undefined,
      },
    }
    return params
  }
  async findAll(searchJobDto: SearchJobDto) {
    //set Default value for limit and page
    searchJobDto.limit = searchJobDto.limit || 20
    searchJobDto.page = searchJobDto.page || 1

    //set params for getJob
    const params = this.convertRequestToParams(searchJobDto)

    //get jobs with params from repository
    const jobsJoinCasting = await this.repository.getJobJoined(params)
    const result = new GetJobCardWithMaxPageDto()
    result.jobs = jobsJoinCasting

    //calculate maxPage
    //TODO: will calculate maxPage with filter later [19][24]
    const allJobsCount = await this.repository.getJobCount({})
    result.maxPage = Math.ceil(allJobsCount / searchJobDto.limit)

    //return jobs
    return result
  }

  async findOne(id: number) {
    const job = await this.repository.getJobById(id)

    if (!job) throw new NotFoundException()
    return job
  }

  update(id: number, updateJobDto: EditJobDto) {
    return `This action updates a #${id} job`
  }

  remove(id: number) {
    return `This action removes a #${id} job`
  }
}
