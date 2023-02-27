import { PostReportDto } from '@modela/dtos'
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

  async postReport(id: number, postReportDto: PostReportDto, userId: number) {
    const job = await this.jobRepository.getBaseJobById(id)
    if (!job) {
      throw new NotFoundException()
    }

    try {
      await this.reportRepository.createReport(id, userId, postReportDto.reason)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }

  async getReports(id: number) {
    const job = await this.jobRepository.getBaseJobById(id)
    if (!job) {
      throw new NotFoundException()
    }

    const reports = await this.reportRepository.getReports(job.jobId)
    const formattedReports = this.formatReports(reports)
    return {
      reports: formattedReports,
      jobTitle: job.title,
      jobId: job.jobId,
    }
  }

  public formatReports(reports: any) {
    const formattedReports = reports.reports.map((report) => {
      const newReports = {
        ...report,
        reporterName: `${report.User.firstName} ${report.User.lastName}`,
      }
      delete newReports.User
      return newReports
    })
    return formattedReports
  }

  async acceptReport(id: number) {
    const job = await this.jobRepository.getBaseJobById(id)
    if (!job) {
      throw new NotFoundException()
    }

    try {
      return await this.reportRepository.cancelJob(id)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }

  async rejectReport(id: number) {
    const job = await this.jobRepository.getBaseJobById(id)
    if (!job) {
      throw new NotFoundException()
    }

    try {
      return await this.reportRepository.rejectReportForJob(id)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }
}
