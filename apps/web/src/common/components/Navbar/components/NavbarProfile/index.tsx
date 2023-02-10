/* eslint-disable @next/next/no-img-element */
import { Typography } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import React from 'react'

import { ProfileContainer } from './styled'

const NavbarProfile = () => {
  const { user } = useUser()
  const { profileImageUrl, firstName, middleName, lastName, companyName } =
    user!

  return (
    <ProfileContainer>
      <img
        src={profileImageUrl}
        alt="profile image"
        style={{
          width: '40px',
          height: '40px',
          objectFit: 'cover',
          borderRadius: '50%',
        }}
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
