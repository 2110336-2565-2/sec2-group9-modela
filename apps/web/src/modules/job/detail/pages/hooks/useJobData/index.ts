import { GetJobDto } from '@modela/dtos'
import { apiClient } from 'common/utils/api/axiosInstance'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useJobData = () => {
  const router = useRouter()
  const { jobId } = router.query
  const [job, setJob] = useState<GetJobDto>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = (await apiClient.get<GetJobDto>('/job/' + jobId)).data
        setJob(res)
      } catch (e) {
        console.log(e)
        router.replace('/404')
      }
    }
    if (router.isReady) {
      fetchData()
    }
  }, [jobId])

  return { job }
}

export default useJobData
