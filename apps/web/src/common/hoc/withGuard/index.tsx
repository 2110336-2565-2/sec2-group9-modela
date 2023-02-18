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

    // not login
    if (!user) {
      // TODO change path
      router.replace('/login')
      return null
    }

    if (user.status !== UserStatus.ACCEPTED) {
      // TODO change path
      router.replace('/waiting')
      return null
    }

    // TODO implement error page
    if (!allowedType.includes(user.type)) {
      return <>Not allowed (will implement after this)</>
    }

    return <WrappedComponent {...props} />
  }

  return WithGuard
}

export default withGuard
