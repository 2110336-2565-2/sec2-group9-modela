import { Button, Divider, Typography } from '@mui/material'

import { NEXT_STATUS_NAME } from '../../constants'
import { ADDITION_DESC } from './constants'
import { ModalContentContainer, RootModalContainer } from './styled'
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
        <Typography align="center" variant="subtitle1">
          คุณกำลังจะเปลี่ยนสถานะงานเป็น
          <Typography
            component={'span'}
            sx={{ marginLeft: '5px', fontWeight: 700 }}
          >
            {NEXT_STATUS_NAME[status!]}
          </Typography>
          <Typography component={'span'} sx={{ marginLeft: '5px' }}>
            {ADDITION_DESC[status!]}
          </Typography>
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button color="reject" variant="contained" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button color="success" variant="contained" onClick={handleSubmit}>
            ยืนยัน
          </Button>
        </div>
      </ModalContentContainer>
    </RootModalContainer>
  )
}

export default StatusChangeModal
