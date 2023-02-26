import { Typography } from '@mui/material'
import ProfileImage from 'common/components/ProfileImage'
import React from 'react'

import { HeaderRow } from './styled'
import { HeaderProps } from './types'

export default function Header(prop: HeaderProps) {
  const { castingImage, companyName, title } = prop

  return (
    <HeaderRow>
      <ProfileImage src={castingImage} firstName="HelloWorld" userId={123} />
      <div>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">{companyName}</Typography>
      </div>
    </HeaderRow>
  )
}
