import { GetUserDto } from '@modela/dtos'
import { apiClient } from 'common/utils/api'
import React, { useCallback, useEffect } from 'react'

const useUserData = () => {
  const [user, setUser] = React.useState<GetUserDto | null>(null)
  const [isLoading, setLoading] = React.useState(true)

  const refetch = useCallback(async () => {
    try {
      const res = await apiClient.get<GetUserDto>('/user/me')
      setUser(res.data)
    } catch (e) {
      // TODO handle error
      console.log(e)
    }
    setLoading(false)
  }, [])

  const reset = useCallback(() => {
    setUser(null)
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { user, isLoading, refetch, reset }
}

export default useUserData
