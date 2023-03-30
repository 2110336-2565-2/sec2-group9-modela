import { UserType } from '@modela/dtos'
import { Dispatch, SetStateAction } from 'react'

import { NotiCardProps } from './components/NotiCard/types'

export interface NotiCardContainerProps {
  maxPage?: number
  notifications?: NotiCardProps[]
  userType?: UserType
  openAcceptModal: () => void
  openRejectModal: () => void
  setFocusId: Dispatch<SetStateAction<number>>
  setTitle: Dispatch<SetStateAction<string>>
}
