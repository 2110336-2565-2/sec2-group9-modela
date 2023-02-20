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
    | 'title'
    | 'label'
  xs?: number
  sm?: number
  name?: Path<T>
  label?: string
  control?: Control<T>
  optional?: boolean
  fullWidth?: boolean
  hideLink?: boolean
  selectProps?: MenuItemProps[]
  handleUploadFile?(file: Blob): void
  inputProps?: { [key: string]: any }
}
