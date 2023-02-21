import { ActorDto, GetAppliedActorDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useActorData = () => {
  const [actorData, setActorData] = useState<ActorDto[] | null>(null)

  const { handleError } = useErrorHandler()

  const router = useRouter()
  const { jobId } = router.query

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const res = await apiClient.get<GetAppliedActorDto>(
          `/jobs/${jobId}/actors`,
        )
        setActorData(res.data.actors)
      } catch (err) {
        handleError(err)
      }
    }

    fetchActorData()
  }, [handleError, jobId])

  return actorData
}

export default useActorData
