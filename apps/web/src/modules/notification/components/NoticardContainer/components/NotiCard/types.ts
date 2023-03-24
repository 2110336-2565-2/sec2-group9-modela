import { NotificationType } from '@modela/dtos'

export interface NotiCardProps {
  type: NotificationType
  jobTitle?: string
  companyName?: string
  reason?: string
  isRead: boolean
  url: string
  actor: {
    firstName: string
    middleName: string
    lastName: string
  }
  timestamp: Date
}
