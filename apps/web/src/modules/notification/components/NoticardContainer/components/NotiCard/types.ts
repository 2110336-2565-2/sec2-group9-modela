import { NotificationType, UserType } from '@modela/dtos'

export interface NotiCardProps {
  type: NotificationType
  reason?: string
  actor?: {
    actorId?: number
    firstName?: string
    middleName?: string
    lastName?: string
  }
  job?: {
    jobId?: number
    title?: string
    companyName?: string
  }
  createdAt: Date
}

export interface NotiCardPropsWithUserType extends NotiCardProps {
  userType?: UserType
}
