export interface IUploadFileProps {
  error: boolean
  errorMessage?: string
  handleSelectFile: (file: Blob) => void
  label?: string
  url?: string
}
