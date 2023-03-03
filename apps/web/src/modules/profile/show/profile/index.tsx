import { UserType } from '@modela/dtos'
import { CircularProgress } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'
import React from 'react'

import ActorProfileInfo from '../components/ActorProfileInfo'
import CastingProfileInfo from '../components/CastingProfileInfo'
import useActorProfile from './hooks/useActorProfile'
import { CardContainer, RootContainer } from './styled'

const ViewActorProfile = () => {
  const { profile, isOpen, type, userId } = useActorProfile()
  const { user } = useUser()
  return (
    <RootContainer>
      <CardContainer variant="outlined">
        {isOpen ? (
          <CircularProgress />
        ) : (
          <>
            {type === UserType.ACTOR && (
              <ActorProfileInfo
                isOwn={false}
                {...user}
                {...profile}
                userId={parseInt(userId as string, 10)}
              />
            )}
            {type === UserType.CASTING && (
              <CastingProfileInfo
                isOwn={false}
                {...user}
                {...profile}
                userId={parseInt(userId as string, 10)}
              />
            )}
          </>
        )}
      </CardContainer>
    </RootContainer>
  )
}

export default withGuard(ViewActorProfile, 'verified', [
  UserType.CASTING,
  UserType.ACTOR,
])
