import EventBusyIcon from '@mui/icons-material/EventBusy'
import MoneyIcon from '@mui/icons-material/Money'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import { Typography } from '@mui/material'
import { formatDate } from 'common/utils/formatter'
import React from 'react'

import { footerProps } from '../type'
import { FooterRow } from './styled'

export default function Footer(prop: footerProps) {
  const apply = () => {
    window.alert('applied')
  }

  return (
    <FooterRow>
      {/* TODO: change icon color according to gender */}
      <PersonOutlinedIcon fontSize="small" />
      <Typography variant="subtitle1">{prop.actorCount}</Typography>
      <MoneyIcon fontSize="small" />
      <Typography variant="subtitle1">{prop.wage}</Typography>
      <EventBusyIcon fontSize="small" color="success" />
      <Typography variant="subtitle1">{formatDate(prop.dueDate)}</Typography>

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
