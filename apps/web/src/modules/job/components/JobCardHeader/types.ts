import { JobStatus } from '@modela/dtos'

export interface HeaderProps {
  title: string
  companyName: string
  castingImage: string
  status: JobStatus
  jobId: number
}
