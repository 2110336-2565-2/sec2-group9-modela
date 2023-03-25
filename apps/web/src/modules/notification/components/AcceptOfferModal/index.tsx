import { Divider, Typography } from '@mui/material'

import {
  CancelButton,
  ModalContentContainer,
  RootModalContainer,
  SubmitButton,
} from './styled'
import { IOfferModalProps } from './types'

const StatusChangeModal = (props: IOfferModalProps) => {
  const { isOpen, handleClose, handleSubmit, title } = props
  return (
    <RootModalContainer disableAutoFocus open={isOpen} onClose={handleClose}>
      <ModalContentContainer>
        <Typography sx={{ margin: 'auto' }} variant="h5">
          ยืนยันรับข้อเสนองาน
        </Typography>
        <Typography align="center" variant="subtitle1">
          {'งาน: '}
          {title}
        </Typography>
        <Divider variant="fullWidth" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CancelButton variant="contained" onClick={handleClose}>
            ยกเลิก
          </CancelButton>
          <SubmitButton variant="contained" onClick={handleSubmit}>
            ยืนยัน
          </SubmitButton>
        </div>
      </ModalContentContainer>
    </RootModalContainer>
  )
}

export default StatusChangeModal
