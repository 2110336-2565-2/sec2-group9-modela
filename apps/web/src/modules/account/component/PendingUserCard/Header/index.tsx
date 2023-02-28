import { PendingUserDto } from '@modela/dtos'
import { Typography } from '@mui/material'
import Chip from 'common/components/Chip'
import ProfileImage from 'common/components/ProfileImage'
import React from 'react'

import { CHIP_VARIANTS } from './constants'
import { HeaderContainer } from './styled'

const ActorCardHeader = (props: PendingUserDto) => {
  const { userId, firstName, middleName, lastName, companyName } = props.data
  return (
    <HeaderContainer>
      <ProfileImage
        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpopcat.click%2F&psig=AOvVaw1ZkRdtSjY5LhWrp2kWtUh2&ust=1677298747352000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJCo1vKmrf0CFQAAAAAdAAAAABAE"
        userId={userId}
        firstName={firstName}
        sx={{
          width: '40px',
          height: '40px',
        }}
      />
      <div>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {firstName} {middleName} {lastName}
        </Typography>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          {companyName}
        </Typography>
      </div>
      <Chip {...CHIP_VARIANTS[props.type]!} />
    </HeaderContainer>
  )
}

export default ActorCardHeader
