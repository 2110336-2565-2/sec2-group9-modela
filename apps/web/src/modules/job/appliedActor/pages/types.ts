import { ApplicationStatus } from '@modela/database'

export interface ActorQuery {
  name: string
  [ApplicationStatus.PENDING]: boolean
  [ApplicationStatus.REJECTED]: boolean
  [ApplicationStatus.OFFER_SENT]: boolean
  [ApplicationStatus.OFFER_ACCEPTED]: boolean
  [ApplicationStatus.OFFER_REJECTED]: boolean
}
