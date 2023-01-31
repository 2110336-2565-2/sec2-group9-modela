import { UserType } from 'common/types/prisma'
import React, { useEffect } from 'react'

import { UserData } from '../../types'

const useUserData = () => {
  const [user, setUser] = React.useState<UserData | null>(null)
  const [isLoading, setLoading] = React.useState(true)

  useEffect(() => {
    const getUser = async () => {
      // TODO fetch user data from API
      // will write test for this file after API call is implemented
      setTimeout(() => {
        setUser({
          firstName: 'John',
          isVerified: true,
          type: UserType.ACTOR,
        })
        setLoading(false)
      }, 1000)
    }
    getUser()
  }, [])

  return { user, isLoading }
}

export default useUserData
