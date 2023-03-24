import { NotificationType } from '@modela/database'
import { SendNotificationDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class NotificationRepository {
  constructor(private prisma: PrismaService) {}
  async createNotification(notificationData: SendNotificationDto) {
    return await this.prisma.notification.create({
      data: notificationData,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getNotificationByType(notificationId: number, type: NotificationType) {
    return await this.prisma.notification.findFirst({
      where: {
        notificationId,
      },
      select: {
        type: true,
        notificationId: true,
      },
    })
  }

  async getNotifications(userId: number) {
    const notifications = await this.prisma.notification.findMany({
      where: {
        userId,
      },
      select: {
        type: true,
        notificationId: true,
      },
    })

    return await Promise.all(
      notifications.map(
        async (notification) =>
          await this.getNotificationByType(
            notification.notificationId,
            notification.type,
          ),
      ),
    )
  }
}
