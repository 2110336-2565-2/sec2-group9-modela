import { UserStatus } from '@modela/database'
import { useUser } from 'common/context/UserContext'
import { useRouter } from 'next/router'
import React from 'react'

const withRejectedGuard = (WrappedComponent: React.ComponentType) => {
  const WithRejectedGuard = (props: any) => {
    const router = useRouter()
    const { user } = useUser()

    if (!user) {
      router.replace('/login')
      return null
    }

    if (user.status === UserStatus.ACCEPTED) {
      router.replace('/job')
      return null
    }

    if (user.status === UserStatus.PENDING) {
      router.replace('/waiting')
      return null
    }

    return <WrappedComponent {...props} />
  }

  return WithRejectedGuard
}

export default withRejectedGuard
