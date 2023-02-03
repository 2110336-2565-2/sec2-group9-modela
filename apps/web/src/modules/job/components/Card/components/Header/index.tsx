import { ReportOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

import { HeaderRow } from './styled'
import { HeaderProps } from './type'

export default function Header(prop: HeaderProps) {
  const { castingImage, companyName, title } = prop

  const report = () => {
    window.alert('reported')
  }

  return (
    <HeaderRow>
      <Image
        loader={() => castingImage}
        src={castingImage}
        height={40}
        width={40}
        alt="casting pic"
      />
      <div>
        <Typography variant="h6">{title}</Typography>
        <Typography>{companyName}</Typography>
      </div>
      <ReportOutlined
        fontSize="small"
        color="error"
        style={{ cursor: 'pointer', marginLeft: 'auto' }}
        onClick={() => report()}
      />
    </HeaderRow>
  )
}
