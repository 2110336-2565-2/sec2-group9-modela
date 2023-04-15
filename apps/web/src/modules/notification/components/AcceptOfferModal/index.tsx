import { Button, Divider, Typography } from '@mui/material'

import {
  AcceptOfferModalContentContainer,
  AcceptOfferModalRootContainer,
} from './styled'
import { AcceptOfferModalProps } from './types'

const AcceptOfferModal = (props: AcceptOfferModalProps) => {
  const { isOpen, handleClose, handleSubmit, title } = props
  return (
    <AcceptOfferModalRootContainer
      disableAutoFocus
      open={isOpen}
      onClose={handleClose}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}
    >
      <AcceptOfferModalContentContainer>
        <Typography sx={{ margin: 'auto' }} variant="h5">
          ยืนยันรับข้อเสนองาน
        </Typography>
        <Typography align="center" variant="subtitle1">
          {'งาน: '}
          {title}
        </Typography>
        <Divider variant="fullWidth" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="reject" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            ยืนยัน
          </Button>
        </div>
      </AcceptOfferModalContentContainer>
    </AcceptOfferModalRootContainer>
  )
}

export default AcceptOfferModal
