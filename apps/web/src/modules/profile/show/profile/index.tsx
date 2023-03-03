import { UserType } from '@modela/dtos'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'
import React from 'react'

import ActorProfilePage from './pages/ActorProfilePage'
import CastingProfilePage from './pages/CastingProfilePage'

const ProfilePage = () => {
  const { user } = useUser()
  return (
    <>
      {user?.type === UserType.ACTOR && <CastingProfilePage />}
      {user?.type === UserType.CASTING && <ActorProfilePage />}
    </>
  )
}

export default withGuard(ProfilePage, 'verified', [
  UserType.CASTING,
  UserType.ACTOR,
])
