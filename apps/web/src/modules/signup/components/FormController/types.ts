import { Control, FieldValues, Path } from 'react-hook-form'

export interface IFormControllerProps<T extends FieldValues> {
  type: 'textField' | 'uploadFile' | 'divider' | 'password'
  xs: number
  sm: number
  name?: Path<T>
  label?: string
  control?: Control<T, any>
  required?: boolean
  fullWidth?: boolean
  handleUploadFile?(file: Blob): void
}
