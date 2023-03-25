import { NotificationType, UserType } from '@modela/dtos'
import { Link, Typography } from '@mui/material'
import React from 'react'

import { actorBodyMap, castingBodyMap } from './constants'
import { BodyContainer } from './styled'
import { BodyProps } from './types'

const NotiCardBody = (props: BodyProps) => {
  const {
    userType,
    type,
    firstName,
    middleName,
    lastName,
    title,
    reason,
    jobId,
    actorId,
  } = props
  return (
    <BodyContainer>
      <Typography variant="subtitle2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
        {userType === UserType.ACTOR
          ? actorBodyMap[type]
          : castingBodyMap[type]}
        {userType === UserType.CASTING &&
        (type === NotificationType.ACCEPT_OFFER ||
          type === NotificationType.REJECT_OFFER) ? (
          <Link href={'/profile/' + actorId} underline="none">
            {firstName + ' '}
            {middleName + ' '}
            {lastName}
          </Link>
        ) : userType === UserType.ACTOR &&
          type === NotificationType.APPROVE_REFUND ? (
          reason
        ) : (
          <Link href={'/job/' + jobId} underline="none">
            {title}
          </Link>
        )}
      </Typography>
    </BodyContainer>
  )
}
export default NotiCardBody
