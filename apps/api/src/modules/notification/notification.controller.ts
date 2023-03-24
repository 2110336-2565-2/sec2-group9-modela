import { SendNotificationDto, UserType } from '@modela/dtos'
import { Body, Controller, Get, Post } from '@nestjs/common'
import {
  ApiForbiddenResponse,
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
  @ApiOperation({ summary: 'get notifications' })
  async getNotifications(@User() user) {
    return await this.notificationService.getNotifications(user.id)
  }
}
