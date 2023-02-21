import { Gender } from '@modela/dtos'
import { MenuItemProps } from '@mui/material'
import { IFormControllerProps } from 'common/components/FormController/types'

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

export const FORM_LAYOUT: IFormControllerProps<IActorSignupSchemaType>[] = [
  {
    type: 'divider',
  },
  {
    sm: 6,
    type: 'textField',
    label: 'คำนำหน้าชื่อ',
    name: 'prefix',
  },
  {
    sm: 6,
    type: 'textField',
    label: 'ชื่อจริง',
    name: 'firstName',
  },
  {
    sm: 6,
    type: 'textField',
    label: 'ชื่อกลาง (ไม่จำเป็น)',
    name: 'middleName',
    optional: true,
  },
  {
    sm: 6,
    type: 'textField',
    label: 'นามสกุล',
    name: 'lastName',
  },
  {
    sm: 6,
    type: 'textField',
    label: 'สัญชาติ',
    name: 'nationality',
  },
  {
    sm: 6,
    type: 'select',
    label: 'เพศ',
    name: 'gender',
    selectProps: GENDER_CHOICE,
  },
  {
    name: 'phoneNumber',
    type: 'textField',
    label: 'เบอร์โทรศัพท์',
  },
  {
    xs: 12,
    sm: 12,
    type: 'textField',
    label: 'เลขบัตรประจำตัวประชาชน/เลขพาสปอร์ต',
    name: 'ssn',
  },
  {
    xs: 12,
    sm: 12,
    type: 'uploadFile',
    label: 'อัพโหลดรูปถ่ายบัตรประชาชน/พาสปอร์ต',
    name: 'idCardImageUrl',
  },
  {
    xs: 12,
    sm: 12,
    type: 'divider',
  },
  {
    type: 'textField',
    label: 'อีเมล',
    name: 'email',
  },
  {
    type: 'password',
    label: 'รหัสผ่าน',
    name: 'password',
  },
  {
    type: 'password',
    label: 'ยืนยันรหัสผ่าน',
    name: 'confirmPassword',
  },
]
