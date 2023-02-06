import { EventBusy, Money, PersonOutlined } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'
import theme from 'common/config/theme'
import { useUser } from 'common/context/UserContext'
import { genderTranslationMap } from 'common/types/gender'
import { formatDate } from 'common/utils/formatter'
import React from 'react'

import { FooterRow } from './styled'
import { FooterProps } from './type'

const JobCardFooter = (prop: FooterProps) => {
  const { actorCount, wage, status, dueDate, gender } = prop
  const user = useUser()

  const apply = () => {
    window.alert('applied')
  }
  const genderThai = genderTranslationMap[gender]

  return (
    <FooterRow>
      {/* TODO: change icon color according to gender */}
      <Tooltip title={genderThai}>
        <PersonOutlined fontSize="small" />
      </Tooltip>
      <Typography variant="subtitle1">{actorCount}</Typography>
      <Money fontSize="small" />
      <Typography variant="subtitle1">{wage.toLocaleString()}</Typography>
      <EventBusy
        fontSize="small"
        sx={{
          color:
            status == 'OPEN'
              ? theme.palette.success.main
              : theme.palette.error.main,
        }}
      />
      <Typography variant="subtitle1">{formatDate(dueDate)}</Typography>

      {status == 'OPEN' && user?.type == 'ACTOR' && (
        <Typography
          variant="subtitle1"
          color="primary"
          style={{ cursor: 'pointer', marginLeft: 'auto' }}
          onClick={() => apply()}
        >
          สมัครงาน
        </Typography>
      )}
    </FooterRow>
  )
}

export default JobCardFooter
