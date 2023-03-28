/* eslint-disable react-hooks/exhaustive-deps */
import { GetJobCardDto } from '@modela/dtos'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import {
  IFilter,
  initialIFilter,
  initialISearch,
  ISearch,
} from 'modules/job/list/pages/types'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

const useUnpaidJobData = () => {
  const [unpaidJobData, setUnpaidJobData] = useState<GetJobCardDto[]>([])
  const { handleError } = useErrorHandler()
  const [search, setSearch] = useState<ISearch>(initialISearch)
  const [state, setState] = useState<IFilter>(initialIFilter)
  const router = useRouter()

  const filterData = useCallback(async (state: IFilter) => {
    setSearch((prev) => ({ ...prev, title: state.title }))
  }, [])

  const fetchUnpaidJobData = useCallback(async () => {
    try {
      const res = await apiClient.get<GetJobCardDto[]>(`/credits/jobs`, {
        params: {
          ...search,
        },
      })
      setUnpaidJobData(res.data)
    } catch (err) {
      handleError(err)
    }
  }, [handleError, search])
  useEffect(() => {
    filterData(state)
  }, [state.title, filterData])

  useEffect(() => {
    if (router.isReady) fetchUnpaidJobData()
  }, [router.isReady, fetchUnpaidJobData, handleError])

  return { unpaidJobData, filterData, state, setState }
}

export default useUnpaidJobData
