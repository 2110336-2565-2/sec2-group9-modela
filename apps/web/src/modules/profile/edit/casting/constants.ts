import { IFormControllerProps } from 'common/components/FormController/types'

import { IEditCastingProfileSchemaType } from './hooks/useEditCastingForm/schema'

export const FORM_LAYOUT: IFormControllerProps<IEditCastingProfileSchemaType>[] =
  [
    {
      type: 'title',
      label: 'แก้ไขโปรไฟล์',
      sm: 12,
      xs: 12,
    },
    {
      type: 'divider',
      sm: 12,
      xs: 12,
    },
    {
      type: 'uploadFile',
      label: 'อัปโหลดรูปโปรไฟล์',
      hideLink: true,
      name: 'profileImageUrl',
      sm: 12,
      xs: 12,
      accept: 'image/*',
    },
    {
      type: 'label',
      label: 'ข้อมูลส่วนตัว',
    },
    {
      type: 'textField',
      label: 'เบอร์โทรศัพท์',
      name: 'phoneNumber',
      optional: true,
      sm: 12,
      xs: 12,
    },
    {
      type: 'textField',
      label: 'ข้อมูลอื่น ๆ',
      name: 'description',
      optional: true,
      sm: 12,
      xs: 12,
      inputProps: {
        multiline: true,
        rows: 3,
      },
    },
    {
      type: 'label',
      label: 'ข้อมูลธุรกรรม',
    },
    {
      type: 'textField',
      label: 'ชื่อธนาคารของบัญชี',
      optional: true,
      name: 'bankName',
      sm: 6,
      xs: 12,
    },
    {
      type: 'textField',
      label: 'เลขบัญชี',
      name: 'bankAccount',
      optional: true,
      sm: 6,
      xs: 12,
    },
  ]
