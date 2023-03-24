import { UserType } from '@modela/database'

import { NotiCardProps } from './components/NotiCard/types'

export interface NotiCardContainerProps {
  maxPage: number
  noti: NotiCardProps[]
  userType?: UserType
}
