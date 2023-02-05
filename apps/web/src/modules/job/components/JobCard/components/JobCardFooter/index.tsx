import { EventBusy, Money, PersonOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import theme from 'common/config/theme'
import { formatDate } from 'common/utils/formatter'
import React from 'react'

import { FooterRow } from './styled'
import { FooterProps } from './type'

const JobCardFooter = (prop: FooterProps) => {
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
      <Typography variant="subtitle1">{wage.toLocaleString()}</Typography>
      <EventBusy fontSize="small" sx={{ color: theme.palette.success.main }} />
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

export default JobCardFooter
