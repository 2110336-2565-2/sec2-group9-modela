import { NotificationType } from '@modela/dtos'

export interface HeaderProps {
  type: NotificationType
  jobTitle?: string
  companyName?: string
  timestamp: Date
}
