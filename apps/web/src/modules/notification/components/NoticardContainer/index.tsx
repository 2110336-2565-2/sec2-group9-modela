import React from 'react'

import NotiCard from './components/NotiCard'
import { NotiCardContainerProps } from './types'

const NotiCardContainer = (props: NotiCardContainerProps) => {
  const { noti, userType } = props
  return (
    <>
      {noti.map((item) => {
        return <NotiCard userType={userType} {...item} />
      })}
    </>
  )
}

export default NotiCardContainer
