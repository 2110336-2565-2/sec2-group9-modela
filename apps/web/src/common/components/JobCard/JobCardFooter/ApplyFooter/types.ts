import { JobStatus } from '@modela/dtos'

export interface ApplyFooterProps {
  jobId: number
  isApplied?: boolean
  status: JobStatus
}
