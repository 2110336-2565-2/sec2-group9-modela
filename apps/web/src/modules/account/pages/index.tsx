import { CircularProgress, Typography } from '@mui/material'
import React from 'react'

import PendingUserCard from '../component/PendingUserCard/Body'
import usePendingUserData from '../hooks/usePendingUserData'
import { CardsContainer } from './styled'

const PendingUserPage = () => {
  const pendingUserData = usePendingUserData()
  return (
    <CardsContainer>
      {pendingUserData ? (
        pendingUserData.length === 0 ? (
          <Typography color="#00000061">ไม่พบการขอสมัครเข้าสู่ระบบ</Typography>
        ) : (
          pendingUserData.map((user) => (
            <PendingUserCard type={user.type} data={user.data} />
          ))
        )
      ) : (
        <CircularProgress />
      )}
    </CardsContainer>
  )
}

export default PendingUserPage
