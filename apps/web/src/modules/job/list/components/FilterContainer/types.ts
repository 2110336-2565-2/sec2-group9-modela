import { Dayjs } from 'dayjs'
import { Dispatch, SetStateAction } from 'react'

interface IFilter {
  startShooting: Dayjs | null
  endShooting: Dayjs | null
  place: String | null
  date: Dayjs | null
  wage: Number | null
  deviant: Number | null
  age: Number | null
  openCheck: boolean
  closeCheck: boolean
  maleCheck: boolean
  femaleCheck: boolean
  otherCheck: boolean
}
export interface FilterContainerProps {
  state: IFilter
  setState: Dispatch<SetStateAction<IFilter>>
}
