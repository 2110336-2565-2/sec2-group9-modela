import { UserType } from '@modela/dtos'
import { CircularProgress } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'
import CastingProfileInfo from 'modules/profile/show/components/CastingProfileInfo'
import React from 'react'

import useCastingProfile from './hooks/useCastingProfile'
import { CardContainer, RootContainer } from './styled'

const ViewCastingProfile = () => {
  const { profile, isOpen, userId } = useCastingProfile()
  const { user } = useUser()
  return (
    <RootContainer>
      <CardContainer variant="outlined">
        {isOpen ? (
          <CircularProgress />
        ) : (
          <>
            <CastingProfileInfo
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

export default withGuard(ViewCastingProfile, 'verified', [UserType.ACTOR])
