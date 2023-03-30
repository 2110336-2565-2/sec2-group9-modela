import { Dispatch, SetStateAction } from 'react'

export interface ActorCardActionProps {
  actorId: number
  openModal: () => void
  setIsRejected: Dispatch<SetStateAction<boolean>>
}
