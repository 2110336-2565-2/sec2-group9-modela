import { JobIdDTO, JwtDto } from '@modela/dtos'
import { PostReportDTO } from '@modela/dtos'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { UseAuthGuard } from '../auth/misc/jwt.decorator'
import { User } from '../auth/misc/user.decorator'
import { ReportService } from './report.service'

@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('job/:id')
  @UseAuthGuard()
  @ApiCreatedResponse({ type: JobIdDTO })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is not actor' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiOperation({ summary: 'write report' })
  postReport(
    @Param('id') id: number,
    @Body() postReportDTO: PostReportDTO,
    @User() user: JwtDto,
  ) {
    return this.reportService.postReport(id, postReportDTO, user.userId)
  }
}
