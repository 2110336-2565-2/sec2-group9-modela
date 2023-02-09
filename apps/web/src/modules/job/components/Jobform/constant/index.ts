import { Gender } from '@modela/dtos'
import { MenuItemProps } from '@mui/material'
import dayjs from 'dayjs'

import { IPostJobSchemaType } from '../hooks/useJobForm/schema'

export const GENDER_CHOICE: MenuItemProps[] = [
  {
    children: 'ชาย',
    value: Gender.MALE,
  },
  {
    children: 'หญิง',
    value: Gender.FEMALE,
  },
  {
    children: 'อื่น ๆ',
    value: Gender.OTHER,
  },
  {
    children: 'ไม่ระบุ',
    value: Gender.ANY,
  },
]

export const DEFAULT_FORM_VALUES: IPostJobSchemaType = {
  jobName: '',
  jobDescription: '',
  dueDate: dayjs().add(1, 'day'),
  wage: '',
  shooting: [],
  actorCount: '',
  gender: 'ANY',
  minAge: '',
  maxAge: '',
  role: '',
}
