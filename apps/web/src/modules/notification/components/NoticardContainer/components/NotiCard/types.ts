import { NotificationType, UserType } from '@modela/dtos'

export interface NotiCardProps {
  type: NotificationType
  jobTitle?: string
  companyName?: string
  reason?: string
  isRead: boolean
  url: string
  actor?: {
    actorId: number
    firstName: string
    middleName: string
    lastName: string
  }
  timestamp: Date
}

export interface NotiCardPropsWithUserType extends NotiCardProps {
  userType?: UserType
}
