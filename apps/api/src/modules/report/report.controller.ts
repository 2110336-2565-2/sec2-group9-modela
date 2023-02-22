import { JobIdDto, JwtDto, UserType } from '@modela/dtos'
import { PostReportDto } from '@modela/dtos'
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
}
