import { Button, Typography } from '@mui/material'
import React from 'react'

import { FooterContainer } from './styled'

const PendingUserCardFooter = () => {
  return (
    <FooterContainer>
      <Button color="error">
        <Typography variant="button">ปฏิเสธ</Typography>
      </Button>
      <Button color="success">
        <Typography variant="button">อนุมัติ</Typography>
      </Button>
    </FooterContainer>
  )
}

export default PendingUserCardFooter
