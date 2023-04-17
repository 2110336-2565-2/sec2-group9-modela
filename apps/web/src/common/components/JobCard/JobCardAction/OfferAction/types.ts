import { ApplicationStatus, JobStatus } from '@modela/dtos'

export interface OfferActionProps {
  appliedStatus?: ApplicationStatus
  title: string
  jobId: number
  status: JobStatus
}
