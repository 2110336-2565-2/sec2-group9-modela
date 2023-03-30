import { Button } from '@mui/material'
import React, { MouseEvent } from 'react'

import { ActionContainer } from './styled'
import { ActorCardActionProps } from './types'

const ActorCardAction = ({ openModal }: ActorCardActionProps) => {
  const handleOpenModal = async (ev: MouseEvent) => {
    ev.stopPropagation()
    ev.preventDefault()
    openModal()
  }

  return (
    <ActionContainer>
      <Button color="error" onClick={handleOpenModal}>
        ปฏิเสธ
      </Button>
      <Button color="success" onClick={handleOpenModal}>
        ส่งข้อเสนอ
      </Button>
    </ActionContainer>
  )
}

export default ActorCardAction
