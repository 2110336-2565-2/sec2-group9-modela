import {
  GetJobCardDto,
  GetUserDto,
  JwtDto,
  PendingUserDto,
  UpdateUserStatusDto,
  UserType,
} from '@modela/dtos'
import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { UseAuthGuard, UseUnverifyGuard } from '../auth/misc/jwt.decorator'
import { User } from '../auth/misc/user.decorator'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseUnverifyGuard()
  @ApiOperation({ summary: 'fetch for user data' })
  @ApiOkResponse({
    type: GetUserDto,
  })
  @ApiUnauthorizedResponse({ description: 'User is not login' })
  @ApiBadRequestResponse({ description: 'Wrong format' })
  getUserData(@User() user: JwtDto) {
    return this.userService.getUserData(user.userId)
  }

  @Get('pending')
  @UseAuthGuard(UserType.ADMIN)
  @ApiOperation({ summary: 'get all user pending for admin' })
  @ApiOkResponse({ type: PendingUserDto, isArray: true })
  getPendingUser() {
    return this.userService.getPendingUsers()
  }

  @Put(':id/verification')
  @UseAuthGuard(UserType.ADMIN)
  @ApiOperation({ summary: 'accept or reject user with id' })
  @ApiOkResponse({ type: PendingUserDto })
  @ApiNotFoundResponse({ description: 'user not found' })
  updateUserStatus(
    @Param('id') id: string,
    @Body() updateUserStatusDto: UpdateUserStatusDto,
  ) {
    return this.userService.updateUserStatus(+id, updateUserStatusDto)
  }

  @Get(':id/history')
  @UseAuthGuard()
  @ApiOperation({ summary: 'get work history for casting and actor' })
  @ApiOkResponse({ type: GetJobCardDto })
  @ApiNotFoundResponse({ description: 'user not found' })
  getUsersWorkHistory(@Param('id') ParamId: number, @User() user: JwtDto) {
    return this.userService.getUsersWorkHistory(
      +ParamId,
      user.userId,
      user.type,
    )
  }
}
