export interface IUploadFileProps {
  error: boolean
  errorMessage?: string
  label: string
  handleSelectFile: (file: Blob) => void
  url: string
}
