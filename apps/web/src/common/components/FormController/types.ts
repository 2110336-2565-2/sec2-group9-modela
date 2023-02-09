import { MenuItemProps } from '@mui/material'
import { Control, FieldValues, Path } from 'react-hook-form'

export interface IFormControllerProps<T extends FieldValues> {
  type: 'textField' | 'uploadFile' | 'divider' | 'password' | 'select'
  xs?: number
  sm?: number
  name?: Path<T>
  label?: string
  control?: Control<FieldValues>
  optional?: boolean
  fullWidth?: boolean
  selectProps?: MenuItemProps[]
  handleUploadFile?(file: Blob): void
  inputProps?: { [key: string]: any }
}
