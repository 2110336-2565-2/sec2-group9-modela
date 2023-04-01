import { Button, Divider, Typography } from '@mui/material'

import {
  RejectOfferModalContentContainer,
  RejectOfferModalRootContainer,
} from './styled'
import { RejectOfferModalProps } from './types'

const RejectOfferModal = (props: RejectOfferModalProps) => {
  const { isOpen, handleClose, handleSubmit, title } = props
  return (
    <RejectOfferModalRootContainer
      disableAutoFocus
      open={isOpen}
      onClose={handleClose}
    >
      <RejectOfferModalContentContainer>
        <Typography sx={{ margin: 'auto' }} variant="h5">
          ยืนยันปฏิเสธข้อเสนองาน
        </Typography>
        <Typography align="center" variant="subtitle1">
          {'งาน: '}
          {title}
        </Typography>
        <Divider variant="fullWidth" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="error" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            ยืนยัน
          </Button>
        </div>
      </RejectOfferModalContentContainer>
    </RejectOfferModalRootContainer>
  )
}

export default RejectOfferModal
