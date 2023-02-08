import { Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

import { HeaderRow } from './styled'
import { HeaderProps } from './type'

export default function Header(prop: HeaderProps) {
  const { castingImage, companyName, title } = prop

  return (
    <HeaderRow>
      <Image src={castingImage} height={40} width={40} alt="casting pic" />
      <div>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">{companyName}</Typography>
      </div>
    </HeaderRow>
  )
}
