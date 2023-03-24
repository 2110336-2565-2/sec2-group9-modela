import React from 'react'

import NotiCardHeader from './Components/NotiCardHeader'
import { CardBox } from './styled'
import { NotiCardPropsWithUserType } from './types'

const NotiCard = (props: NotiCardPropsWithUserType) => {
  const { type, jobTitle, companyName, timestamp, userType } = props
  return (
    <CardBox>
      <NotiCardHeader
        userType={userType}
        type={type}
        jobTitle={jobTitle}
        companyName={companyName}
        timestamp={timestamp}
      />
    </CardBox>
  )
}

export default NotiCard
