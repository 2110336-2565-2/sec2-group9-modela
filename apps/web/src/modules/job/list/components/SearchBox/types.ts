import { IFilter } from 'modules/job/list/pages/types'

export interface SearchBoxProps {
  state: IFilter
  filterData: (state: IFilter) => Promise<void>
}
