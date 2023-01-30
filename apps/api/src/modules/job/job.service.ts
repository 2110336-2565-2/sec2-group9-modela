import { Injectable } from '@nestjs/common'

import { EditJobDto, SearchJobDTO } from './job.dto'
import { JobRepository } from './job.repository'

@Injectable()
export class JobService {
  constructor(private repository: JobRepository) {}

  create(createJobDto: EditJobDto) {
    return 'This action adds a new job'
  }

  async findAll(searchJobDTO: SearchJobDTO) {
    //check searchJobDTO is received
    if (Object.keys(searchJobDTO).length === 0) {
      //empty params return get all jobs without filter
      const jobs = await this.repository.getJob({})
      return jobs
    } else {
      //have params return get all jobs with filter
      console.log('TODO filtering in next task : ', searchJobDTO)
      //const jobs = await this.repository.getJob({})
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
