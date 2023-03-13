import { UserType } from '@modela/dtos'
import { CircularProgress, Typography } from '@mui/material'
import withGuard from 'common/hoc/withGuard'
import React from 'react'

import PendingUserCard from '../component/PendingUserCard'
import usePendingUserData from '../hooks/usePendingUserData'
import { CardsContainer } from './styled'

const PendingUserPage = () => {
  const {
    pendingUserData,
    rejectUser,
    acceptUser,
    setModalId,
    setModalReason,
  } = usePendingUserData()
  return (
    <CardsContainer>
      {pendingUserData ? (
        pendingUserData.length === 0 ? (
          <Typography variant="h4" color="#00000061">
            ไม่พบการขอสมัครเข้าสู่ระบบ
          </Typography>
        ) : (
          pendingUserData.map((user) => (
            <PendingUserCard
              key={user.data.userId}
              setReason={setModalReason}
              setId={setModalId}
              accept={acceptUser}
              reject={rejectUser}
              data={user}
            />
          ))
        )
      ) : (
        <CircularProgress />
      )}
    </CardsContainer>
  )
}

export default withGuard(PendingUserPage, 'verified', [UserType.ADMIN])
