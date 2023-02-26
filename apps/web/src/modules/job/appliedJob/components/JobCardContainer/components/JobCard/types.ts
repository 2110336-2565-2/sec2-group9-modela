import { ApplicationStatus, Gender, JobStatus } from '@modela/dtos'

export interface JobCardProps {
  actorCount: number
  description: string
  applicationDeadline: Date
  gender: Gender
  wage: number
  jobId: number
  status: JobStatus
  ApplicationStatus: ApplicationStatus
  companyName: string
  jobCastingImageUrl: string
  castingId: number
  castingName: string
  title: string
}
