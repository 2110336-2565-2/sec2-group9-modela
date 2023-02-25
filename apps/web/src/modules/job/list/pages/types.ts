import { Dayjs } from 'dayjs'

export interface IFilter {
  title: string | null
  startTime: Dayjs | null
  endTime: Dayjs | null
  location: string | null
  startDate: Dayjs | null
  endDate: Dayjs | null
  wage: number | null
  deviant: number | null
  age: number | null
  openCheck: boolean
  closeCheck: boolean
  maleCheck: boolean
  femaleCheck: boolean
  otherCheck: boolean
  cancleCheck: boolean
  reportCheck: boolean
}
export interface ISearch {
  title: string | null
  startTime: string | null
  endTime: string | null
  location: string | null
  startDate: string | null
  endDate: string | null
  age: number | null

  minWage: number | null
  maxWage: number | null

  status: string[]
  gender: string[]
  castingId: number | null
  isReport: boolean
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
  cancleCheck: false,
  reportCheck: true,
}
export const initialISearch: ISearch = {
  title: null,
  startDate: null,
  endDate: null,
  location: null,
  startTime: null,
  endTime: null,
  minWage: null,
  maxWage: null,
  age: null,
  status: [],
  gender: [],
  castingId: null,
  isReport: true,
}
