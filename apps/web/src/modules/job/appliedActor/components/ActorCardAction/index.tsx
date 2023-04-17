import { Button } from '@mui/material'
import React, { MouseEvent } from 'react'

import { ActionContainer } from './styled'
import { ActorCardActionProps } from './types'

const ActorCardAction = ({
  openModal,
  setIsRejected,
}: ActorCardActionProps) => {
  const openRejectModal = (ev: MouseEvent) => {
    ev.stopPropagation()
    ev.preventDefault()
    setIsRejected(true)
    openModal()
  }

  const openAcceptModal = (ev: MouseEvent) => {
    ev.stopPropagation()
    ev.preventDefault()
    setIsRejected(false)
    openModal()
  }

  return (
    <ActionContainer>
      <Button color="reject" onClick={openRejectModal}>
        ปฏิเสธ
      </Button>
      <Button color="success" onClick={openAcceptModal}>
        ส่งข้อเสนอ
      </Button>
    </ActionContainer>
  )
}

export default ActorCardAction
