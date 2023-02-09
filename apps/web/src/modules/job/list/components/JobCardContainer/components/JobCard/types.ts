import { Gender, JobStatus } from '@modela/dtos'

export interface CardProps {
  title: string
  companyName: string
  description: string
  castingImage: string
  gender: Gender
  actorCount: number
  wage: number
  dueDate: Date
  jobId: number
  status: JobStatus
}
