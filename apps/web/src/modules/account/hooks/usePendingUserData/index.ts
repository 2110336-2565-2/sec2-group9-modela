import { PendingUserDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const usePendingUserData = () => {
  const [pendingUserData, setPendingUserData] = useState<
    PendingUserDto[] | null
  >(null)

  const { handleError } = useErrorHandler()

  const router = useRouter()

  useEffect(() => {
    const fetchPendingUserData = async () => {
      try {
        const res = await apiClient.get<PendingUserDto[]>(`/users/pending`)
        setPendingUserData(res.data)
      } catch (err) {
        handleError(err)
      }
    }

    if (router.isReady) fetchPendingUserData()
  }, [handleError, router.isReady])

  return pendingUserData
}

export default usePendingUserData
