import { Button, Divider, Typography } from '@mui/material'

import {
  ActionButtonContainer,
  ModalContentContainer,
  RootModalContainer,
} from './styled'
import { IDeleteModalProps } from './types'

const DeleteModal = (props: IDeleteModalProps) => {
  const { isOpen, handleClose, handleSubmit, name } = props
  return (
    <RootModalContainer disableAutoFocus open={isOpen} onClose={handleClose}>
      <ModalContentContainer>
        <Typography sx={{ margin: 'auto' }} variant="h5">
          ลบเรซูเม่
        </Typography>
        <Divider />
        <Typography sx={{ textAlign: 'center' }}>
          ยืนยันทำการลบเรซูเม่: {name}
        </Typography>
        <Typography color="error" fontWeight={500} textAlign="center">
          หมายเหตุ: เรซูเม่ที่ถูกใช้ในการสมัครไปแล้วจะยังคงอยู่ในระบบ
        </Typography>
        <ActionButtonContainer>
          <Button color="reject" variant="contained" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button color="success" variant="contained" onClick={handleSubmit}>
            ยืนยัน
          </Button>
        </ActionButtonContainer>
      </ModalContentContainer>
    </RootModalContainer>
  )
}

export default DeleteModal
