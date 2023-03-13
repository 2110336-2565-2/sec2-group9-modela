import { Typography } from '@mui/material'
import React from 'react'

import { HeaderContainer } from './styled'

const UserRejectionModalHeader = () => {
  return (
    <HeaderContainer>
      <Typography variant="h5">เหตุผลในการปฏิเสธ</Typography>
    </HeaderContainer>
  )
}

export default UserRejectionModalHeader
