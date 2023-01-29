import { Injectable } from '@nestjs/common'

import { EditJobDto } from './job.dto'

@Injectable()
export class JobService {
  create(createJobDto: EditJobDto) {
    return 'This action adds a new job'
  }

  findAll() {
    return `This action returns all job`
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
