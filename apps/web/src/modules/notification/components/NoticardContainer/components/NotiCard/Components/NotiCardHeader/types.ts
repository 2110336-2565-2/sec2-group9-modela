import { NotificationType, UserType } from '@modela/dtos'

export interface HeaderProps {
  type: NotificationType
  jobTitle?: string
  companyName?: string
  timestamp: Date
  userType?: UserType
}
