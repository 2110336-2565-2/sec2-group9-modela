import { NotificationType, UserType } from '@modela/dtos'

export interface NotiCardProps {
  type: NotificationType
  reason?: string
  isRead: boolean
  url: string
  actor?: {
    actorId: number
    firstName: string
    middleName: string
    lastName: string
  }
  job?: {
    jobId: number
    jobTitle: string
    companyName?: string
  }
  timestamp: Date
}

export interface NotiCardPropsWithUserType extends NotiCardProps {
  userType?: UserType
}
