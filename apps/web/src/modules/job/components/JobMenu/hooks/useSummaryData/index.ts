import { JobSummaryDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useSummaryData = () => {
  const [summary, setSummary] = useState<Partial<JobSummaryDto>>({
    status: undefined,
    pendingActorCount: undefined,
  })

  const { handleError } = useErrorHandler()

  const router = useRouter()
  const { jobId } = router.query

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const res = await apiClient.get<JobSummaryDto>(`/jobs/${jobId}/summary`)
        setSummary(res.data)
      } catch (err) {
        handleError(err)
      }
    }

    if (router.isReady) fetchActorData()
  }, [handleError, jobId, router.isReady])

  return summary
}

export default useSummaryData
