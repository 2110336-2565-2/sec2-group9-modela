import { Button, Typography } from '@mui/material'
import React from 'react'

import { FooterContainer } from './styled'
import { UserConfirmationModalFooterProps } from './type'

const UserConfirmationModalFooter = ({
  close,
  confirm,
}: UserConfirmationModalFooterProps) => {
  return (
    <FooterContainer>
      <Button
        sx={{ borderRadius: 2 }}
        color="reject"
        variant="contained"
        onClick={close}
      >
        <Typography variant="button">ปฏิเสธ</Typography>
      </Button>
      <Button
        sx={{ borderRadius: 2 }}
        color="success"
        variant="contained"
        onClick={confirm}
      >
        <Typography variant="button">อนุมัติ</Typography>
      </Button>
    </FooterContainer>
  )
}

export default UserConfirmationModalFooter
