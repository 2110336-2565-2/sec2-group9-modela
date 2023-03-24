import { NotificationType, UserType } from '@modela/dtos'
import { Link, Typography } from '@mui/material'
import React from 'react'

import { actorBodyMap, castingBodyMap } from './constants'
import { BodyContainer } from './styled'
import { BodyProps } from './types'

const NotiCardBody = (props: BodyProps) => {
  const { userType, type, url, firstName, middleName, lastName, jobTitle } =
    props
  const textMap =
    userType === UserType.ACTOR ? actorBodyMap[type] : castingBodyMap[type]
  return (
    <BodyContainer>
      <Typography variant="subtitle2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
        {textMap}
        {textMap === castingBodyMap[NotificationType.ACCEPTOFFER] ? (
          <Link href={url} underline="none">
            {firstName + ' '}
            {middleName + ' '}
            {lastName}
          </Link>
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
