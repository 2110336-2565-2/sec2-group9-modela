import {
  GetActorProfileDto,
  GetCastingProfileDto,
  UserType,
} from '@modela/dtos'
import { CircularProgress } from '@mui/material'
import withGuard from 'common/hoc/withGuard'
import React from 'react'

import useProfile from './hooks/useProfile'
import ActorProfilePage from './pages/ActorProfilePage'
import CastingProfilePage from './pages/CastingProfilePage'

const ProfilePage = () => {
  const { isOpen, profile, type, userId } = useProfile()
  return (
    <>
      {isOpen ? (
        <CircularProgress sx={{ margin: '32px 16px' }} />
      ) : (
        <>
          {type === UserType.ACTOR && (
            <CastingProfilePage
              userId={+userId}
              profile={profile as GetCastingProfileDto}
            />
          )}
          {type === UserType.CASTING && (
            <ActorProfilePage
              userId={+userId}
              profile={profile as GetActorProfileDto}
            />
          )}
        </>
      )}
    </>
  )
}

export default withGuard(ProfilePage, 'verified')
