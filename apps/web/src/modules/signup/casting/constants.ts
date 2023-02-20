import { IFormControllerProps } from 'common/components/FormController/types'

import { ICastingSignupSchemaType } from './hooks/useCastingForm/schema'

export const FORM_LAYOUT: IFormControllerProps<ICastingSignupSchemaType>[] = [
  {
    type: 'divider',
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
    type: 'textField',
    label: 'นามสกุล',
    name: 'lastName',
  },
  {
    type: 'textField',
    label: 'ชือบริษัท',
    name: 'companyName',
  },
  {
    type: 'textField',
    label: 'เลขจดทะเบียน',
    name: 'companyId',
  },
  {
    type: 'uploadFile',
    label: 'หนังสือรับรองการทำงาน',
    name: 'employmentCertUrl',
  },
  {
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
