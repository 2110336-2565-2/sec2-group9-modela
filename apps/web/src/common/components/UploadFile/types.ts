import { SxPropsWithTheme } from 'common/types/mui'

export interface IUploadFileProps {
  error: boolean
  errorMessage?: string
  handleSelectFile: (file: File) => void
  label?: string
  url?: string
  hideLink?: boolean
  initialName?: string
  sx?: SxPropsWithTheme
  accept?: string
}
