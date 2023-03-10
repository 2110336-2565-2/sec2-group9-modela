import { IFilter } from 'modules/job/appliedJob/pages/types'
import { Dispatch, SetStateAction } from 'react'

export interface SearchBoxProps {
  state: IFilter
  filterData: (state: IFilter) => Promise<void>
  setState: Dispatch<SetStateAction<IFilter>>
  labels: string
}
