import { Dayjs } from 'dayjs'

export interface IFilter {
  startTime: Dayjs | null
  endTime: Dayjs | null
  location: String | null
  startDate: Dayjs | null
  endDate: Dayjs | null
  wage: Number | null
  deviant: Number | null
  age: Number | null
  openCheck: boolean
  closeCheck: boolean
  maleCheck: boolean
  femaleCheck: boolean
  otherCheck: boolean
}
