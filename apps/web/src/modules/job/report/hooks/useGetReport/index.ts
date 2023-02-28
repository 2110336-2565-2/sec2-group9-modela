import { GetReportsDto } from '@modela/dtos'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
const useGetReport = () => {
  const router = useRouter()
  const jobId = router.query.jobId
  const [jobData, setJobData] = useState<GetReportsDto>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get('/reports/jobs/' + jobId)
        setJobData(res.data)
      } catch (err) {
        //console.log(err)
        router.push('/404')
      }
    }
    if (jobId) {
      fetchData()
    }
  }, [jobId, router])

  return jobData
}

export default useGetReport
