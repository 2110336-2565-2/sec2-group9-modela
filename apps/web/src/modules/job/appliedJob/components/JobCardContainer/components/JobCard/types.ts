import { GetAppliedJobDto } from '@modela/dtos'
import { Dispatch, SetStateAction } from 'react'

export interface GetAppliedJobDtoWithModalInfo extends GetAppliedJobDto {
  openAcceptModal?: () => void
  openRejectModal?: () => void
  setFocusId?: Dispatch<SetStateAction<number>>
  setTitle?: Dispatch<SetStateAction<string>>
}
