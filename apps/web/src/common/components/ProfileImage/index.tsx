import { Typography } from '@mui/material'
import React from 'react'

import { ProfileImageContainer } from './styled'
import { ProfileImageProps } from './types'
import { getRandomColor } from './utils/getRandomColor'

const ProfileImage = ({ src, userId, firstName, sx }: ProfileImageProps) => {
  const backgroundColor = getRandomColor(userId)

  return (
    <ProfileImageContainer sx={{ backgroundColor, ...sx }}>
      {src ? (
        // will change to next image after task 64, 65 is done
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="profile-image"
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <Typography color="white" variant="h6">
          {firstName[0].toUpperCase()}
        </Typography>
      )}
    </ProfileImageContainer>
  )
}

export default ProfileImage
