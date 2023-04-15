import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useCallback } from 'react'

const useCancelAppliedJob = () => {
  const { handleError } = useErrorHandler()

  const cancelAppliedJob = useCallback(
    async (jobId: number) => {
      try {
        await apiClient.put(`/jobs/${jobId}/application/cancel`)
        window.location.reload()
      } catch (err) {
        handleError(err)
      }
    },
    [handleError],
  )

  return { cancelAppliedJob }
}

export default useCancelAppliedJob
