import { ActorDto } from '@modela/dtos'
import { Typography } from '@mui/material'
import Chip from 'common/components/Chip'
import ProfileImage from 'common/components/ProfileImage'
import React from 'react'

import { CHIP_VARINTS } from './constants'
import { HeaderContainer } from './styled'

const ActorCardHeader = (
  props: Omit<ActorDto, 'resumeUrl' | 'applicationId'>,
) => {
  const { firstName, middleName, lastName, profileImageUrl, actorId, status } =
    props
  return (
    <HeaderContainer>
      <ProfileImage
        src={profileImageUrl}
        userId={actorId}
        firstName={firstName}
        sx={{
          width: '40px',
          height: '40px',
        }}
      />
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {firstName} {middleName} {lastName}
      </Typography>
      <Chip {...CHIP_VARINTS[status!]} />
    </HeaderContainer>
  )
}

export default ActorCardHeader
