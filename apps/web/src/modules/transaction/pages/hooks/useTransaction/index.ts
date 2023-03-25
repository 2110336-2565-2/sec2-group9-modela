import { GetPendingJobsDebitsDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useEffect, useState } from 'react'

export const useTransaction = () => {
  const [transactionData, setTransactionData] = useState<
    GetPendingJobsDebitsDto[] | null
  >()
  const { handleError } = useErrorHandler()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get<GetPendingJobsDebitsDto[]>(
          '/debits/jobs',
        )
        setTransactionData(res.data)
      } catch (err) {
        handleError(err)
      }
    }
    fetchData()
  }, [handleError])

  return {
    transactionData,
  }
}
