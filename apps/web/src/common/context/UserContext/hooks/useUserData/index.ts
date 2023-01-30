import React, { useEffect } from 'react'

import { UserData, UserType } from '../../types'

const useUserData = () => {
  const [user, setUser] = React.useState<UserData | null>(null)

  useEffect(() => {
    const getUser = async () => {
      // TODO fetch user data from API
      setTimeout(() => {
        setUser({
          firstName: 'John',
          isVerified: true,
          type: UserType.ACTOR,
        })
      }, 1000)
    }
    getUser()
  }, [])

  return user
}

export default useUserData
