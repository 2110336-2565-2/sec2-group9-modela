import React from 'react'

import NotiCard from './components/NotiCard'
import { CardBoxContainer } from './styled'
import { NotiCardContainerProps } from './types'

const NotiCardContainer = (props: NotiCardContainerProps) => {
  const { noti, userType } = props
  return (
    <CardBoxContainer>
      {noti.map((item) => {
        return <NotiCard userType={userType} {...item} />
      })}
    </CardBoxContainer>
  )
}

export default NotiCardContainer
