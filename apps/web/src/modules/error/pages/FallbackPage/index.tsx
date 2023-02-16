import { SentimentVeryDissatisfiedOutlined } from '@mui/icons-material'
import { Button, Theme, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

const FallbackPage = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        gap: '10px',
      }}
    >
      <Typography variant={isMobile ? 'h6' : 'h4'}>
        ขออภัย เราไม่พบหน้าที่คุณต้องการค้นหา
        <SentimentVeryDissatisfiedOutlined
          style={{ transform: 'translateY(2px)', marginLeft: '5px' }}
        />
      </Typography>
      <Typography variant={isMobile ? 'subtitle1' : 'h6'} color="#0000009A">
        เกิดความผิดพลาดบางอย่าง หรือหน้าที่คุณต้องการค้นหาถูกลบ
      </Typography>
      <Button href="/" size="large" sx={{ marginTop: '50px' }}>
        กลับหน้าหลัก
      </Button>
    </div>
  )
}

export default FallbackPage
