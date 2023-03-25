import { GetPendingActorDebitsByJobDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useTransactionDetail = () => {
  const [transactionDetail, setTransactionDetail] =
    useState<GetPendingActorDebitsByJobDto | null>()
  const { handleError } = useErrorHandler()
  const router = useRouter()
  const { jobId } = router.query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get<GetPendingActorDebitsByJobDto>(
          '/debits/jobs/' + jobId + '/actors',
        )
        setTransactionDetail(res.data)
      } catch (err) {
        handleError(err)
      }
    }
    if (router.isReady) fetchData()
  }, [handleError, jobId, router.isReady])

  return { transactionDetail }
}
