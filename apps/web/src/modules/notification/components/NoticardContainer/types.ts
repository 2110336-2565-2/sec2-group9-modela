import { UserType } from '@modela/dtos'

import { NotiCardProps } from './components/NotiCard/types'

export interface NotiCardContainerProps {
  maxPage?: number
  notifications?: NotiCardProps[]
  userType?: UserType
}
