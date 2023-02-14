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
    xs: 6,
  },
  {
    type: 'number',
    label: 'ค่าจ้างต่อคน (บาท)',
    name: 'wage',
    sm: 6,
    xs: 6,
    inputProps: {
      min: 1,
    },
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
    type: 'number',
    label: 'จำนวนนักแสดง',
    name: 'actorCount',
    sm: 6,
    xs: 6,
    inputProps: {
      min: 1,
    },
  },
  {
    type: 'select',
    label: 'เพศ',
    name: 'gender',
    selectProps: GENDER_CHOICE,
    sm: 6,
    xs: 6,
  },
  {
    type: 'number',
    label: 'อายุต่ำสุด',
    name: 'minAge',
    sm: 6,
    xs: 6,
    inputProps: {
      min: 1,
    },
  },
  {
    type: 'number',
    label: 'อายุสูงสุด',
    name: 'maxAge',
    sm: 6,
    xs: 6,
    inputProps: {
      min: 1,
    },
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

// any better way here ? ;w;
export const DEFAULT_FORM_VALUES: IPostJobSchemaType = {
  title: '',
  description: '',
  applicationDeadline: dayjs().add(1, 'day'),
  wage: '' as unknown as number,
  shooting: [],
  actorCount: '' as unknown as number,
  gender: 'ANY',
  minAge: '' as unknown as number,
  maxAge: '' as unknown as number,
  role: '',
}
