import {
  EditActorProfileDto,
  EditCastingProfileDto,
  GetProfileForEditingDto,
  GetProfileForViewingDto,
  JwtDto,
  UserType,
} from '@modela/dtos'
import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { UseAuthGuard } from 'src/modules/auth/misc/jwt.decorator'
import { User } from 'src/modules/auth/misc/user.decorator'

import { ProfileService } from './profile.service'

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put('/actor')
  @UseAuthGuard(UserType.ACTOR)
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
  @UseAuthGuard(UserType.CASTING)
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

  @Get()
  @UseAuthGuard(UserType.CASTING, UserType.ACTOR)
  @ApiOperation({
    summary: `get user's profile (only editable field for initial data in editing page)`,
  })
  @ApiOkResponse({ type: GetProfileForEditingDto })
  @ApiForbiddenResponse({ description: 'User is not an casting or actor' })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  getProfile(@User() user: JwtDto) {
    return this.profileService.getProfileForEditing(+user.userId, user.type)
  }

  @Get(':id')
  @UseAuthGuard()
  @ApiOperation({
    summary: `get user's profile`,
  })
  @ApiOkResponse({ type: GetProfileForViewingDto })
  @ApiForbiddenResponse({
    description:
      'User is not owner or try to seeing another same user type profile',
  })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiNotFoundResponse({ description: 'User not found' })
  getProfileById(@Param('id') id: number, @User() user: JwtDto) {
    return this.profileService.getProfileById(+id, user)
  }
}
