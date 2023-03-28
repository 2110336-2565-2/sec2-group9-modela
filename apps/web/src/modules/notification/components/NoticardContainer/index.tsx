import React from 'react'

import NotiCard from './components/NotiCard'
import { CardBoxContainer } from './styled'
import { NotiCardContainerProps } from './types'

const NotiCardContainer = (props: NotiCardContainerProps) => {
  const {
    notifications,
    userType,
    openAcceptModal,
    openRejectModal,
    setFocusId,
    setTitle,
  } = props
  return (
    <CardBoxContainer>
      {notifications?.map((item) => {
        return (
          <NotiCard
            openAcceptModal={openAcceptModal}
            openRejectModal={openRejectModal}
            setFocusId={setFocusId}
            setTitle={setTitle}
            key={item.notificationId}
            userType={userType}
            {...item}
          />
        )
      })}
    </CardBoxContainer>
  )
}

export default NotiCardContainer
