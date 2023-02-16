import { SentimentVeryDissatisfiedOutlined } from '@mui/icons-material'
import { Button, Theme, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

import { FallbackContainer } from './styled'

const FallbackPage = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <FallbackContainer>
      <Typography variant={isMobile ? 'h6' : 'h4'}>
        ขออภัย เราไม่พบหน้าที่คุณต้องการค้นหา
        <SentimentVeryDissatisfiedOutlined
          sx={{ transform: 'translateY(2px)', marginLeft: '5px' }}
        />
      </Typography>
      <Typography variant={isMobile ? 'subtitle1' : 'h6'} color="#0000009A">
        เกิดความผิดพลาดบางอย่าง หรือหน้าที่คุณต้องการค้นหาถูกลบ
      </Typography>
      <Button href="/" size="large" sx={{ marginTop: '50px' }}>
        กลับหน้าหลัก
      </Button>
    </FallbackContainer>
  )
}

export default FallbackPage
