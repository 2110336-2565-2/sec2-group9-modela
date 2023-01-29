import { Body, Controller, Param, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { JobIdDTO } from '../job/job.dto'
import { PostReportDTO } from './report.dto'
import { ReportService } from './report.service'

@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post(':id')
  @ApiCreatedResponse({ type: JobIdDTO })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is not actor' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiOperation({ summary: 'write report' })
  postReport(@Param('id') id: number, @Body() postReportDTO: PostReportDTO) {
    return 'this will post report'
  }
}
