import { Button, Modal, Typography } from '@mui/material'
import React from 'react'

import UserConfirmationCard from '../../UserConfirmationCard/Body'
import { FooterContainer } from './styled'

const PendingUserCardFooter = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <FooterContainer>
      <Button color="error">
        <Typography variant="button">ปฏิเสธ</Typography>
      </Button>
      <Button color="success" onClick={handleOpen}>
        <Typography variant="button">อนุมัติ</Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UserConfirmationCard />
      </Modal>
    </FooterContainer>
  )
}

export default PendingUserCardFooter
