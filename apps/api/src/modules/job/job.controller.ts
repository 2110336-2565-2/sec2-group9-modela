import {
  CreateJobDto,
  EditJobDto,
  EditJobStatusDto,
  GetAppliedJobDto,
  GetJobCardByAdminWithMaxPageDto,
  GetJobCardWithMaxPageDto,
  GetJobDto,
  JobIdDto,
  JobSummaryDto,
  JwtDto,
  SearchAppliedJobDto,
  SearchJobByAdminDto,
  SearchJobDto,
  UserType,
} from '@modela/dtos'
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
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
import { JobService } from './job.service'

@ApiTags('jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  @UseAuthGuard(UserType.CASTING, UserType.ACTOR)
  @ApiOperation({ summary: 'get all jobs with filter' })
  @ApiOkResponse({ type: GetJobCardWithMaxPageDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is casting and not the owner' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  findAll(@Query() searchJobDto: SearchJobDto, @User() user: JwtDto) {
    return this.jobService.findAll(searchJobDto, user)
  }

  @Get('admin')
  @UseAuthGuard(UserType.ADMIN)
  @ApiOperation({ summary: 'get all jobs with filter by admin' })
  @ApiOkResponse({ type: GetJobCardByAdminWithMaxPageDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is not admin' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  findAllByAdmin(
    @Query() searchJobByAdminDto: SearchJobByAdminDto,
    @User() user: JwtDto,
  ) {
    return this.jobService.findAllByAdmin(searchJobByAdminDto, user)
  }

  @Get('applied')
  @UseAuthGuard(UserType.ACTOR)
  @ApiOperation({ summary: 'get all jobs that actor applied' })
  @ApiOkResponse({ type: GetAppliedJobDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is not actor' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  findAllApplied(
    @Query() searchAppliedJobDto: SearchAppliedJobDto,
    @User() user: JwtDto,
  ) {
    return this.jobService.findAllApplied(searchAppliedJobDto, user)
  }

  @Get(':id')
  @UseAuthGuard()
  @ApiOperation({ summary: 'get job by id' })
  @ApiOkResponse({ type: GetJobDto })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is casting that not the owner' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  findOne(@Param('id') id: string, @User() user: JwtDto) {
    return this.jobService.findOne(+id, user)
  }

  @Put(':id')
  @ApiOperation({ summary: 'update job by id' })
  @ApiCreatedResponse({ type: JobIdDto })
  @UseAuthGuard(UserType.CASTING)
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is not owner' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  update(
    @Param('id') id: string,
    @Body() updateJobDto: EditJobDto,
    @User() user: JwtDto,
  ) {
    return this.jobService.update(+id, updateJobDto, user.userId)
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'update status of job by id' })
  @ApiCreatedResponse({ type: JobIdDto })
  @UseAuthGuard(UserType.CASTING)
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is not owner' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateJobStatusDto: EditJobStatusDto,
    @User() user: JwtDto,
  ) {
    return this.jobService.updateStatus(
      +id,
      updateJobStatusDto.status,
      user.userId,
    )
  }

  @Post()
  @ApiCreatedResponse({ type: JobIdDto })
  @UseAuthGuard(UserType.CASTING)
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not a casting' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  @ApiOperation({ summary: 'create job' })
  createJob(@Body() createJobDto: CreateJobDto, @User() user: JwtDto) {
    return this.jobService.createJob(createJobDto, user.userId)
  }

  @Get('/:id/summary')
  @ApiOkResponse({ type: JobSummaryDto })
  @UseAuthGuard(UserType.CASTING)
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({
    description: 'User is not a casting or User is not the owner of the job',
  })
  @ApiOperation({ summary: 'get summary status of job by jobId' })
  getJobSummary(@Param('id') jobId: string, @User() user: JwtDto) {
    return this.jobService.getJobSummaryById(+jobId, user.userId)
  }
}
