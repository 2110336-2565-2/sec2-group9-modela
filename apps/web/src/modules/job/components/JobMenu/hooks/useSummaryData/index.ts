import { JobStatus, JobSummaryDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import useSwitch from 'common/hooks/useSwitch'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { NEXT_STATUS_STAGE } from './constants'

const useSummaryData = (setStatus?: (status: JobStatus) => void) => {
  const [summary, setSummary] = useState<Partial<JobSummaryDto>>({
    status: undefined,
    pendingActorCount: undefined,
  })
  const { isOpen: isModalOpen, close, open } = useSwitch()
  const { handleError } = useErrorHandler()
  const { isOpen: isUpdate, close: needUpdate, open: update } = useSwitch(true)

  const router = useRouter()
  const { jobId } = router.query

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const res = await apiClient.get<JobSummaryDto>(`/jobs/${jobId}/summary`)
        setSummary(res.data)
        setStatus?.(res.data.status)
      } catch (err) {
        handleError(err)
      }
      update()
    }

    if (router.isReady) fetchActorData()
  }, [handleError, jobId, router.isReady, isUpdate, update, setStatus])

  const handleStatusChange = useCallback(async () => {
    try {
      await apiClient.put(`/jobs/${jobId}/status`, {
        status: NEXT_STATUS_STAGE[summary.status!],
      })
      needUpdate()
      close()
    } catch (err) {
      handleError(err)
    }
  }, [jobId, summary.status, needUpdate, close, handleError])

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
