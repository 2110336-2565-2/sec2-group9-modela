import { Dispatch, SetStateAction } from 'react'

import { IFilter } from '../../pages/types'

export interface FilterContainerProps {
  state: IFilter
  setState: Dispatch<SetStateAction<IFilter>>
  isFilterShow: boolean
  closeFilterPage: () => void
  filterData: (state: IFilter) => Promise<void>
}
