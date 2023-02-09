import { IPostJobSchemaType } from './hooks/useJobForm/schema'

export interface JobFormProps {
  edit?: boolean
  initialValues?: IPostJobSchemaType
}
