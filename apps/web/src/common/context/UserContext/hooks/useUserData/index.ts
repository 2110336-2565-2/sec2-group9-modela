import { apiClient } from 'common/utils/api'
import React, { useEffect } from 'react'

import { UserData } from '../../types'

const useUserData = () => {
  const [user, setUser] = React.useState<UserData | null>(null)
  const [isLoading, setLoading] = React.useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        // TODO add type
        const res = await apiClient.get('/user/me')
        setUser(res.data)
      } catch (e) {
        // TODO handle error
        console.log(e)
      }
      setLoading(false)
    }
    getUser()
  }, [])

  return { user, isLoading }
}

export default useUserData
