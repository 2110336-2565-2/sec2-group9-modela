import { Prisma, UserType } from '@modela/database'
import { SendNotificationDto } from '@modela/dtos'
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
  ) {
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

  async getNotifications(userId: number, userType: UserType) {
    const notifications = await this.prisma.notification.findMany({
      where: {
        userId,
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

    return await Promise.all(
      notifications.map(async ({ notificationId, type, ...rest }) => ({
        ...(await this.getNotificationBySchema(notificationId, schema[type])),
        ...rest,
        type,
      })),
    )
  }
}
