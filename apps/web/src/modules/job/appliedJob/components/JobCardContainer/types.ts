import { GetAppliedJobDto } from '@modela/dtos'
import { Dispatch, SetStateAction } from 'react'

export interface JobCardContainerProps {
  jobs: GetAppliedJobDto[]
  openAcceptModal?: () => void
  openRejectModal?: () => void
  setFocusId?: Dispatch<SetStateAction<number>>
  setTitle?: Dispatch<SetStateAction<string>>
}
