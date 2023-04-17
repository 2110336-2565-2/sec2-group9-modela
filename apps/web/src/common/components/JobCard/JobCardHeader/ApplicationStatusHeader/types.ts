import { ApplicationStatus, JobStatus } from '@modela/dtos'

export interface ApplicationStatusHeaderProps {
  appliedStatus?: ApplicationStatus
  status: JobStatus
  isPaid?: boolean
}
