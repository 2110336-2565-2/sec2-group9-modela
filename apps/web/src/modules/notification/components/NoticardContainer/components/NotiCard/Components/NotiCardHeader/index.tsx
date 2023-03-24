import { UserType } from '@modela/dtos'
import { Typography } from '@mui/material'
import { formatDate, formatTime } from 'common/utils/formatter'
import React from 'react'

import {
  actorHeaderMap,
  actorIconMap,
  castingHeaderMap,
  castingIconMap,
} from './constants'
import { HeaderContainer, IconContainer } from './styled'
import { HeaderProps } from './types'

const NotiCardHeader = (props: HeaderProps) => {
  const { type, jobTitle, companyName, timestamp, userType } = props
  return (
    <HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconContainer>
          {userType === UserType.ACTOR
            ? actorIconMap[type]
            : castingIconMap[type]}
        </IconContainer>
        <div>
          <Typography variant="h6">
            {userType === UserType.ACTOR
              ? actorHeaderMap[type]
              : castingHeaderMap[type]}
            {jobTitle}
          </Typography>
          <Typography variant="body1" fontWeight={400}>
            {companyName}
          </Typography>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <Typography variant="subtitle2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
          {formatDate(timestamp)}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ color: 'rgba(0, 0, 0, 0.6)', marginLeft: '5px' }}
        >
          {formatTime(timestamp)}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ color: 'rgba(0, 0, 0, 0.6)', marginLeft: '5px' }}
        >
          น.
        </Typography>
      </div>
    </HeaderContainer>
  )
}

export default NotiCardHeader
