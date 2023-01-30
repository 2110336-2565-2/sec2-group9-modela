import { useUser } from 'common/context/UserContext'
import { UserType } from 'common/types/prisma'
import { useRouter } from 'next/router'
import React from 'react'

const withGuard = (
  WrappedComponent: React.ComponentType,
  allowedType: UserType[],
) => {
  const WithGuard = (props: any) => {
    const user = useUser()
    const router = useRouter()

    // not login
    if (!user) {
      router.replace('/login')
      return null
    }

    // not allowed
    if (!allowedType.includes(user.type)) {
      return <>Not allowed (will implement after this)</>
    }

    return <WrappedComponent {...props} />
  }

  return WithGuard
}

export default withGuard
