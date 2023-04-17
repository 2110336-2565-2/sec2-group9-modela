import { IFormControllerProps } from 'common/components/FormController/types'

import { ILoginSchemaType } from './hooks/useLoginForm/schema'

export const FORM_LAYOUT: IFormControllerProps<ILoginSchemaType>[] = [
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
]
