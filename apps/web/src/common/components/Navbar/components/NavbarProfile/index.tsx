/* eslint-disable @next/next/no-img-element */
import { Typography } from '@mui/material'
import React from 'react'

import { ProfileContainer } from './styled'

const NavbarProfile = () => {
  return (
    <ProfileContainer>
      <img
        src="https://genshin.honeyhunterworld.com/img/ayaka_002.webp"
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
          คุณนพัด โกสิยากอน
        </Typography>
        <Typography variant="body2" color="#0000009A">
          บริษัทพี
        </Typography>
      </div>
    </ProfileContainer>
  )
}

export default NavbarProfile
