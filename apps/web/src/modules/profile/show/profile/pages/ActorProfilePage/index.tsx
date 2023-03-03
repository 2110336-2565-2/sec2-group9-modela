import { UserType } from '@modela/dtos'
import { CircularProgress } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'
import ActorProfileInfo from 'modules/profile/show/components/ActorProfileInfo'
import React from 'react'

import useActorProfile from './hooks/useActorProfile'
import { CardContainer, RootContainer } from './styled'

const ViewActorProfile = () => {
  const { profile, isOpen, userId } = useActorProfile()
  const { user } = useUser()
  return (
    <RootContainer>
      <CardContainer variant="outlined">
        {isOpen ? (
          <CircularProgress />
        ) : (
          <>
            <ActorProfileInfo
              isOwn={false}
              {...user}
              {...profile}
              userId={parseInt(userId as string, 10)}
            />
          </>
        )}
      </CardContainer>
    </RootContainer>
  )
}

export default withGuard(ViewActorProfile, 'verified', [UserType.CASTING])
