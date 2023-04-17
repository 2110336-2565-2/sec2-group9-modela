import { Button, Typography } from '@mui/material'

import { MODAL_OPTION } from './constants'
import { ActionContainer, ModalContainer } from './styled'
import { ConfirmPendingModalProps } from './types'

const PendingModalBody = (props: ConfirmPendingModalProps) => {
  const { handleCancel, handleConfirm, modalType } = props

  return (
    <ModalContainer>
      <Typography variant="h5">{MODAL_OPTION[modalType].title}</Typography>
      <ActionContainer>
        <Button
          sx={{ borderRadius: '12px' }}
          variant="contained"
          color="reject"
          onClick={handleCancel}
        >
          ยกเลิก
        </Button>
        <Button
          sx={{ borderRadius: '12px' }}
          variant="contained"
          color="success"
          onClick={handleConfirm}
        >
          ยืนยัน
        </Button>
      </ActionContainer>
    </ModalContainer>
  )
}

export default PendingModalBody
