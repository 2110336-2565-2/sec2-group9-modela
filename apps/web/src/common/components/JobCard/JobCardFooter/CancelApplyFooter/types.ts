import { ApplicationStatus, JobStatus } from '@modela/dtos'

export interface CancelApplyFooterProps {
  jobId: number
  status: JobStatus
  appliedStatus?: ApplicationStatus
}
