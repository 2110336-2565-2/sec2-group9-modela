import { PendingRefundDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useCallback, useEffect, useState } from 'react'

import { IRefundActionModal } from './types'

const usePendingRefundList = () => {
  const [pendingRefunds, setPendingRefunds] = useState<PendingRefundDto[]>([])

  const [refundModalDetails, setRefundModalDetails] =
    useState<IRefundActionModal | null>(null)
  const { handleError } = useErrorHandler()

  const handleClickFinish = useCallback((jobId: number, actorId: number) => {
    setRefundModalDetails({
      jobId,
      actorId,
      modalType: 'accept',
    })
  }, [])

  const handleClickReject = useCallback((jobId: number, actorId: number) => {
    setRefundModalDetails({
      jobId,
      actorId,
      modalType: 'reject',
    })
  }, [])

  const handleCloseModal = useCallback(() => {
    setRefundModalDetails(null)
  }, [])

  const handleConfirmModal = useCallback(async () => {
    if (!refundModalDetails) return
    const { jobId, actorId, modalType } = refundModalDetails

    try {
      const url = `/refunds/jobs/${jobId}/actors/${actorId}/${modalType}`
      await apiClient.put(url)
      setPendingRefunds((prev) =>
        prev.filter((tx) => tx.jobId !== jobId || tx.actor.actorId !== actorId),
      )
    } catch (err) {
      handleError(err)
    }

    handleCloseModal()
  }, [handleCloseModal, handleError, refundModalDetails])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get<PendingRefundDto[]>('/refunds')
        setPendingRefunds(res.data)
      } catch (err) {
        handleError(err)
      }
    }

    fetchData()
  }, [handleError])

  return {
    pendingRefunds,
    isOpen: refundModalDetails !== null,
    refundModalDetails,
    handleClickFinish,
    handleClickReject,
    handleCloseModal,
    handleConfirmModal,
  }
}

export default usePendingRefundList
