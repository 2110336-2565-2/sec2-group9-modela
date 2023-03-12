import { Gender, JobStatus } from '@modela/dtos'

export interface FooterProps {
  gender: Gender
  actorCount: number
  wage: number
  dueDate: Date
  status: JobStatus
  isApplied?: boolean
  jobId?: number
  isApplied?: boolean
}
