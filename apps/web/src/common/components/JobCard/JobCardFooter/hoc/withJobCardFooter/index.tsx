import { Gender, JobStatus } from '@modela/dtos'
import { EventBusy, Money, Person } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'
import theme from 'common/config/theme'
import { genderTranslationMap } from 'common/types/gender'
import { formatDate } from 'common/utils/formatter'
import React from 'react'

import { FooterRow, SameDiv } from './styled'
import { WithJobCardFooterProps } from './types'

const withJobCardFooter = <T extends Record<string, any>>(
  WrappedComponent: React.ComponentType<T>,
) => {
  const WithJobCardFooter = (props: T & WithJobCardFooterProps) => {
    const { actorCount, wage, status, applicationDeadline, gender } = props

    const genderThai = genderTranslationMap[gender]

    return (
      <>
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
                      : gender === Gender.ANY
                      ? 'rgba(0, 0, 0, 0.6)'
                      : '#00c853',
                  fill:
                    gender === Gender.MALE ||
                    gender === Gender.FEMALE ||
                    gender === Gender.ANY
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
            <Typography variant="subtitle1">
              {formatDate(applicationDeadline)}
            </Typography>
          </SameDiv>
          <WrappedComponent {...props} />
        </FooterRow>
      </>
    )
  }
  return WithJobCardFooter
}

export default withJobCardFooter
