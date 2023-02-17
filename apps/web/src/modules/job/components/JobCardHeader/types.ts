import { JobStatus } from '@modela/dtos'

export interface HeaderProps {
  title: string
  companyName: string
  jobCastingImageUrl: string
  status: JobStatus
  jobId: number
  isDetail?: boolean
  castingId: number
  castingName: string
}
