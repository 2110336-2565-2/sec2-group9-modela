import { Button, Divider, Typography } from '@mui/material'

import { ModalContentContainer, RootModalContainer } from './styled'
import { IOfferModalProps } from './types'

const StatusChangeModal = (props: IOfferModalProps) => {
  const { isOpen, handleClose, handleSubmit, title } = props
  return (
    <RootModalContainer disableAutoFocus open={isOpen} onClose={handleClose}>
      <ModalContentContainer>
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
      </ModalContentContainer>
    </RootModalContainer>
  )
}

export default StatusChangeModal
