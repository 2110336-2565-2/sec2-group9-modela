import { GetReportsDto } from '@modela/dtos'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
const useGetReport = () => {
  const router = useRouter()
  const jobId = router.query.jobId
  const [jobData, setJobData] = useState<GetReportsDto>()

  useEffect(() => {
    if (jobId) {
      apiClient.get('/reports/jobs/' + jobId).then((res) => {
        setJobData(res.data)
      })
    }
  }, [jobId])

  return jobData
}

export default useGetReport
