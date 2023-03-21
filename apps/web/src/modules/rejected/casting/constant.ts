import { IFormControllerProps } from 'common/components/FormController/types'

import { IEditCastingInfoSchema } from './hooks/useCastingForm/schema'

export const FORM_LAYOUT: IFormControllerProps<IEditCastingInfoSchema>[] = [
  {
    type: 'title',
    label: 'แก้ไขข้อมูลผู้กำกับ',
  },
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
    xs: 12,
    sm: 12,
    type: 'textField',
    label: 'นามสกุล',
    name: 'lastName',
  },
  {
    xs: 12,
    sm: 12,
    type: 'textField',
    label: 'ชื่อบริษัท',
    name: 'companyName',
  },
  {
    xs: 12,
    sm: 12,
    type: 'textField',
    label: 'เลขจดทะเบียนบริษัท',
    name: 'companyId',
  },
  {
    xs: 12,
    sm: 12,
    type: 'uploadFile',
    label: 'อัพโหลดรูปถ่ายหนังสือรับรองการทำงาน',
    name: 'employmentCertUrl',
    initialName: 'หนังสือรับรองการทำงาน',
  },
]
