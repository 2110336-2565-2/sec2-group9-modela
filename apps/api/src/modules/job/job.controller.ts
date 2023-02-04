import {
  EditJobDto,
  GetJobCardWithMaxPageDto,
  GetJobDto,
  JobIdDTO,
  JwtDto,
  SearchJobDto,
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

@ApiTags('job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  @UseAuthGuard()
  @ApiOperation({ summary: 'get all jobs with filter' })
  @ApiOkResponse({ type: GetJobCardWithMaxPageDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  findAll(@Query() searchJobDto: SearchJobDto, @User() user: JwtDto) {
    return this.jobService.findAll(searchJobDto, user)
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

  @Post()
  @ApiOperation({ summary: 'write job' })
  @ApiCreatedResponse({ type: JobIdDTO })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is not casting' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  create(@Body() createJobDto: EditJobDto) {
    return this.jobService.create(createJobDto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'update job by id' })
  @ApiCreatedResponse({ type: JobIdDTO })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is not owner' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  update(@Param('id') id: string, @Body() updateJobDto: EditJobDto) {
    return this.jobService.update(+id, updateJobDto)
  }
}
