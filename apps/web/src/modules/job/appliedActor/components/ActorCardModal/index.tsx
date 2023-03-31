import { Button, Divider, Typography } from '@mui/material'

import useActorCardAction from './hooks/useActorCardAction'
import { ActionContainer, BodyContentContainer } from './styled'
import { ActorCardModalProps } from './types'

const ActorCardModal = (props: ActorCardModalProps) => {
  const { close, isRejected, actorId } = props
  const { rejectActor, acceptActor } = useActorCardAction()

  const handleAcceptActor = async () => {
    await acceptActor(actorId)
    window.location.reload()
  }

  const handleRejectActor = async () => {
    await rejectActor(actorId)
    window.location.reload()
  }

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
          onClick={!isRejected ? handleAcceptActor : handleRejectActor}
        >
          ยืนยัน
        </Button>
      </ActionContainer>
    </BodyContentContainer>
  )
}

export default ActorCardModal
