/* eslint-disable react-hooks/exhaustive-deps */
import { GetJobCardDto } from '@modela/dtos'
import { useUser } from 'common/context/UserContext'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

const useJobData = () => {
  const [job, setJob] = useState<GetJobCardDto[]>()
  const { handleError } = useErrorHandler()
  const router = useRouter()
  const { user } = useUser()
  const { userId } = router.query
  const userIdCur = !userId ? user?.userId : userId

  const fetchData = useCallback(async () => {
    try {
      const res = (
        await apiClient.get<GetJobCardDto[]>(`/users/${userIdCur}/history`)
      ).data
      setJob(res)
    } catch (err) {
      handleError(err)
    }
  }, [])

  useEffect(() => {
    if (router.isReady) {
      fetchData()
    }
  }, [router.isReady])

  return {
    job,
    fetchData,
  }
}

export default useJobData
