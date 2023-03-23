import { SendNotificationDto } from '@modela/dtos'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UseAuthGuard } from '../auth/misc/jwt.decorator'
import { NotificationService } from './notification.service'

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Post('test')
  @UseAuthGuard()
  async createNotification(@Body() body: SendNotificationDto) {
    return this.notificationService.createNotification(body)
  }
}
