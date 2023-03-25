import { Button, Divider, Typography } from '@mui/material'
import Link from 'next/link'

import { BodyContentContainer } from './styled'
import { SendResultModalBodyProps } from './types'

const SendResultModalBody = (props: SendResultModalBodyProps) => {
  const { jobId } = props
  return (
    <BodyContentContainer>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        ส่งหลักฐานการชำระเงินเสร็จสิ้น
      </Typography>
      <Divider />
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        หลักฐานของคุณกำลังถูกตรวจสอบ กรุณารอการแจ้งเตือนจากแอดมิน
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ borderRadius: '12px', margin: 'auto' }}
      >
        <Link
          href={`/job/${jobId}/actor`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          ตกลง
        </Link>
      </Button>
    </BodyContentContainer>
  )
}

export default SendResultModalBody
