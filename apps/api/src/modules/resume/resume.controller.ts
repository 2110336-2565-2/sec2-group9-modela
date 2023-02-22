import { UserType } from '@modela/database'
import {
  GetResumeDto,
  GetResumesDto,
  JwtDto,
  PostResumeDto,
  ResumeIdDto,
} from '@modela/dtos'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
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
import { ResumeService } from './resume.service'

@ApiTags('resumes')
@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  @UseAuthGuard(UserType.ACTOR)
  @ApiCreatedResponse({ type: ResumeIdDto })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not an actor' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  @ApiOperation({ summary: 'adds resume to user profile' })
  createJob(@Body() postResumeDto: PostResumeDto, @User() user: JwtDto) {
    return this.resumeService.createResume(postResumeDto, user)
  }

  @Get()
  @UseAuthGuard(UserType.ACTOR)
  @ApiCreatedResponse({ type: GetResumesDto })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not an actor' })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  @ApiOperation({ summary: 'gets all resumes from user profile' })
  getResumes(@User() user: JwtDto) {
    return this.resumeService.getResumesByUser(user)
  }

  @Get(':resumeId')
  @UseAuthGuard(UserType.ACTOR, UserType.CASTING)
  @ApiCreatedResponse({ type: GetResumeDto })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not an actor' })
  @ApiNotFoundResponse({ description: 'Resume not found' })
  @ApiOperation({ summary: 'gets resume from user profile' })
  getResume(@Param('resumeId') resumeId: number, @User() user: JwtDto) {
    return this.resumeService.getResumeById(+resumeId, user)
  }
}
