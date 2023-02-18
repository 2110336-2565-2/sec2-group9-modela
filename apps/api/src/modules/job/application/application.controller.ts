import { UserType } from '@modela/database'
import { GetAppliedActorDto } from '@modela/dtos'
import { Controller, Get, Param } from '@nestjs/common'
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { UseTypeAuthGuard } from 'src/modules/auth/misc/jwt.decorator'

import { ApplicationService } from './application.service'

@Controller('jobs')
@ApiTags('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get(':id/actors')
  @UseTypeAuthGuard(UserType.CASTING)
  @ApiOperation({ summary: 'get all actors that applied in jobs with jobid' })
  @ApiOkResponse({ type: GetAppliedActorDto })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  findOne(@Param('id') id: string) {
    return this.applicationService.findByJobId(+id)
  }
}
