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
    url,
    firstName,
    middleName,
    lastName,
    jobTitle,
    reason,
  } = props
  return (
    <BodyContainer>
      <Typography variant="subtitle2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
        {userType === UserType.ACTOR
          ? actorBodyMap[type]
          : castingBodyMap[type]}
        {userType === UserType.CASTING &&
        (type === NotificationType.ACCEPTOFFER ||
          type === NotificationType.REJECTOFFER) ? (
          <Link href={url} underline="none">
            {firstName + ' '}
            {middleName + ' '}
            {lastName}
          </Link>
        ) : userType === UserType.ACTOR &&
          type === NotificationType.APPROVEREFUND ? (
          reason
        ) : (
          <Link href={url} underline="none">
            {jobTitle}
          </Link>
        )}
      </Typography>
    </BodyContainer>
  )
}
export default NotiCardBody
