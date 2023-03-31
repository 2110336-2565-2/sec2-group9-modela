import { ApplicationStatus, Gender, JobStatus } from '@modela/dtos'
import { Dispatch, SetStateAction } from 'react'

export interface FooterProps {
  gender: Gender
  actorCount: number
  wage: number
  dueDate: Date
  status: JobStatus
  jobId?: number
  jobTitle?: string
  isApplied?: boolean
  appliedStatus?: ApplicationStatus
  openAcceptModal?: () => void
  openRejectModal?: () => void
  setFocusId?: Dispatch<SetStateAction<number>>
  setTitle?: Dispatch<SetStateAction<string>>
  openModal?: () => void
}
