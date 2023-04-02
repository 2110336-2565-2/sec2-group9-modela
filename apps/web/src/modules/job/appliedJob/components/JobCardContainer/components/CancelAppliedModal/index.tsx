import { Button, Divider, Typography } from '@mui/material'

import useCancelAppliedJob from './hooks/useCancelAppliedJob'
import { ActionContainer, BodyContentContainer } from './styled'
import { ActorCardModalProps } from './types'

const CancelAppliedModal = (props: ActorCardModalProps) => {
  const { close, jobId } = props
  const { cancelAppliedJob } = useCancelAppliedJob()

  return (
    <BodyContentContainer>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        ยกเลิกการสมัครงาน
      </Typography>
      <Divider />
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        คุณต้องการยกเลิกการสมัครงานนี้หรือไม่
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
          onClick={() => cancelAppliedJob(jobId)}
        >
          ยืนยัน
        </Button>
      </ActionContainer>
    </BodyContentContainer>
  )
}

export default CancelAppliedModal
