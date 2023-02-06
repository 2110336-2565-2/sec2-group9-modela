import { UseFormSetError } from 'react-hook-form'

import { IActorSignupSchemaType } from '../../hooks/useActorForm/schema'

export interface IUploadFileProps {
  error: boolean
  errorMessage?: string
  label: string
  handleSelectFile: (file: Blob) => void
  setError: UseFormSetError<IActorSignupSchemaType>
  url: string
}
