import { JobStatus } from '@modela/dtos'

export interface FooterProps {
  gender: string
  actorCount: number
  wage: number
  dueDate: Date
  status: JobStatus
}
