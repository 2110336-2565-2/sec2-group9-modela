import { useErrorHandler } from 'common/hooks/useErrorHandler'
import useSwitch from 'common/hooks/useSwitch'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

const useActorCardAction = () => {
  const { handleError } = useErrorHandler()
  const router = useRouter()
  const { isOpen, open, close } = useSwitch()
  const [isRejected, setIsRejected] = useState(false)

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

  return {
    rejectActor,
    acceptActor,
    isOpen,
    open,
    close,
    isRejected,
    setIsRejected,
  }
}

export default useActorCardAction
