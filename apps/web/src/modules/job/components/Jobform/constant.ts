import { Gender } from '@modela/dtos'
import { MenuItemProps } from '@mui/material'
import { IFormControllerProps } from 'common/components/FormController/types'
import dayjs from 'dayjs'

import { IPostJobSchemaType } from './hooks/useJobForm/schema'

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

export const FORM_LAYOUT:
  | (
      | Omit<IFormControllerProps<IPostJobSchemaType>, 'control'>
      | { type: 'shooting' }
    )[] = [
  { type: 'typography', label: 'รายละเอียดงาน' },
  {
    type: 'textField',
    label: 'ชื่องาน',
    name: 'title',
  },
  {
    type: 'textField',
    label: 'รายละเอียดงาน',
    name: 'description',
    inputProps: {
      multiline: true,
      rows: 3,
    },
  },
  {
    type: 'date',
    label: 'วันที่ปิดรับสมัคร',
    name: 'applicationDeadline',
    sm: 6,
  },
  {
    type: 'textField',
    label: 'ค่าจ้างต่อคน (บาท)',
    name: 'wage',
    inputProps: {
      type: 'number',
    },
    sm: 6,
  },
  {
    type: 'shooting',
  },
  {
    type: 'typography',
    label: 'รายละเอียดนักแสดง',
  },
  {
    type: 'divider',
  },
  {
    type: 'textField',
    label: 'จำนวนนักแสดง',
    name: 'actorCount',
    inputProps: {
      type: 'number',
    },
    sm: 6,
  },
  {
    type: 'select',
    label: 'เพศ',
    name: 'gender',
    selectProps: GENDER_CHOICE,
    sm: 6,
  },
  {
    type: 'textField',
    label: 'อายุต่ำสุด',
    name: 'minAge',
    inputProps: {
      type: 'number',
    },
    sm: 6,
  },
  {
    type: 'textField',
    label: 'อายุสูงสุด',
    name: 'maxAge',
    inputProps: {
      type: 'number',
    },
    sm: 6,
  },
  {
    type: 'textField',
    label: 'รายละเอียดนักแสดง',
    name: 'role',
    inputProps: {
      multiline: true,
      rows: 3,
    },
  },
]

export const DEFAULT_FORM_VALUES: IPostJobSchemaType = {
  title: '',
  description: '',
  applicationDeadline: dayjs().add(1, 'day'),
  wage: '',
  shooting: [],
  actorCount: '',
  gender: 'ANY',
  minAge: '',
  maxAge: '',
  role: '',
}
