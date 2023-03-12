import { Button, Typography } from '@mui/material'
import React from 'react'

import { FooterContainer } from './styled'

const UserConfirmationCardFooter = () => {
  return (
    <FooterContainer>
      <Button color="error" variant="contained">
        <Typography variant="button">ปฏิเสธ</Typography>
      </Button>
      <Button color="success" variant="contained">
        <Typography variant="button">อนุมัติ</Typography>
      </Button>
    </FooterContainer>
  )
}

export default UserConfirmationCardFooter
