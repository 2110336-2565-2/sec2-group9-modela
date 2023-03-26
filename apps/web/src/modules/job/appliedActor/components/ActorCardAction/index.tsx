import { Button } from '@mui/material'
import React, { MouseEvent } from 'react'

import { ActionContainer } from './styled'

const ActorCardAction = () => {
  const handleReject = (ev: MouseEvent) => {
    ev.preventDefault()
  }

  const handleSendOffer = (ev: MouseEvent) => {
    ev.preventDefault()
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
