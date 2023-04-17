import { JobStatus } from '@modela/dtos'

export interface EditHeaderProps {
  jobId: number
  status: JobStatus
  isPaid?: boolean
}
