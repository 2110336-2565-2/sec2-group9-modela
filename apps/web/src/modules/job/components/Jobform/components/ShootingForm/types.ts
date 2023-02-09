import { Control } from 'react-hook-form'

import { IPostJobSchemaType } from '../../hooks/useJobForm/schema'

export interface ShootingFormProps {
  id: string
  index: number
  remove: (idx: number) => void
  control: Control<IPostJobSchemaType>
}
