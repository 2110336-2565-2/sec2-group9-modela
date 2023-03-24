import React from 'react'

import NotiCardHeader from './Components/NotiCardHeader'
import { CardBox } from './styled'
import { NotiCardProps } from './types'

const NotiCard = (props: NotiCardProps) => {
  const { type, jobTitle, companyName, timestamp } = props
  return (
    <CardBox>
      <NotiCardHeader
        type={type}
        jobTitle={jobTitle}
        companyName={companyName}
        timestamp={timestamp}
      />
    </CardBox>
  )
}

export default NotiCard
