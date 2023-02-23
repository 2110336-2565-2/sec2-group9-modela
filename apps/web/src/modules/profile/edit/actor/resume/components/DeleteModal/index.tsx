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
    <RootModalContainer open={isOpen} onClose={handleClose}>
      <ModalContentContainer>
        <Typography sx={{ margin: 'auto' }} variant="h5">
          ลบเรซูเม่
        </Typography>
        <Divider />
        <Typography sx={{ textAlign: 'center' }}>
          ยืนยันทำการลบเรซูเม่: {name}
        </Typography>
        <ActionButtonContainer>
          <Button color="error" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button color="success" onClick={handleSubmit}>
            ยืนยัน
          </Button>
        </ActionButtonContainer>
      </ModalContentContainer>
    </RootModalContainer>
  )
}

export default DeleteModal
