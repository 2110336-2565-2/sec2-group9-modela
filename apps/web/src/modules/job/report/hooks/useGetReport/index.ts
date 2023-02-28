import { GetReportsDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useGetReport = () => {
  const router = useRouter()
  const jobId = router.query.jobId
  const { handleError } = useErrorHandler()
  const [jobData, setJobData] = useState<GetReportsDto>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get('/reports/jobs/' + jobId)
        setJobData(res.data)
      } catch (err) {
        handleError(err)
      }
    }
    if (jobId) {
      fetchData()
    }
  }, [jobId, router, handleError])

  return jobData
}

export default useGetReport
