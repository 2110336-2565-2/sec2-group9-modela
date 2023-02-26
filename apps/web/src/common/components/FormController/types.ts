import { MenuItemProps } from '@mui/material'
import { Control, FieldValues, Path } from 'react-hook-form'

export type IFormControllerProps<T extends FieldValues> = {
  control?: Control<T>
  handleUploadFile?(file: File): void
} & (
  | IDivider
  | ITitle
  | ILabel
  | ITextField<T>
  | IDateField<T>
  | INumberTextField<T>
  | IUploadFileField<T>
  | ISelectField<T>
  | IDateField<T>
  | ITimeField<T>
  | IPasswordField<T>
)

interface IDivider {
  type: 'divider'
  xs?: number
  sm?: number
}

interface ITitle {
  type: 'title'
  label?: string
  xs?: number
  sm?: number
}

interface ILabel {
  type: 'label'
  label?: string
  xs?: number
  sm?: number
}

interface ITextField<T extends FieldValues> {
  type: 'textField'
  xs?: number
  sm?: number
  optional?: boolean
  inputProps?: { [key: string]: any }
  fullWidth?: boolean
  name: Path<T>
  label?: string
}

interface INumberTextField<T extends FieldValues>
  extends Omit<ITextField<T>, 'type'> {
  type: 'number'
}

interface IUploadFileField<T extends FieldValues> {
  type: 'uploadFile'
  xs?: number
  sm?: number
  name: Path<T>
  label?: string
  hideLink?: boolean
  initialName?: string
  accept?: string
}

interface ISelectField<T extends FieldValues>
  extends Omit<ITextField<T>, 'type'> {
  type: 'select'
  selectProps?: MenuItemProps[]
}

interface IDateField<T extends FieldValues> {
  type: 'date'
  label?: string
  xs?: number
  sm?: number
  name: Path<T>
}

interface ITimeField<T extends FieldValues>
  extends Omit<IDateField<T>, 'type'> {
  type: 'time'
}

interface IPasswordField<T extends FieldValues>
  extends Omit<ITextField<T>, 'type'> {
  type: 'password'
}
