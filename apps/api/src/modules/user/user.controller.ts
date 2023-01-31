import { GetUserDto, JwtDto } from '@modela/dtos'
import { Controller, Get } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { UseAuthGuard } from '../auth/jwt.decorator'
import { User } from '../auth/user.decorator'
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
