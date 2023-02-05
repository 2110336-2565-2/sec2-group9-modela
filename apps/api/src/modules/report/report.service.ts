import { PostReportDTO } from '@modela/dtos'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common/exceptions'

import { JobRepository } from '../job/job.repository'
import { ReportRepository } from './report.repository'
import { ReportPostData } from './report.type'

@Injectable()
export class ReportService {
  constructor(
    private reportRepository: ReportRepository,
    private readonly jobRepository: JobRepository,
  ) {}

  async postReport(id: number, postReportDTO: PostReportDTO, userId: number) {
    const reportPostData = new ReportPostData(id, userId, postReportDTO.reason)
    const job = await this.jobRepository.getJobById(id)
    if (!job) {
      throw new NotFoundException()
    }

    try {
      await this.reportRepository.createReport(reportPostData)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }
}
