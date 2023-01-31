import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { PostReportDTO } from './report.dto'
import { ReportRepository } from './report.repository'
import { ReportPostData } from './report.type'

@Injectable()
export class ReportService {
  constructor(private reportRepository: ReportRepository) {}

  async postReport(id: number, postReportDTO: PostReportDTO, userId: number) {
    const reportPostData = new ReportPostData(id, userId, postReportDTO.reason)
    // TODO: Raise a 404 error if the job is not found

    try {
      await this.reportRepository.createReport(reportPostData)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }
}
