import { NotificationType, UserType } from '@modela/dtos'
import { Link, Typography } from '@mui/material'
import React from 'react'

import { ACTOR_BODY_MAP, CASTING_BODY_MAP } from './constants'
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
  const isCastingOffer =
    userType === UserType.CASTING &&
    (type === NotificationType.ACCEPT_OFFER ||
      type === NotificationType.REJECT_OFFER)
  const isActorRefund =
    userType === UserType.ACTOR && type === NotificationType.APPROVE_REFUND
  return (
    <BodyContainer>
      <Typography variant="subtitle2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
        {userType === UserType.ACTOR
          ? ACTOR_BODY_MAP[type]
          : CASTING_BODY_MAP[type]}
        {isCastingOffer ? (
          <Link href={`/profile/${actorId}`} underline="none">
            {firstName + ' '}
            {middleName + ' '}
            {lastName}
          </Link>
        ) : isActorRefund ? (
          reason
        ) : (
          <Link href={`/job/${jobId}`} underline="none">
            {title}
          </Link>
        )}
      </Typography>
    </BodyContainer>
  )
}
export default NotiCardBody
