import { Button, Divider, Typography } from '@mui/material'

import { ActionContainer, BodyContentContainer } from './styled'
import { ActorCardModalProps } from './types'

const ActorCardModal = (props: ActorCardModalProps) => {
  const { close, isRejected } = props

  return (
    <BodyContentContainer>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        {!isRejected ? 'ส่งข้อเสนองาน' : 'ปฏิเสธนักแสดง'}
      </Typography>
      <Divider />
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        คุณต้องการ{!isRejected ? 'ส่งข้อเสนองาน' : 'ปฏิเสธนักแสดง'}หรือไม่
      </Typography>
      <ActionContainer>
        <Button
          sx={{ borderRadius: '12px' }}
          variant="contained"
          color="error"
          onClick={close}
        >
          ยกเลิก
        </Button>
        <Button
          sx={{ borderRadius: '12px' }}
          variant="contained"
          color="success"
          onClick={close}
        >
          ยืนยัน
        </Button>
      </ActionContainer>
    </BodyContentContainer>
  )
}

export default ActorCardModal
