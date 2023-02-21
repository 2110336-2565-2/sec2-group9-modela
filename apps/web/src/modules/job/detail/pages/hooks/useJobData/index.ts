import { GetJobDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api/axiosInstance'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useJobData = () => {
  const router = useRouter()
  const { jobId } = router.query
  const [job, setJob] = useState<GetJobDto>()
  const { handleError } = useErrorHandler()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = (await apiClient.get<GetJobDto>('/job/' + jobId)).data
        setJob(res)
      } catch (err) {
        handleError(err)
      }
    }
    if (router.isReady) {
      fetchData()
    }
  }, [handleError, jobId, router.isReady])

  return { job }
}

export default useJobData
