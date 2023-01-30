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
    const params = {}
    if (searchJobDto.limit) {
      params['take'] = Number(searchJobDto.limit)
    }
    if (searchJobDto.page) {
      params['skip'] = (searchJobDto.page - 1) * searchJobDto.limit
    }
    return params
  }
  async findAll(searchJobDto: SearchJobDto) {
    //check searchJobDTO received
    if (Object.keys(searchJobDto).length === 2) {
      //assume limit and page is always received
      //empty params return get all jobs without filter
      const limit = searchJobDto.limit
      const page = searchJobDto.page

      //set params for getJob
      const params = this.convertRequestToParams(searchJobDto)

      //get jobs with params from repository
      const jobs = await this.repository.getJob(params)
      const jobsJoinCasting = await this.repository.getJobJoinCasting(params)
      const result = new GetJobCardWithMaxPageDto()
      result.jobs = jobsJoinCasting

      //calculate maxPage
      const allJobs = await this.repository.getJob({})
      result.maxPage = Math.ceil(allJobs.length / limit)

      //return jobs
      return result
    } else {
      //TODO filtering in next task [24]
      //have params return get all jobs with filter
      const limit = searchJobDto.limit
      const page = searchJobDto.page

      //set params for getJob
      const params = { take: Number(limit) }
      if (page > 1) {
        params['skip'] = (page - 1) * limit
      }

      //get jobs with params from repository with filter
      //const jobs = await this.repository.getJob(params)
      //const result = new GetJobCardWithMaxPageDto();
      //result.jobs = jobs

      //calculate maxPage
      //const allJobs = await this.repository.getJob({})
      //result.maxPage = Math.ceil(allJobs.length / limit)

      console.log('TODO filtering in next task : ', searchJobDto)
      //const jobs = await this.repository.getJob({params})
      //return jobs
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
