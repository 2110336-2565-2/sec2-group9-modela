import { NotificationType, Prisma, UserType } from '@modela/database'
import { NotificationDto, SendNotificationDto } from '@modela/dtos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

import {
  ActorNotificationSchema,
  CastingNotificationSchema,
  IFindNotification,
} from './constants'

@Injectable()
export class NotificationRepository {
  constructor(private prisma: PrismaService) {}
  async createNotification(notificationData: SendNotificationDto) {
    return await this.prisma.notification.create({
      data: notificationData,
    })
  }

  async getNotificationBySchema(
    notificationId: number,
    schema: Prisma.NotificationSelect,
  ): Promise<Partial<NotificationDto>> {
    const notification = (await this.prisma.notification.findFirst({
      where: {
        notificationId,
      },
      select: schema,
    })) as IFindNotification

    const formattedNotification = {
      actor: {
        actorId: notification.Actor?.actorId,
        ...notification.Actor?.User,
      },
      job: {
        jobId: notification.Job?.jobId,
        title: notification.Job?.title,
        ...notification.Job?.Casting,
      },
      ...notification.Refund,
    }

    if (!notification.Actor) {
      delete formattedNotification.actor
    }

    if (!notification.Job) {
      delete formattedNotification.job
    }

    return formattedNotification
  }

  async markAsRead(notificationsId: number[]) {
    await this.prisma.notification.updateMany({
      where: {
        notificationId: {
          in: notificationsId,
        },
      },
      data: {
        isRead: true,
      },
    })
  }

  async getNotifications(
    userId: number,
    userType: UserType,
    type: NotificationType[],
    offset: number,
    limit: number,
  ): Promise<NotificationDto[]> {
    const notifications = await this.prisma.notification.findMany({
      skip: offset,
      take: limit,
      where: {
        userId,
        type: { in: type },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        type: true,
        notificationId: true,
        createdAt: true,
        isRead: true,
      },
    })

    const schema =
      userType === UserType.ACTOR
        ? ActorNotificationSchema
        : CastingNotificationSchema

    const notificationsId = notifications.map(
      ({ notificationId }) => notificationId,
    )

    await this.markAsRead(notificationsId)

    return await Promise.all(
      notifications.map(async ({ notificationId, type, ...rest }) => ({
        ...(await this.getNotificationBySchema(notificationId, schema[type])),
        ...rest,
        type,
      })),
    )
  }

  async getNotificationCount(userId: number, type: NotificationType[]) {
    return await this.prisma.notification.count({
      where: {
        userId,
        type: { in: type },
      },
    })
  }
}
