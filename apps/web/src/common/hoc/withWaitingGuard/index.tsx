import { useUser } from 'common/context/UserContext'
import { useRouter } from 'next/router'
import React from 'react'

const withWaitingGuard = (WrappedComponent: React.ComponentType) => {
  const WithWaitingGuard = (props: any) => {
    const router = useRouter()
    const { user } = useUser()

    if (!user) {
      // TODO change path
      router.replace('/login')
      return null
    }

    if (user.isVerified) {
      // TODO change path
      router.replace('/job')
      return null
    }

    return <WrappedComponent {...props} />
  }

  return WithWaitingGuard
}

export default withWaitingGuard
