import { UserType } from '@modela/database'
import {
  GetAppliedActorDto,
  GetAppliedActorQuery,
  JwtDto,
  ResumeIdDto,
} from '@modela/dtos'
import { Controller, Get, Param } from '@nestjs/common'
import { Body, Post, Query } from '@nestjs/common/decorators'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { UseAuthGuard } from 'src/modules/auth/misc/jwt.decorator'
import { User } from 'src/modules/auth/misc/user.decorator'

import { ApplicationService } from './application.service'

@Controller('jobs')
@ApiTags('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get(':id/actors')
  @UseAuthGuard(UserType.CASTING)
  @ApiOperation({ summary: 'get all actors that applied in jobs with jobid' })
  @ApiOkResponse({ type: GetAppliedActorDto })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiForbiddenResponse({
    description: 'User is not Casting or User is not the owner of this job',
  })
  findByJobId(
    @Param('id') id: string,
    @User() user: JwtDto,
    @Query() query: GetAppliedActorQuery,
  ) {
    return this.applicationService.findByJobId(+id, user.userId, query)
  }

  @Post(':id/apply')
  @UseAuthGuard(UserType.ACTOR)
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiBadRequestResponse({ description: 'Resume not found' })
  @ApiForbiddenResponse({ description: 'User is not Actor' })
  @ApiConflictResponse({ description: 'User already apply to the job' })
  applyJob(
    @Param('id') id: string,
    @Body() body: ResumeIdDto,
    @User() user: JwtDto,
  ) {
    return this.applicationService.applyJob(+id, body.resumeId, user.userId)
  }
}
