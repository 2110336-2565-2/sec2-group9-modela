import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ReportRepository } from 'dist/src/modules/report/report.repository'

import { PostReportDTO } from './report.dto'
import { ReportPostData } from './report.type'

@Injectable()
export class ReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async postReport(id: number, postReportDTO: PostReportDTO, userId: number) {
    const reportPostData = new ReportPostData(id, userId, postReportDTO.reason)
    // TODO: Raise a 404 error if the job is not found

    try {
      await this.reportRepository.createCasting(reportPostData)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }
}
