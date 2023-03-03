import { UserType } from '@modela/dtos'
import { CircularProgress } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'
import React from 'react'

import ProfileInfo from '../components/ActorProfileInfo'
import useActorProfile from './hooks/useActorProfile'
import { CardContainer, RootContainer } from './styled'

const ViewActorProfile = () => {
  const { profile, isOpen } = useActorProfile()
  const { user } = useUser()
  return (
    <RootContainer>
      <CardContainer variant="outlined">
        {isOpen ? (
          <CircularProgress />
        ) : (
          <ProfileInfo isOwn={false} {...user} {...profile} />
        )}
      </CardContainer>
    </RootContainer>
  )
}

export default withGuard(ViewActorProfile, 'verified', [UserType.CASTING])
