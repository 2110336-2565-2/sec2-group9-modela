import { Control } from 'react-hook-form'

import { ActorQuery } from '../../pages/types'

export interface ActorFilterModalProps {
  onClose: () => void
  control: Control<ActorQuery>
}
