import { JobSummaryDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import useSwitch from 'common/hooks/useSwitch'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

const useSummaryData = () => {
  const [summary, setSummary] = useState<Partial<JobSummaryDto>>({
    status: undefined,
    pendingActorCount: undefined,
  })
  const { isOpen: isModalOpen, close, open } = useSwitch()
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

  const handleStatusChange = useCallback(async () => {
    try {
      await apiClient.put(`/jobs/${jobId}/status`)
      close()
    } catch (err) {
      handleError(err)
    }
  }, [jobId, close, handleError])

  const handleModalOpen = useCallback(() => {
    open()
  }, [open])

  const handleCloseModal = useCallback(() => {
    close()
  }, [close])

  return {
    status: summary.status,
    pendingActorCount: summary.pendingActorCount,
    isModalOpen,
    handleCloseModal,
    handleStatusChange,
    handleModalOpen,
  }
}

export default useSummaryData
