import { Control } from 'react-hook-form'

import { ActorQuery } from '../../pages/types'

export interface SearchFieldProps {
  control: Control<ActorQuery>
  onSubmit: () => void
}
