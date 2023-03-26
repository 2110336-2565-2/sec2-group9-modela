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

  const handleClickFinish = useCallback((jobId: string) => {
    setJobModalDetails({
      jobId,
      modalType: 'finish',
    })
  }, [])

  const handleClickReject = useCallback((jobId: string) => {
    setJobModalDetails({
      jobId,
      modalType: 'reject',
    })
  }, [])

  const handleCloseModal = useCallback(() => {
    setJobModalDetails(null)
  }, [])

  const handleConfirmModal = useCallback(() => {
    setJobModalDetails(null)
  }, [])

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
