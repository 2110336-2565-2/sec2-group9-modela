import React from 'react'

import NotiCard from './components/NotiCard'
import { NotiCardContainerProps } from './types'

const NotiCardContainer = (props: NotiCardContainerProps) => {
  const { noti } = props
  return (
    <>
      {noti.map((item) => {
        return <NotiCard {...item} />
      })}
    </>
  )
}

export default NotiCardContainer
