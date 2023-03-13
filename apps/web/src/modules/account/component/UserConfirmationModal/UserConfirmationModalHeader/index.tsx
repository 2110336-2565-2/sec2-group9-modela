import { Typography } from '@mui/material'
import React from 'react'

import { HeaderContainer } from './styled'

const UserConfirmationCardHeader = () => {
  return (
    <HeaderContainer>
      <Typography variant="h5">ยืนยันการอนุมัติ</Typography>
    </HeaderContainer>
  )
}

export default UserConfirmationCardHeader
