import { IFormControllerProps } from '../components/FormController/types'
import { ICastingSignupSchemaType } from './hooks/useCastingForm/schema'

export const FORM_LAYOUT: Omit<
  IFormControllerProps<ICastingSignupSchemaType>,
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
    sm: 12,
    type: 'textField',
    label: 'นามสกุล',
    name: 'lastName',
    fullWidth: true,
    required: true,
  },
  {
    xs: 12,
    sm: 12,
    type: 'textField',
    label: 'ชือบริษัท',
    name: 'companyName',
    fullWidth: true,
    required: true,
  },
  {
    xs: 12,
    sm: 12,
    type: 'textField',
    label: 'เลขจดทะเบียน',
    name: 'companyId',
    fullWidth: true,
    required: true,
  },
  {
    xs: 12,
    sm: 12,
    type: 'uploadFile',
    label: 'หนังสือรับรองการทำงาน',
    name: 'employmentCertUrl',
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
