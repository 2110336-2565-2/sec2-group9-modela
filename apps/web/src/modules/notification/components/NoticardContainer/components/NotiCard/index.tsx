import { NotificationType, UserType } from '@modela/dtos'
import React from 'react'

import NotiCardBody from './Components/NotiCardBody'
import NotiCardFooter from './Components/NotiCardFooter'
import NotiCardHeader from './Components/NotiCardHeader'
import { CardBox } from './styled'
import { NotiCardPropsWithUserType } from './types'

const NotiCard = (props: NotiCardPropsWithUserType) => {
  const { type, job, createdAt, userType, reason, actor } = props
  return (
    <CardBox>
      <NotiCardHeader
        userType={userType}
        type={type}
        timestamp={createdAt}
        {...actor}
        {...job}
      />
      {type !== NotificationType.CANCEL_JOB && (
        <NotiCardBody
          type={type}
          userType={userType}
          reason={reason}
          url={'SSS'}
          title={job?.title}
          {...actor}
        />
      )}
      {userType === UserType.ACTOR &&
        type === NotificationType.RECEIVE_OFFER && (
          <NotiCardFooter jobId={job?.jobId} />
        )}
    </CardBox>
  )
}

export default NotiCard
