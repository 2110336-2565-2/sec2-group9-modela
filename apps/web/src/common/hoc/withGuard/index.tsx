import { UserStatus } from '@modela/database'
import { UserType } from '@modela/dtos'
import { useUser } from 'common/context/UserContext'
import { useRouter } from 'next/router'
import React from 'react'

import { GuardType } from './types'

const withGuard = (
  WrappedComponent: React.ComponentType,
  guardType: GuardType,
  allowedType?: UserType[],
) => {
  const WithGuard = (props: any) => {
    const { user } = useUser()
    const router = useRouter()

    if (!user && guardType !== 'notLoggedIn') {
      router.replace('/login')
      return null
    }

    if (user && user.status === UserStatus.PENDING && guardType !== 'pending') {
      router.replace('/waiting')
      return null
    }

    if (
      user &&
      user.status === UserStatus.REJECTED &&
      guardType !== 'rejected'
    ) {
      router.replace('/rejected')
      return null
    }

    if (
      user &&
      user.status === UserStatus.ACCEPTED &&
      guardType !== 'verified'
    ) {
      router.replace('/job')
      return null
    }

    if (user && allowedType && !allowedType.includes(user.type)) {
      router.replace('/')
      return null
    }

    return <WrappedComponent {...props} />
  }

  return WithGuard
}

export default withGuard
