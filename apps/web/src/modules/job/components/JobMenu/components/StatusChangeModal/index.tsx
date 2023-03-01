import { Divider, Typography } from '@mui/material'

import { NEXT_STATUS_NAME } from '../../constants'
import {
  CancelButton,
  ModalContentContainer,
  RootModalContainer,
  SubmitButton,
} from './styled'
import { IChangeStatusModalProps } from './types'

const StatusChangeModal = (props: IChangeStatusModalProps) => {
  const { isOpen, status, handleClose, handleSubmit } = props
  return (
    <RootModalContainer disableAutoFocus open={isOpen} onClose={handleClose}>
      <ModalContentContainer>
        <Typography sx={{ margin: 'auto' }} variant="h5">
          เปลี่ยนสถานะงาน
        </Typography>
        <Divider />
        <Typography>
          คุณกำลังจะเปลี่ยนสถานะงานเป็น
          <Typography component={'span'}>
            {NEXT_STATUS_NAME[status!]}
          </Typography>
          ยืนยันหรือไม่
        </Typography>
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
