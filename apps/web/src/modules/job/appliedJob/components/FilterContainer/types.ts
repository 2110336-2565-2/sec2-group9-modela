import { IFilter } from 'modules/job/appliedJob/pages/types'
import { Dispatch, SetStateAction } from 'react'

export interface FilterContainerProps {
  state: IFilter
  setState: Dispatch<SetStateAction<IFilter>>
  isTitle: boolean
  filterData: (state: IFilter) => Promise<void>
}
