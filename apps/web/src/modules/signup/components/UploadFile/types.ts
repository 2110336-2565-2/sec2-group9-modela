import { FieldValues, UseFormSetError } from 'react-hook-form'

export interface IUploadFileProps<T extends FieldValues> {
  error: boolean
  errorMessage?: string
  label: string
  handleSelectFile: (file: Blob) => void
  setError: UseFormSetError<T>
  url: string
}
