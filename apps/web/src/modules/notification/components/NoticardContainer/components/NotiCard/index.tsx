import React from 'react'

import NotiCardBody from './Components/NotiCardBody'
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
      <NotiCardBody
        type={type}
        userType={userType}
        reason={reason}
        url={url}
        jobTitle={job?.jobTitle}
        {...actor}
      />
    </CardBox>
  )
}

export default NotiCard
