import { GetJobCardDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

const useUnpaidJobData = () => {
  const [unpaidJobData, setUnpaidJobData] = useState<GetJobCardDto[]>([])
  const { handleError } = useErrorHandler()
  const router = useRouter()

  const fetchUnpaidJobData = useCallback(async () => {
    try {
      const res = await apiClient.get<GetJobCardDto[]>(`/credits/jobs`, {})
      setUnpaidJobData(res.data)
    } catch (err) {
      handleError(err)
    }
  }, [handleError])

  useEffect(() => {
    if (router.isReady) fetchUnpaidJobData()
  }, [router.isReady, fetchUnpaidJobData, handleError])

  return { unpaidJobData }
}

export default useUnpaidJobData
