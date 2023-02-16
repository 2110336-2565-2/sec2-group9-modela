import { useUser } from 'common/context/UserContext'
import { useRouter } from 'next/router'
import React from 'react'

const withNotLoggedInGuard = (WrappedComponent: React.ComponentType) => {
  const WithNotLoggedInGuard = (props: any) => {
    const router = useRouter()
    const { user } = useUser()

    if (user && !user.isVerified) {
      router.replace('/waiting')
      return null
    }

    if (user && user.isVerified) {
      router.replace('/job')
      return null
    }

    return <WrappedComponent {...props} />
  }

  return WithNotLoggedInGuard
}

export default withNotLoggedInGuard
