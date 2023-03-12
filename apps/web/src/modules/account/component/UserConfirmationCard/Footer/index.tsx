import { Button, Typography } from '@mui/material'
import React from 'react'

import { FooterContainer } from './styled'
import { footerProps } from './type'

const UserConfirmationCardFooter = (props: footerProps) => {
  return (
    <FooterContainer>
      <Button color="error" variant="contained" onClick={() => props.close()}>
        <Typography variant="button">ปฏิเสธ</Typography>
      </Button>
      <Button color="success" variant="contained" onClick={() => props.modal()}>
        <Typography variant="button">อนุมัติ</Typography>
      </Button>
    </FooterContainer>
  )
}

export default UserConfirmationCardFooter
