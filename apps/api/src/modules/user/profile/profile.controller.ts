import {
  EditActorProfileDto,
  EditCastingProfileDto,
  JwtDto,
  UserType,
} from '@modela/dtos'
import { Body, Controller, Put } from '@nestjs/common'
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { UseTypeAuthGuard } from 'src/modules/auth/misc/jwt.decorator'
import { User } from 'src/modules/auth/misc/user.decorator'

import { ProfileService } from './profile.service'

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put('/actor')
  @UseTypeAuthGuard(UserType.ACTOR)
  @ApiOperation({ summary: `edit actor's profile` })
  @ApiOkResponse()
  @ApiForbiddenResponse({ description: 'User is not an actor' })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  editActorProfile(
    @Body() editProfileDto: EditActorProfileDto,
    @User() user: JwtDto,
  ) {
    return this.profileService.editActor(+user.userId, editProfileDto)
  }

  @Put('/casting')
  @UseTypeAuthGuard(UserType.CASTING)
  @ApiOperation({ summary: `edit casting's profile` })
  @ApiOkResponse()
  @ApiForbiddenResponse({ description: 'User is not an casting' })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  editCastingProfile(
    @Body() editProfileDto: EditCastingProfileDto,
    @User() user: JwtDto,
  ) {
    return this.profileService.editCasting(+user.userId, editProfileDto)
  }
}
