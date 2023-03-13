import { Button, Modal, Typography } from '@mui/material'
import React from 'react'

import UserConfirmationModal from '../../UserConfirmationModal'
import UserRejectionModal from '../../UserRejectionModal'
import { FooterContainer } from './styled'
import { PendingUserCardFooterProps } from './type'

const PendingUserCardFooter = ({
  userId,
  accept,
  reject,
  setId,
  setReason,
}: PendingUserCardFooterProps) => {
  const [openAccept, setOpenAccept] = React.useState(false)
  const handleOpenAccept = () => {
    setId(userId)
    setOpenAccept(true)
  }
  const handleCloseAccept = () => setOpenAccept(false)

  const [openReject, setOpenReject] = React.useState(false)
  const handleOpenReject = () => {
    setId(userId)
    setOpenReject(true)
  }
  const handleCloseReject = () => setOpenReject(false)
  const handleReject = () => {
    handleCloseReject()
    reject()
  }

  const handleAccept = () => {
    handleCloseAccept()
    accept()
  }

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
        <UserRejectionModal setReason={setReason} reject={handleReject} />
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
        <UserConfirmationModal
          userId={userId}
          close={handleCloseAccept}
          confirm={handleAccept}
        />
      </Modal>
    </FooterContainer>
  )
}

export default PendingUserCardFooter
