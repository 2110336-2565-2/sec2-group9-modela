import { Gender, JobStatus } from '@modela/dtos'

export interface CardProps {
  title: string
  companyName: string
  description: string
  jobCastingImageUrl: string
  gender: Gender
  actorCount: number
  wage: number
  applicationDeadline: Date
  jobId: number
  status: JobStatus
}
