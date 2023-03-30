import { NotificationType, UserType } from '@modela/dtos'

export interface BodyProps {
  userType?: UserType
  type: NotificationType
  reason?: string
  firstName?: string
  middleName?: string
  lastName?: string
  title?: string
  jobId?: number
  actorId?: number
}
