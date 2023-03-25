import React from 'react'

import NotiCard from './components/NotiCard'
import { CardBoxContainer } from './styled'
import { NotiCardContainerProps } from './types'

const NotiCardContainer = (props: NotiCardContainerProps) => {
  const { notifications, userType } = props
  return (
    <CardBoxContainer>
      {notifications?.map((item, index) => {
        return <NotiCard key={index} userType={userType} {...item} />
      })}
    </CardBoxContainer>
  )
}

export default NotiCardContainer
