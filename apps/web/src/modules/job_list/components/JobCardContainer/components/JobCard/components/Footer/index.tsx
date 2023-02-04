import { EventBusy, Money, PersonOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { formatDate } from 'common/utils/formatter'
import React from 'react'

import { FooterRow } from './styled'
import { FooterProps } from './type'

export default function Footer(prop: FooterProps) {
  const { actorCount, wage, dueDate } = prop

  const apply = () => {
    window.alert('applied')
  }

  return (
    <FooterRow>
      {/* TODO: change icon color according to gender */}
      <PersonOutlined fontSize="small" />
      <Typography variant="subtitle1">{actorCount}</Typography>
      <Money fontSize="small" />
      <Typography variant="subtitle1">{wage}</Typography>
      <EventBusy fontSize="small" color="success" />
      <Typography variant="subtitle1">{formatDate(dueDate)}</Typography>

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
