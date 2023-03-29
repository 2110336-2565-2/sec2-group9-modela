import { UserType } from '@modela/dtos'
import { Dispatch, SetStateAction } from 'react'

import { INotiFilter } from '../../pages/types'

export interface FilterContainerProps {
  state: INotiFilter
  setState: Dispatch<SetStateAction<INotiFilter>>
  isFilterShow: boolean
  closeFilterPage: () => void
  filterData: (state: INotiFilter) => Promise<void>
  userType?: UserType
}
