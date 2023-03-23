import { SendNotificationDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'

import { NotificationRepository } from './notification.repository'

@Injectable()
export class NotificationService {
  constructor(private repository: NotificationRepository) {}

  async createNotification(data: SendNotificationDto) {
    return await this.repository.createNotification(data)
  }
}
