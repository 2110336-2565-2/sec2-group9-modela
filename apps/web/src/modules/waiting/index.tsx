import { Typography } from '@mui/material'

import { CardContainer, CardDivider, RootContainer } from './styled'

const Waiting = () => {
  return (
    <RootContainer>
      <Typography color="primary" variant="h3">
        Modela
      </Typography>
      <CardContainer>
        <Typography variant="h5">สมัครสมาชิกเสร็จสิ้น</Typography>
        <CardDivider />
        <Typography lineHeight={1.5} variant="subtitle1">
          ขณะนี้แอดมินกำลังตรวจสอบความถูกต้องของข้อมูลของคุณ กรุณาลองใหม่ภายหลัง
        </Typography>
      </CardContainer>
    </RootContainer>
  )
}

export default Waiting
