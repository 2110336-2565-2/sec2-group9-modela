import { ApplicationStatus } from '@modela/dtos'
import { Dispatch, SetStateAction } from 'react'

export interface FooterProps {
  jobId?: number
  jobTitle?: string
  appStatus?: ApplicationStatus
  openAcceptModal: () => void
  openRejectModal: () => void
  setFocusId: Dispatch<SetStateAction<number>>
  setTitle: Dispatch<SetStateAction<string>>
}
