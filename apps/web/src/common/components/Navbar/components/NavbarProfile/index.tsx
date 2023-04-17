/* eslint-disable @next/next/no-img-element */
import { Typography } from '@mui/material'
import ProfileImage from 'common/components/ProfileImage'
import { useUser } from 'common/context/UserContext'
import React from 'react'

import { ProfileContainer } from './styled'

const NavbarProfile = () => {
  const { user } = useUser()
  const {
    profileImageUrl,
    firstName,
    middleName,
    lastName,
    companyName,
    userId,
  } = user!

  return (
    <ProfileContainer>
      <ProfileImage
        src={profileImageUrl}
        firstName={firstName}
        userId={userId}
      />
      <div>
        <Typography variant="h6" color="#000000DF">
          คุณ{firstName} {middleName} {lastName}
        </Typography>
        {companyName && (
          <Typography
            variant="body2"
            color="#0000009A"
            sx={{ marginTop: '-3px' }}
          >
            {companyName}
          </Typography>
        )}
      </div>
    </ProfileContainer>
  )
}

export default NavbarProfile
