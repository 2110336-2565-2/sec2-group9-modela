import { Gender, JobStatus } from '@modela/dtos'

export interface CardProps {
  title: string
  companyName: string
  description: string
  castingImage: string
  status: JobStatus
  gender: Gender
  actorCount: number
  wage: number
  applicationDeadline: Date
  jobId: number
}
export interface CardArray {
  job: CardProps[]
}
