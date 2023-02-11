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
export interface ISearch {
  startTime: String | null
  endTime: String | null
  location: String | null
  startDate: String | null
  endDate: String | null
  age: Number | null

  minWage: Number | null
  maxWage: Number | null

  status: String[]
  gender: String[]
  castingId: Number | null
}
