import { NotificationType } from '@modela/database'

export class SendNotificationDto {
  userId: number
  type: NotificationType
  actorId?: number
  jobId?: number
  refundId?: number
}
