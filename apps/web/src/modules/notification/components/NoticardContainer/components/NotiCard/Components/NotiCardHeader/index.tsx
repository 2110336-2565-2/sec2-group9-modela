import { NotificationType, UserType } from '@modela/dtos'
import { Typography } from '@mui/material'
import { formatDate, formatTime } from 'common/utils/formatter'
import React from 'react'

import {
  ACTOR_HEADER_MAP,
  ACTOR_ICON_MAP,
  CASTING_HEADER_MAP,
  CASTING_ICON_MAP,
} from './constants'
import { HeaderContainer, IconContainer } from './styled'
import { HeaderProps } from './types'

const NotiCardHeader = (props: HeaderProps) => {
  const {
    type,
    title,
    companyName,
    timestamp,
    userType,
    firstName,
    middleName,
    lastName,
  } = props
  const isCastingRefund =
    userType === UserType.CASTING &&
    (type === NotificationType.APPROVE_REFUND ||
      type === NotificationType.REJECT_REFUND)
  return (
    <HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconContainer>
          {userType === UserType.ACTOR
            ? ACTOR_ICON_MAP[type]
            : CASTING_ICON_MAP[type]}
        </IconContainer>
        <div>
          <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>
            {userType === UserType.ACTOR
              ? ACTOR_HEADER_MAP[type]
              : CASTING_HEADER_MAP[type]}
            {isCastingRefund
              ? firstName + ' ' + middleName + ' ' + lastName
              : title}
          </Typography>
          <Typography variant="body1" fontWeight={400}>
            {isCastingRefund ? '' : companyName}
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
