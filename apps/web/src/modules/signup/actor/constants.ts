import { Gender } from '@modela/dtos'
import { MenuItemProps } from '@mui/material'

import { IFormControllerProps } from '../components/FormController/types'
import { IActorSignupSchemaType } from './hooks/useActorForm/schema'

const GENDER_CHOICE: MenuItemProps[] = [
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
]

export const FORM_LAYOUT: Omit<
  IFormControllerProps<IActorSignupSchemaType>,
  'control'
>[] = [
  {
    xs: 12,
    sm: 12,
    type: 'divider',
  },
  {
    xs: 12,
    sm: 6,
    type: 'textField',
    required: true,
    fullWidth: true,
    label: 'คำนำหน้าชื่อ',
  },
  {
    xs: 12,
    sm: 6,
    type: 'textField',
    label: 'ชื่อจริง',
    name: 'firstName',
    fullWidth: true,
    required: true,
  },
  {
    xs: 12,
    sm: 6,
    type: 'textField',
    label: 'ชื่อกลาง (ไม่จำเป็น)',
    name: 'middleName',
    fullWidth: true,
    required: true,
  },
  {
    xs: 12,
    sm: 6,
    type: 'textField',
    label: 'นามสกุล',
    name: 'lastName',
    fullWidth: true,
    required: true,
  },
  {
    xs: 12,
    sm: 6,
    type: 'textField',
    label: 'สัญชาติ',
    name: 'nationality',
    fullWidth: true,
    required: true,
  },
  {
    xs: 12,
    sm: 12,
    type: 'select',
    label: 'เพศ',
    name: 'gender',
    required: true,
    fullWidth: true,
    selectProps: GENDER_CHOICE,
  },
  {
    xs: 12,
    sm: 12,
    type: 'textField',
    label: 'เบอร์โทรศัพท์',
    fullWidth: true,
    required: true,
  },
  {
    xs: 12,
    sm: 12,
    type: 'uploadFile',
    label: 'เลขบัตรประจำตัวประชาชน/เลขพาสปอร์ต',
    name: 'idCardImageUrl',
    fullWidth: true,
    required: true,
  },
  {
    xs: 12,
    sm: 12,
    type: 'divider',
  },
  {
    xs: 12,
    sm: 12,
    type: 'textField',
    label: 'อีเมล',
    name: 'email',
    fullWidth: true,
    required: true,
  },
  {
    xs: 12,
    sm: 12,
    type: 'password',
    label: 'รหัสผ่าน',
    name: 'password',
    fullWidth: true,
    required: true,
  },
  {
    xs: 12,
    sm: 12,
    type: 'password',
    label: 'ยืนยันรหัสผ่าน',
    name: 'confirmPassword',
    fullWidth: true,
    required: true,
  },
]
