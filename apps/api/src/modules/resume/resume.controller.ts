import { UserType } from '@modela/database'
import { JwtDto, PostResumeDto } from '@modela/dtos'
import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { UseAuthGuard } from '../auth/misc/jwt.decorator'
import { User } from '../auth/misc/user.decorator'
import { ResumeService } from './resume.service'

@ApiTags('resumes')
@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  @UseAuthGuard(UserType.ACTOR)
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not an actor' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  @ApiOperation({ summary: 'adds resume to user profile' })
  createJob(@Body() postResumeDto: PostResumeDto, @User() user: JwtDto) {
    return this.resumeService.createResume(postResumeDto, user)
  }
}
