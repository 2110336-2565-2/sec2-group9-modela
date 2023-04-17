import { GetUserDto } from '@modela/dtos'
import { AxiosError } from 'axios'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import React, { useCallback, useEffect } from 'react'

const useUserData = () => {
  const [user, setUser] = React.useState<GetUserDto | null>(null)
  const [isLoading, setLoading] = React.useState(true)
  const { handleError } = useErrorHandler()

  const refetch = useCallback(async () => {
    try {
      const res = await apiClient.get<GetUserDto>('/users/me')
      setUser(res.data)
    } catch (err) {
      if ((err as AxiosError).response?.status !== 401) {
        handleError(err)
      }
    }
    setLoading(false)
  }, [handleError])

  const reset = useCallback(() => {
    setUser(null)
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { user, isLoading, refetch, reset }
}

export default useUserData
