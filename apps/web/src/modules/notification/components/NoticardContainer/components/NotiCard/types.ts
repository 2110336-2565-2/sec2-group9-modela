import { ApplicationStatus, NotificationType, UserType } from '@modela/dtos'
import { Dispatch, SetStateAction } from 'react'

export interface NotiCardProps {
  type: NotificationType
  reason?: string
  notificationId: number
  actor?: {
    actorId?: number
    firstName?: string
    middleName?: string
    lastName?: string
  }
  job?: {
    jobId?: number
    title?: string
    status?: ApplicationStatus
    companyName?: string
  }
  createdAt: Date
  isRead: boolean
}

export interface NotiCardPropsWithUserType extends NotiCardProps {
  userType?: UserType
  openAcceptModal: () => void
  openRejectModal: () => void
  setFocusId: Dispatch<SetStateAction<number>>
  setTitle: Dispatch<SetStateAction<string>>
}
