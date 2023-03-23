import { SendNotificationDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class NotificationRepository {
  constructor(private prisma: PrismaService) {}
  async createNotification(notificationData: SendNotificationDto) {
    const { userId, type, ...rest } = notificationData
    return await this.prisma.notification.create({
      data: {
        userId,
        type,
        ...rest,
      },
    })
  }
}
