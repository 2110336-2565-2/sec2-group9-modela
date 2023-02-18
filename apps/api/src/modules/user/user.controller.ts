import {
  GetUserDto,
  JwtDto,
  UpdateUserVerificationDto,
  UserType,
} from '@modela/dtos'
import { Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { UseTypeAuthGuard } from '../auth/misc/jwt.decorator'
import { User } from '../auth/misc/user.decorator'
import { UserService } from './user.service'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'fetch for user data' })
  @ApiOkResponse({ type: GetUserDto })
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
  updateExample(
    @Param('id') id: number,
    @Query() updateUserVerificationDto: UpdateUserVerificationDto,
  ) {
    return this.userService.updateUserVerification(
      +id,
      updateUserVerificationDto,
    )
  }
}
