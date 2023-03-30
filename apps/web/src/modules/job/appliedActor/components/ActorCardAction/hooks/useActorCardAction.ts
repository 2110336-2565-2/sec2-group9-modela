import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const useActorCardAction = () => {
  const { handleError } = useErrorHandler()
  const router = useRouter()
  const { jobId } = router.query

  const rejectActor = useCallback(
    async (actorId: number) => {
      try {
        await apiClient.put(`jobs/${jobId}/actors/${actorId}/reject`)
      } catch (err) {
        handleError(err)
      }
    },
    [handleError, jobId],
  )

  const acceptActor = useCallback(
    async (actorId: number) => {
      try {
        await apiClient.put(`jobs/${jobId}/actors/${actorId}/offer`)
      } catch (err) {
        handleError(err)
      }
    },
    [handleError, jobId],
  )

  return { rejectActor, acceptActor }
}

export default useActorCardAction
