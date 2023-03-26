import { GetPendingActorDebitsByJobDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

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
          `/debits/jobs/${jobId}/actors`,
        )
        setTransactionDetail(res.data)
      } catch (err) {
        handleError(err)
      }
    }
    if (router.isReady) fetchData()
  }, [handleError, jobId, router.isReady])

  const actorFilter = useCallback(
    (actorId: number) => {
      if (!transactionDetail) return
      let actorList = transactionDetail.actorList
      actorList = actorList.filter((actor) => actor.actorId !== actorId)
      setTransactionDetail({ ...transactionDetail, actorList })
    },
    [transactionDetail],
  )

  const markAccepted = useCallback(
    async (actorId: number) => {
      try {
        await apiClient.put(`/debits/jobs/${jobId}/actors/${actorId}/accept`)
        actorFilter(actorId)
      } catch (err) {
        handleError(err)
      }
    },
    [actorFilter, handleError, jobId],
  )

  return { transactionDetail, markAccepted }
}
