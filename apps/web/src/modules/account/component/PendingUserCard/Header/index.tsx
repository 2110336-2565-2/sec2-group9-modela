import { PendingUserDto } from '@modela/dtos'
import { Typography } from '@mui/material'
import Chip from 'common/components/Chip'
import ProfileImage from 'common/components/ProfileImage'
import React from 'react'

import { CHIP_VARIANTS } from './constants'
import { HeaderContainer } from './styled'

const PendingUserCardHeader = (props: PendingUserDto) => {
  const { userId, firstName, middleName, lastName, companyName } = props.data
  return (
    <HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ProfileImage
          userId={userId}
          firstName={firstName}
          sx={{
            width: '40px',
            height: '40px',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginLeft: '16px',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6">
            {firstName} {middleName} {lastName}
          </Typography>
          {props.type === 'CASTING' && (
            <Typography variant="body1">{companyName}</Typography>
          )}
        </div>
      </div>
      <Chip {...CHIP_VARIANTS[props.type]!} />
    </HeaderContainer>
  )
}

export default PendingUserCardHeader
