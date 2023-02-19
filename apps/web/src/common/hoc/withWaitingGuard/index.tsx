import { UserStatus } from '@modela/database'
import { useUser } from 'common/context/UserContext'
import { useRouter } from 'next/router'
import React from 'react'

const withWaitingGuard = (WrappedComponent: React.ComponentType) => {
  const WithWaitingGuard = (props: any) => {
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

    if (user.status === UserStatus.REJECTED) {
      router.replace('/rejected')
      return null
    }

    return <WrappedComponent {...props} />
  }

  return WithWaitingGuard
}

export default withWaitingGuard
