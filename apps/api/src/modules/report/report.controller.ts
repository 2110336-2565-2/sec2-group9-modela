import { GetReportsDto, JobIdDto, JwtDto, UserType } from '@modela/dtos'
import { PostReportDto } from '@modela/dtos'
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
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

@ApiTags('reports')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('jobs/:id')
  @ApiCreatedResponse({ type: JobIdDto })
  @UseAuthGuard(UserType.ACTOR)
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is not actor' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiOperation({ summary: 'write report' })
  postReport(
    @Param('id') id: string,
    @Body() postReportDto: PostReportDto,
    @User() user: JwtDto,
  ) {
    return this.reportService.postReport(+id, postReportDto, user.userId)
  }

  @Get('jobs/:id')
  @UseAuthGuard(UserType.ADMIN)
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is not admin' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiOperation({ summary: 'get reports' })
  @ApiOkResponse({ type: GetReportsDto })
  getReports(@Param('id') id: string) {
    return this.reportService.getReports(+id)
  }

  @Put('jobs/:id/accept')
  @UseAuthGuard(UserType.ADMIN)
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is not admin' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiOperation({ summary: 'accept report and remove the job' })
  @ApiOkResponse({ type: JobIdDto })
  acceptReport(@Param('id') id: string) {
    return this.reportService.acceptReport(+id)
  }

  @Put('jobs/:id/reject')
  @UseAuthGuard(UserType.ADMIN)
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is not admin' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiOperation({ summary: 'reject all reports for a job' })
  @ApiOkResponse({ type: JobIdDto })
  rejectReport(@Param('id') id: string) {
    return this.reportService.rejectReport(+id)
  }
}
