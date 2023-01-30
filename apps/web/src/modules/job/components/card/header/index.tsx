import { Typography } from '@mui/material'
import Image from 'next/image'
import reportBtn from 'public/report.png'
import React from 'react'

import { headerProps } from '../type'
import { HeaderRow } from './styled'

export default function Header(prop: headerProps) {
  const report = () => {
    window.alert('reported')
  }

  return (
    <HeaderRow>
      <Image src={prop.castingImage} height={40} alt="casting pic" />
      <div>
        <Typography variant="h6">{prop.title}</Typography>
        <Typography>{prop.companyName}</Typography>
      </div>
      <Image
        src={reportBtn}
        height={18}
        alt="report"
        style={{ cursor: 'pointer', marginLeft: 'auto' }}
        onClick={() => report()}
      />
    </HeaderRow>
  )
}
