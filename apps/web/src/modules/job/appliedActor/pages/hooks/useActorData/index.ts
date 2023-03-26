import {
  ActorDto,
  ApplicationStatus,
  GetAppliedActorDto,
  JobStatus,
} from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

const useActorData = (query: {
  name?: string
  status?: ApplicationStatus[]
}) => {
  const [actorData, setActorData] = useState<ActorDto[] | null>(null)
  const [jobStatus, setJobStatus] = useState<JobStatus>(JobStatus.OPEN)

  const { handleError } = useErrorHandler()

  const router = useRouter()
  const { jobId } = router.query

  const handleSetJobStatus = useCallback((jobStatus: JobStatus) => {
    setJobStatus(jobStatus)
  }, [])

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const res = await apiClient.get<GetAppliedActorDto>(
          `/jobs/${jobId}/actors`,
          { params: query },
        )
        setActorData(res.data.actors)
      } catch (err) {
        handleError(err)
      }
    }

    if (router.isReady) fetchActorData()
  }, [handleError, jobId, router.isReady, query])

  return { jobStatus, actorData, handleSetJobStatus }
}

export default useActorData
