import { Button, Typography } from '@mui/material'
import React from 'react'

import { FooterContainer } from './styled'
import { UserConfirmationCardFooterProps } from './type'

const UserConfirmationCardFooter = ({
  close,
  confirm,
}: UserConfirmationCardFooterProps) => {
  return (
    <FooterContainer>
      <Button
        sx={{ backgroundColor: '#AA5B5B', borderRadius: 2 }}
        variant="contained"
        onClick={close}
      >
        <Typography variant="button">ปฏิเสธ</Typography>
      </Button>
      <Button
        sx={{ backgroundColor: '#66A373', borderRadius: 2 }}
        variant="contained"
        onClick={confirm}
      >
        <Typography variant="button">อนุมัติ</Typography>
      </Button>
    </FooterContainer>
  )
}

export default UserConfirmationCardFooter
