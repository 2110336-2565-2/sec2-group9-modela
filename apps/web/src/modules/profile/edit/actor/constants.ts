import { IFormControllerProps } from 'common/components/FormController/types'

import { IEditActorProfileSchemaType } from './hooks/useEditActorForm/schema'

export const FORM_LAYOUT: IFormControllerProps<IEditActorProfileSchemaType>[] =
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
      type: 'textField',
      label: 'คำอธิบาย',
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
      label: 'ข้อมูลรูปลักษณ์',
    },
    {
      type: 'number',
      label: 'ส่วนสูง(เซนติเมตร)',
      name: 'height',
      optional: true,
      sm: 6,
      xs: 12,
    },
    {
      type: 'number',
      label: 'น้ำหนัก(กิโลกรัม)',
      name: 'weight',
      optional: true,
      sm: 6,
      xs: 12,
    },
    {
      type: 'textField',
      label: 'สีตา',
      name: 'eyeColor',
      optional: true,
      sm: 6,
      xs: 12,
    },
    {
      type: 'textField',
      label: 'สีผม',
      name: 'hairColor',
      optional: true,
      sm: 6,
      xs: 12,
    },
    {
      type: 'number',
      label: 'รอบอก(นิ้ว)',
      name: 'bust',
      optional: true,
      sm: 6,
      xs: 12,
    },
    {
      type: 'number',
      label: 'รอบเอว(นิ้ว)',
      name: 'waist',
      optional: true,
      sm: 6,
      xs: 12,
    },
    {
      type: 'number',
      label: 'รอบสะโพก(นิ้ว)',
      name: 'hips',
      optional: true,
      sm: 6,
      xs: 12,
    },
    {
      type: 'number',
      label: 'ขนาดรองเท้า',
      name: 'shoeSize',
      optional: true,
      sm: 6,
      xs: 12,
    },
    {
      type: 'textField',
      label: 'สีผิว',
      name: 'skinShade',
      optional: true,
      sm: 12,
      xs: 12,
    },
    {
      type: 'label',
      label: 'ข้อมูลส่วนตัว',
    },
    {
      type: 'textField',
      label: 'ชื่อเล่น',
      name: 'nickname',
      optional: true,
      sm: 6,
      xs: 12,
    },
    {
      type: 'date',
      label: 'วันเกิด',
      name: 'birthDate',
      sm: 6,
      xs: 12,
    },
    {
      type: 'textField',
      label: 'เซื้อชาติ',
      name: 'ethnicity',
      optional: true,
      sm: 6,
      xs: 12,
    },
    {
      type: 'textField',
      label: 'ศาสนา',
      name: 'religion',
      optional: true,
      sm: 6,
      xs: 12,
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
