import { Button, Divider, Typography } from '@mui/material'

import { MODAL_OPTION } from './constants'
import { ActionContainer, ModalContainer } from './styled'
import { ConfirmModalBodyProps } from './types'

const ConfirmModalBody = (props: ConfirmModalBodyProps) => {
  const { handleCancel, handleConfirm, modalType } = props

  return (
    <ModalContainer>
      <Typography variant="h5">{MODAL_OPTION[modalType].title}</Typography>
      <Divider sx={{ width: '100%' }} />
      <Typography variant="body1">
        คุณกำลังจะเปลี่ยนสถานะธุรกรรมเป็น{' '}
        <Typography component="span" fontWeight={600}>
          {MODAL_OPTION[modalType].finalState}
        </Typography>
      </Typography>
      <ActionContainer>
        <Button
          sx={{ borderRadius: '12px' }}
          variant="contained"
          color="error"
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

export default ConfirmModalBody
