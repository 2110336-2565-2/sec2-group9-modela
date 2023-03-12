import { Button, Modal, Typography } from '@mui/material'
import React from 'react'

import UserConfirmationCard from '../../UserConfirmationCard/Body'
import UserRejectionCard from '../../UserRejectionCard/Body'
import { FooterContainer } from './styled'
import { footerProps } from './type'

const PendingUserCardFooter = (props: footerProps) => {
  const [openAccept, setOpenAccept] = React.useState(false)
  const handleOpenAccept = () => {
    props.setId(props.userId)
    setOpenAccept(true)
  }
  const handleCloseAccept = () => setOpenAccept(false)

  const [openReject, setOpenReject] = React.useState(false)
  const handleOpenReject = () => setOpenReject(true)
  const handleCloseReject = () => setOpenReject(false)

  return (
    <FooterContainer>
      <Button color="error" onClick={handleOpenReject}>
        <Typography variant="button">ปฏิเสธ</Typography>
      </Button>
      <Modal
        open={openReject}
        onClose={handleCloseReject}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UserRejectionCard />
      </Modal>
      <Button color="success" onClick={handleOpenAccept}>
        <Typography variant="button">อนุมัติ</Typography>
      </Button>
      <Modal
        open={openAccept}
        onClose={handleCloseAccept}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UserConfirmationCard
          userId={props.userId}
          close={handleCloseAccept}
          modal={props.accept}
        />
      </Modal>
    </FooterContainer>
  )
}

export default PendingUserCardFooter
