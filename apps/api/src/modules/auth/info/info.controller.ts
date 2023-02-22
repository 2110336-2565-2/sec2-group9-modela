import { UserType } from '@modela/database'
import { ActorInfoDto, ActorInfoWithFileDto, JwtDto } from '@modela/dtos'
import { Body, Controller, Get, Put } from '@nestjs/common'
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Express } from 'express'
import { CheckedFile, UseFileUpload } from 'src/modules/file/file.decorator'

import { UseUnverifyGuard } from '../misc/jwt.decorator'
import { User } from '../misc/user.decorator'
import { InfoService } from './info.service'

@Controller('info')
@ApiTags('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get('actor')
  @UseUnverifyGuard(UserType.ACTOR)
  @ApiOkResponse({ type: ActorInfoDto })
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not an actor' })
  @ApiOperation({ summary: 'get actor signup info' })
  getActorInfo(@User() user: JwtDto) {
    return this.infoService.getActorInfo(user)
  }

  @Put('actor')
  @UseUnverifyGuard(UserType.ACTOR)
  @UseFileUpload()
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is not an actor' })
  @ApiOperation({ summary: 'edit actor signup info' })
  updateActorInfo(
    @Body() body: ActorInfoWithFileDto,
    @CheckedFile({ fileIsRequired: false }) file: Express.Multer.File,
    @User() user: JwtDto,
  ) {
    delete body.file
    return this.infoService.editActorInfo(body, file, user)
  }
}
