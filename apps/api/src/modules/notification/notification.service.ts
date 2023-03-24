import {
  GetNotificationDto,
  GetNotificationsQuery,
  SendNotificationDto,
  UserType,
} from '@modela/dtos'
import { Injectable } from '@nestjs/common'

import { NotificationRepository } from './notification.repository'

@Injectable()
export class NotificationService {
  constructor(private repository: NotificationRepository) {}

  async createNotification(data: SendNotificationDto) {
    return await this.repository.createNotification(data)
  }

  async getNotifications(
    userId: number,
    userType: UserType,
    query: GetNotificationsQuery,
  ): Promise<GetNotificationDto> {
    const page = +query.page || 1
    const limit = +query.limit || 10
    const offset = (page - 1) * limit

    const notificationCount = await this.repository.getNotificationCount(
      userId,
      query.type,
    )

    const maxPage = Math.ceil(notificationCount / limit)
    const notifications = await this.repository.getNotifications(
      userId,
      userType,
      query.type,
      offset,
      limit,
    )
    return { maxPage, notifications }
  }
}
