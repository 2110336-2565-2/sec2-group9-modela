import { ApplicationStatus } from '@modela/database'

export interface OfferActionProps {
  appliedStatus?: ApplicationStatus
  title: string
  jobId: string
}
