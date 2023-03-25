import { NotificationType, UserType } from '@modela/dtos'

export interface HeaderProps {
  type: NotificationType
  title?: string
  companyName?: string
  timestamp: Date
  userType?: UserType
  firstName?: string
  middleName?: string
  lastName?: string
}
