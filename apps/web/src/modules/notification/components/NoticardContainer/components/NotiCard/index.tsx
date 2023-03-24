import { NotificationType, UserType } from '@modela/dtos'
import React from 'react'

import NotiCardBody from './Components/NotiCardBody'
import NotiCardFooter from './Components/NotiCardFooter'
import NotiCardHeader from './Components/NotiCardHeader'
import { CardBox } from './styled'
import { NotiCardPropsWithUserType } from './types'

const NotiCard = (props: NotiCardPropsWithUserType) => {
  const { type, job, timestamp, userType, reason, url, actor } = props
  return (
    <CardBox>
      <NotiCardHeader
        userType={userType}
        type={type}
        timestamp={timestamp}
        {...actor}
        {...job}
      />
      {type !== NotificationType.CANCELJOB && (
        <NotiCardBody
          type={type}
          userType={userType}
          reason={reason}
          url={url}
          jobTitle={job?.jobTitle}
          {...actor}
        />
      )}
      {userType === UserType.ACTOR &&
        type === NotificationType.RECEIVEOFFER && (
          <NotiCardFooter jobId={job?.jobId} />
        )}
    </CardBox>
  )
}

export default NotiCard
