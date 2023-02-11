import { Dayjs } from 'dayjs'

export interface IFilter {
  title: String | null
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
  title: String | null
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
export const initialIFilter: IFilter = {
  title: null,
  startDate: null,
  endDate: null,
  location: null,
  startTime: null,
  endTime: null,
  wage: null,
  deviant: null,
  age: null,
  openCheck: true,
  closeCheck: false,
  maleCheck: false,
  femaleCheck: false,
  otherCheck: false,
}
export const initialISearch: ISearch = {
  title: null,
  startDate: null,
  endDate: null,
  location: null,
  startTime: null,
  endTime: null,
  minWage: 0,
  maxWage: null,
  age: null,
  status: [],
  gender: [],
  castingId: null,
}
