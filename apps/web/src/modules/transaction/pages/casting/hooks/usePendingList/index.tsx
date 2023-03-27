import { GetPendingTransactionDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useCallback, useEffect, useState } from 'react'

import { IJobConfirmModal } from './types'

const usePendingList = () => {
  const [pendingTransaction, setPendingTransaction] = useState<
    GetPendingTransactionDto[]
  >([])

  const [jobModalDetails, setJobModalDetails] =
    useState<IJobConfirmModal | null>(null)
  const { handleError } = useErrorHandler()

  const handleClickFinish = useCallback((jobId: number, castingId: number) => {
    setJobModalDetails({
      jobId,
      castingId,
      modalType: 'accept',
    })
  }, [])

  const handleClickReject = useCallback((jobId: number, castingId: number) => {
    setJobModalDetails({
      jobId,
      castingId,
      modalType: 'reject',
    })
  }, [])

  const handleCloseModal = useCallback(() => {
    setJobModalDetails(null)
  }, [])

  const handleConfirmModal = useCallback(async () => {
    if (!jobModalDetails) return
    try {
      const url = `/credits/jobs/${jobModalDetails.jobId}/${jobModalDetails.modalType}`
      await apiClient.put(url, {
        jobId: jobModalDetails.jobId,
      })
      setPendingTransaction((prev) =>
        prev.filter((tx) => tx.jobId !== jobModalDetails.jobId),
      )
    } catch (err) {
      handleError(err)
    }
    handleCloseModal()
  }, [handleCloseModal, handleError, jobModalDetails])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get<GetPendingTransactionDto[]>('/credits')
        setPendingTransaction(res.data)
      } catch (err) {
        handleError(err)
      }
    }

    fetchData()
  }, [handleError])

  return {
    pendingTransaction,
    isOpen: jobModalDetails !== null,
    jobModalDetails,
    handleClickFinish,
    handleClickReject,
    handleCloseModal,
    handleConfirmModal,
  }
}

export default usePendingList
