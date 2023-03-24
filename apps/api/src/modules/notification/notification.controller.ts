import {
  GetNotificationDto,
  GetNotificationsQuery,
  JwtDto,
  NotificationDto,
  SendNotificationDto,
  UserType,
} from '@modela/dtos'
import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { UseAuthGuard } from '../auth/misc/jwt.decorator'
import { User } from '../auth/misc/user.decorator'
import { NotificationService } from './notification.service'

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Post('test')
  @UseAuthGuard()
  async createNotification(@Body() body: SendNotificationDto) {
    return await this.notificationService.createNotification(body)
  }

  @Get()
  @UseAuthGuard(UserType.ACTOR, UserType.CASTING)
  @ApiUnauthorizedResponse({ description: 'User is not logged in' })
  @ApiForbiddenResponse({ description: 'User is admin' })
  @ApiOkResponse({ type: NotificationDto, isArray: true })
  @ApiOperation({ summary: 'get notifications' })
  async getNotifications(
    @User() user: JwtDto,
    @Query() query: GetNotificationsQuery,
  ): Promise<GetNotificationDto> {
    return await this.notificationService.getNotifications(
      user.userId,
      user.type,
      query,
    )
  }
}
