import { Button, Typography } from '@mui/material'
import React from 'react'

import { FooterContainer } from './styled'

const UserRejectionCardFooter = () => {
  return (
    <FooterContainer>
      <Button color="primary" variant="contained">
        <Typography variant="button">ยืนยัน</Typography>
      </Button>
    </FooterContainer>
  )
}

export default UserRejectionCardFooter
