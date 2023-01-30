import { Typography } from '@mui/material'
import Image from 'next/image'
import dueCalendar from 'public/dueCalendar.png'
import female from 'public/female.png'
import money from 'public/money.png'
import React from 'react'

import { footerProps } from '../type'
import { FooterRow } from './styled'

export default function Footer(prop: footerProps) {
  const apply = () => {
    window.alert('applied')
  }

  return (
    <FooterRow>
      <Image src={female} height={18} alt="report" />
      <Typography variant="subtitle1">{prop.actorCount}</Typography>
      <Image src={money} height={18} alt="report" />
      <Typography variant="subtitle1">{prop.wage}</Typography>
      <Image src={dueCalendar} height={18} alt="report" />
      <Typography variant="subtitle1">{prop.dueDate.toDateString()}</Typography>

      <Typography
        variant="subtitle1"
        color="primary"
        style={{ cursor: 'pointer', marginLeft: 'auto' }}
        onClick={() => apply()}
      >
        สมัครงาน
      </Typography>
    </FooterRow>
  )
}
