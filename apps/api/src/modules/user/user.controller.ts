<<<<<<< beta
import { GetUserDto, JwtDto, UpdateUserStatusDto, UserType } from '@modela/dtos'
import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
=======
import { GetUserDto, JwtDto } from '@modela/dtos'
import { Controller, Get } from '@nestjs/common'
>>>>>>> feat: remove UseTypeAuthGuard and add UseUnverifyGuard
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

<<<<<<< beta
import { UseTypeAuthGuard } from '../auth/misc/jwt.decorator'
=======
import { UseUnverifyGuard } from '../auth/misc/jwt.decorator'
>>>>>>> feat: remove UseTypeAuthGuard and add UseUnverifyGuard
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
  @UseTypeAuthGuard(UserType.ADMIN)
  @ApiOperation({ summary: 'get all user pending for admin' })
  @ApiOkResponse({ type: GetUserDto, isArray: true })
  getPendingUser() {
    return this.userService.getPendingUsers()
  }

  @Put(':id/verification')
  @UseTypeAuthGuard(UserType.ADMIN)
  @ApiOperation({ summary: 'accept or reject user with id' })
  @ApiOkResponse({ type: GetUserDto })
  @ApiNotFoundResponse({ description: 'user not found' })
  updateUserStatus(
    @Param('id') id: string,
    @Body() updateUserStatusDto: UpdateUserStatusDto,
  ) {
    return this.userService.updateUserStatus(+id, updateUserStatusDto)
  }
}
