import { Gender, JobStatus, UserType } from '@modela/dtos'
import { EventBusy, Money, Person } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'
import theme from 'common/config/theme'
import { useUser } from 'common/context/UserContext'
import { genderTranslationMap } from 'common/types/gender'
import { formatDate } from 'common/utils/formatter'
import React from 'react'

import { FooterRow, SameDiv } from './styled'
import { FooterProps } from './types'

const JobCardFooter = (prop: FooterProps) => {
  const { actorCount, wage, status, dueDate, gender } = prop
  const user = useUser()

  const apply = () => {
    window.alert('applied')
  }
  const genderThai = genderTranslationMap[gender]

  return (
    <FooterRow>
      <SameDiv>
        <Tooltip title={genderThai}>
          <Person
            fontSize="small"
            sx={{
              color:
                gender === Gender.MALE
                  ? '#144A9B'
                  : gender === Gender.FEMALE
                  ? '#F57CD4'
                  : '#00c853',
              fill:
                gender === Gender.MALE || gender === Gender.FEMALE
                  ? ''
                  : 'url(#linearColors)',
            }}
          />
        </Tooltip>
        <Typography variant="subtitle1">{actorCount}</Typography>
      </SameDiv>

      <SameDiv>
        <Money fontSize="small" />
        <Typography variant="subtitle1">{wage.toLocaleString()}</Typography>
      </SameDiv>

      <SameDiv>
        <EventBusy
          fontSize="small"
          sx={{
            color:
              status == JobStatus.OPEN
                ? theme.palette.success.main
                : theme.palette.error.main,
          }}
        />
        <Typography variant="subtitle1">{formatDate(dueDate)}</Typography>
      </SameDiv>

      <svg width={0} height={0}>
        <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
          <stop offset={0} stopColor="#ff0000" />
          <stop offset={0.17} stopColor="#ff7f00" />
          <stop offset={0.33} stopColor="#ffff00" />
          <stop offset={0.5} stopColor="#00ff00" />
          <stop offset={0.67} stopColor="#00ffff" />
          <stop offset={0.83} stopColor="#0000ff" />
          <stop offset={1} stopColor="#ff00ff" />
        </linearGradient>
      </svg>

      {status === JobStatus.OPEN && user?.type === UserType.ACTOR && (
        <Typography
          variant="subtitle1"
          color="primary"
          sx={{ cursor: 'pointer', marginLeft: 'auto' }}
          onClick={() => apply()}
        >
          สมัครงาน
        </Typography>
      )}
    </FooterRow>
  )
}

export default JobCardFooter
