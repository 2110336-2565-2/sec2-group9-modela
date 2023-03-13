import { Button, Typography } from '@mui/material'
import React from 'react'

import { FooterContainer } from './styled'
import { footerProps } from './type'

const UserRejectionCardFooter = (props: footerProps) => {
  return (
    <FooterContainer>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          props.reject()
        }}
      >
        <Typography variant="button">ยืนยัน</Typography>
      </Button>
    </FooterContainer>
  )
}

export default UserRejectionCardFooter
