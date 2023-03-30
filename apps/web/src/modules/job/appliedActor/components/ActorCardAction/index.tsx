import { Button } from '@mui/material'
import React, { MouseEvent } from 'react'

import useActorCardAction from './hooks/useActorCardAction'
import { ActionContainer } from './styled'
import { ActorCardActionProps } from './types'

const ActorCardAction = ({ actorId }: ActorCardActionProps) => {
  const { acceptActor, rejectActor } = useActorCardAction()

  const handleReject = async (ev: MouseEvent) => {
    ev.preventDefault()
    ev.stopPropagation()
    await rejectActor(actorId)
  }

  const handleSendOffer = async (ev: MouseEvent) => {
    ev.preventDefault()
    ev.stopPropagation()
    await acceptActor(actorId)
  }

  return (
    <ActionContainer>
      <Button color="error" onClick={handleReject}>
        ปฏิเสธ
      </Button>
      <Button color="success" onClick={handleSendOffer}>
        ส่งข้อเสนอ
      </Button>
    </ActionContainer>
  )
}

export default ActorCardAction
