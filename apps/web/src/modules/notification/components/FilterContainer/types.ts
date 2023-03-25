import { UserType } from '@modela/dtos'
import { INotiFilter } from 'modules/notification/pages/types'
import { Dispatch, SetStateAction } from 'react'

export interface FilterContainerProps {
  state: INotiFilter
  setState: Dispatch<SetStateAction<INotiFilter>>
  filterData: (state: INotiFilter) => Promise<void>
  userType?: UserType
}
