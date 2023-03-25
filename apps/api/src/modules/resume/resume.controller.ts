import { UserType } from '@modela/database'
import {
  GetResumeDto,
  GetResumesDto,
  JwtDto,
  PostResumeDto,
  ResumeIdDto,
} from '@modela/dtos'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
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
  @ApiOperation({ summary: 'adds resume to user profile' })
  createResume(@Body() postResumeDto: PostResumeDto, @User() user: JwtDto) {
    return this.resumeService.createResume(postResumeDto, user)
  }

  @Put(':resumeId')
  @UseAuthGuard(UserType.ACTOR)
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({
    description: 'User is not an actor or is not the owner of resume',
  })
  @ApiNotFoundResponse({ description: 'Resume not found' })
  @ApiOperation({ summary: 'updates resume from user profile' })
  updateResume(
    @Param('resumeId') resumeId: number,
    @Body() postResumeDto: PostResumeDto,
    @User() user: JwtDto,
  ) {
    return this.resumeService.updateResume(+resumeId, postResumeDto, user)
  }

  @Get()
  @UseAuthGuard(UserType.ACTOR)
  @ApiOkResponse({ type: GetResumesDto })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not an actor' })
  @ApiOperation({ summary: 'gets all resumes from user profile' })
  getResumes(@User() user: JwtDto) {
    return this.resumeService.getResumesByUser(user)
  }

  @Get(':resumeId')
  @UseAuthGuard(UserType.ACTOR, UserType.CASTING)
  @ApiOkResponse({ type: GetResumeDto })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not an actor' })
  @ApiNotFoundResponse({ description: 'Resume not found' })
  @ApiOperation({ summary: 'gets resume from user profile' })
  getResume(@Param('resumeId') resumeId: number, @User() user: JwtDto) {
    return this.resumeService.getResumeById(+resumeId, user)
  }

  @Delete(':resumeId')
  @HttpCode(204)
  @UseAuthGuard(UserType.ACTOR)
  @ApiNoContentResponse({ description: 'Delete resume complete.' })
  @ApiOperation({ summary: 'delete resume by id' })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not an resume owner' })
  @ApiNotFoundResponse({ description: 'Resume not found' })
  deleteResume(@Param('resumeId') resumeId: number, @User() user: JwtDto) {
    return this.resumeService.deleteResume(+resumeId, user)
  }
}
