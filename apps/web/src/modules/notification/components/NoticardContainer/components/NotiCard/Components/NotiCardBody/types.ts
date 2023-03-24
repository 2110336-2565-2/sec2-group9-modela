import { NotificationType, UserType } from '@modela/dtos'

export interface BodyProps {
  userType?: UserType
  type: NotificationType
  reason?: string
  url: string
  firstName?: string
  middleName?: string
  lastName?: string
  jobTitle?: string
}
