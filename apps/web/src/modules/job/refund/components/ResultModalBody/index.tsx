import { Button, Divider, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { ContentContainer, RootContainer } from './styled'
import { ResultModalBodyProps } from './types'

const ResultModalBody = (props: ResultModalBodyProps) => {
  const router = useRouter()
  const handleConfirm = () => {
    router.replace(`/job/${props.jobId}/actor`)
  }

  return (
    <RootContainer>
      <ContentContainer>
        <Typography variant="h5">ส่งคำขอเงินคืนเสร็จสิ้น</Typography>
        <Divider sx={{ width: '100%' }} />
        <Typography variant="subtitle1" textAlign="center">
          หลักฐานของคุณกำลังถูกตรวจสอบ กรุณารอการแจ้งเตือนจากแอดมิน
        </Typography>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="primary"
          sx={{ borderRadius: '12px' }}
        >
          ยืนยัน
        </Button>
      </ContentContainer>
    </RootContainer>
  )
}

export default ResultModalBody
