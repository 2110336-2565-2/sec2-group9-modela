import { Injectable } from '@nestjs/common'

import { EditJobDto, GetJobCardWithMaxPageDto, SearchJobDto } from './job.dto'
import { JobRepository } from './job.repository'

@Injectable()
export class JobService {
  constructor(private repository: JobRepository) {}

  create(createJobDto: EditJobDto) {
    return 'This action adds a new job'
  }

  convertRequestToParams(searchJobDto: SearchJobDto) {
    const params = {
      take: Number(searchJobDto.limit),
      skip: (searchJobDto.page - 1) * searchJobDto.limit,
    }
    return params
  }
  async findAll(searchJobDto: SearchJobDto) {
    //set Default value for limit and page
    searchJobDto.limit = searchJobDto.limit || 20
    searchJobDto.page = searchJobDto.page || 1

    //check searchJobDTO received
    if (
      searchJobDto.limit &&
      searchJobDto.page &&
      Object.keys(searchJobDto).length === 2
    ) {
      //assume limit and page is always received
      //empty params return get all jobs without filter
      const limit = searchJobDto.limit
      const page = searchJobDto.page

      //set params for getJob
      const params = this.convertRequestToParams(searchJobDto)

      //get jobs with params from repository
      const jobsJoinCasting = await this.repository.getJobJoined(params)
      const result = new GetJobCardWithMaxPageDto()
      result.jobs = jobsJoinCasting

      //calculate maxPage
      const allJobsCount = await this.repository.getJobCount()
      result.maxPage = Math.ceil(allJobsCount / limit)

      //return jobs
      return result
    } else {
      //TODO filtering in the task [24]
      console.log('TODO filtering in next task : ', searchJobDto)
      return 'This action returns all job with filter'
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} job`
  }

  update(id: number, updateJobDto: EditJobDto) {
    return `This action updates a #${id} job`
  }

  remove(id: number) {
    return `This action removes a #${id} job`
  }
}
