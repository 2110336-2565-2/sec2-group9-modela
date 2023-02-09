import { MenuItemProps } from '@mui/material'
import { Control, FieldValues, Path } from 'react-hook-form'

export interface IFormControllerProps<T extends FieldValues> {
  type:
    | 'textField'
    | 'number'
    | 'uploadFile'
    | 'divider'
    | 'password'
    | 'select'
    | 'date'
    | 'time'
    | 'typography'
  xs?: number
  sm?: number
  name?: Path<T>
  label?: string
  control?: Control<T>
  optional?: boolean
  fullWidth?: boolean
  selectProps?: MenuItemProps[]
  handleUploadFile?(file: Blob): void
  inputProps?: { [key: string]: any }
}
