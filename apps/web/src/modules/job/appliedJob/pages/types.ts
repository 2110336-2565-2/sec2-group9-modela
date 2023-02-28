import { ApplicationStatus, JobStatus } from '@modela/database'

export interface IFilter {
  title: string | null

  pendingCheck: boolean
  offerCheck: boolean
  rejectCheck: boolean
  offerAcceptCheck: boolean
  offerRejectCheck: boolean

  openCheck: boolean
  selectCheck: boolean
  selectEndCheck: boolean
  finishCheck: boolean
  cancelCheck: boolean
}
export interface ISearch {
  title: string | null
  status: string[]
  applicationStatus: string[]
}
export const initialIFilter: IFilter = {
  title: null,
  pendingCheck: true,
  offerCheck: false,
  rejectCheck: false,
  offerAcceptCheck: false,
  offerRejectCheck: false,

  openCheck: true,
  selectCheck: true,
  selectEndCheck: true,
  finishCheck: false,
  cancelCheck: false,
}
export const initialISearch: ISearch = {
  title: null,
  applicationStatus: [ApplicationStatus.PENDING],
  status: [JobStatus.OPEN, JobStatus.SELECTING, JobStatus.SELECTION_ENDED],
}
