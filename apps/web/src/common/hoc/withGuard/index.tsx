import { UserStatus } from '@modela/database'
import { UserType } from '@modela/dtos'
import { useUser } from 'common/context/UserContext'
import { useRouter } from 'next/router'
import React from 'react'

const withGuard = (
  WrappedComponent: React.ComponentType,
  allowedType: UserType[],
) => {
  const WithGuard = (props: any) => {
    const { user } = useUser()
    const router = useRouter()

    if (!user) {
      router.replace('/login')
      return null
    }

    if (user.status === UserStatus.PENDING) {
      router.replace('/waiting')
      return null
    }

    if (user.status === UserStatus.REJECTED) {
      router.replace('/rejected')
      return null
    }

    if (!allowedType.includes(user.type)) {
      router.replace('/')
      return null
    }

    return <WrappedComponent {...props} />
  }

  return WithGuard
}

export default withGuard
