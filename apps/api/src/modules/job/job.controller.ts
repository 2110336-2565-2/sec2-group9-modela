import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
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

import {
  EditJobDto,
  GetJobCardDto,
  GetJobCardWithMaxPageDto,
  GetJobDto,
  JobIdDTO,
  SearchJobDto,
} from './job.dto'
import { JobService } from './job.service'

@ApiTags('job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  @ApiOperation({ summary: 'get all jobs with filter' })
  @ApiOkResponse({ type: GetJobCardWithMaxPageDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  findAll(@Query() searchJobDto: SearchJobDto) {
    return this.jobService.findAll(searchJobDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'get job by id' })
  @ApiOkResponse({ type: GetJobDto })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiForbiddenResponse({ description: 'User is casting that not the owner' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id)
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
