import { UserType } from '@modela/dtos'
import { CircularProgress, Typography } from '@mui/material'
import withGuard from 'common/hoc/withGuard'
import useNavbarFocus from 'common/hooks/useNavbarFocus'
import React from 'react'

import PendingUserCard from '../component/PendingUserCard'
import usePendingUserData from '../hooks/usePendingUserData'
import { CardsContainer } from './styled'

const PendingUserPage = () => {
  const { pendingUserData, ...cardFunction } = usePendingUserData()
  useNavbarFocus('account')
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
              data={user}
              {...cardFunction}
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
