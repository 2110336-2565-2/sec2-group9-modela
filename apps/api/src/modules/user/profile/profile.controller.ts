import { EditActorProfileDto, UserType } from '@modela/dtos'
import { Body, Controller, Put } from '@nestjs/common'
import { UseTypeAuthGuard } from 'src/modules/auth/misc/jwt.decorator'
import { User } from 'src/modules/auth/misc/user.decorator'

import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put('/actor')
  @UseTypeAuthGuard(UserType.ACTOR)
  updateActorProfile(
    @Body() editProfileDto: EditActorProfileDto,
    @User() user,
  ) {
    return this.profileService.updateActor(+user.id, editProfileDto)
  }
}
