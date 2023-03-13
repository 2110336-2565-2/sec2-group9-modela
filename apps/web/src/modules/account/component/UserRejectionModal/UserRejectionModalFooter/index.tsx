import { Button, Typography } from '@mui/material'
import React from 'react'

import { FooterContainer } from './styled'
import { UserRejectionCardFooterProps } from './type'

const UserRejectionCardFooter = ({ reject }: UserRejectionCardFooterProps) => {
  return (
    <FooterContainer>
      <Button
        sx={{ borderRadius: 2 }}
        color="primary"
        variant="contained"
        onClick={reject}
      >
        <Typography variant="button">ยืนยัน</Typography>
      </Button>
    </FooterContainer>
  )
}

export default UserRejectionCardFooter
