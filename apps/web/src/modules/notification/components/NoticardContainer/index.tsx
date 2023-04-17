import { Typography } from '@mui/material'
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
    maxPage,
  } = props
  return (
    <CardBoxContainer>
      {maxPage === 0 && (
        <Typography
          variant="subtitle1"
          sx={{
            width: '100%',
            textAlign: 'center',
            color: 'rgba(0, 0, 0, 0.38)',
            paddingBottom: '12px',
          }}
        >
          {'ไม่มีการแจ้งเตือน'}
        </Typography>
      )}
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
