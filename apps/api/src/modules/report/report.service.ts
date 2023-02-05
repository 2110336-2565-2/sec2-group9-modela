import { User } from '@modela/database'
import { JwtDto, PostReportDTO } from '@modela/dtos'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common/exceptions'
import { NotFoundError } from 'rxjs'

import { JobService } from '../job/job.service'
import { ReportRepository } from './report.repository'
import { ReportPostData } from './report.type'

@Injectable()
export class ReportService {
  constructor(
    private reportRepository: ReportRepository,
    private readonly jobService: JobService,
  ) {}

  async postReport(id: number, postReportDTO: PostReportDTO, user: JwtDto) {
    const userId = user.userId
    const reportPostData = new ReportPostData(id, userId, postReportDTO.reason)
    try {
      const job = await this.jobService.findOne(id, user)
    } catch (e) {
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
