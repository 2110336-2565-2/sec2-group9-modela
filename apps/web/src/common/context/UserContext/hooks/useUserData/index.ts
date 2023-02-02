import { GetUserDto } from '@modela/dtos'
import { apiClient } from 'common/utils/api'
import React, { useEffect } from 'react'

const useUserData = () => {
  const [user, setUser] = React.useState<GetUserDto | null>(null)
  const [isLoading, setLoading] = React.useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await apiClient.get<GetUserDto>('/user/me')
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
