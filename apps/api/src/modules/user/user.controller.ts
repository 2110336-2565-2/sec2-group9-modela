import { Controller, Get } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { JwtDto } from '../auth/auth.dto'
import { UseAuthGuard } from '../auth/jwt.decorator'
import { User } from '../auth/user.decorator'
import { GetUserDto } from './user.dto'
import { UserService } from './user.service'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseAuthGuard()
  @ApiOperation({ summary: 'fetch for user data' })
  @ApiOkResponse({ type: GetUserDto })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  getUserData(@User() user: JwtDto) {
    return this.userService.getUserData(user.userId)
  }
}
