import { PostReportDTO } from '@modela/dtos'
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { JobRepository } from '../job/job.repository'
import { ReportRepository } from './report.repository'

@Injectable()
export class ReportService {
  constructor(
    private reportRepository: ReportRepository,
    private readonly jobRepository: JobRepository,
  ) {}

  async postReport(id: number, postReportDTO: PostReportDTO, userId: number) {
    const job = await this.jobRepository.getJobById(id)
    if (!job) {
      throw new NotFoundException()
    }

    try {
      await this.reportRepository.createReport(id, userId, postReportDTO.reason)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }
}
