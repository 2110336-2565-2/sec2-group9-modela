/* eslint-disable react-hooks/exhaustive-deps */
import { GetAppliedJobDto } from '@modela/dtos'
import { useMediaQuery } from '@mui/material'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { JobCardContainerProps } from 'modules/job/appliedJob/components/JobCardContainer/types'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { IFilter, initialIFilter, initialISearch, ISearch } from '../../types'

const useJobListData = () => {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [job, setJob] = useState<JobCardContainerProps>({ jobs: [] })
  const [search, setSearch] = useState<ISearch>(initialISearch)
  const [state, setState] = useState<IFilter>(initialIFilter)
  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  const { handleError } = useErrorHandler()
  const isDesktop = useMediaQuery('(min-width: 900px)')

  const filterData = useCallback(
    async (state: IFilter) => {
      let newStatus = []
      let newApplicationStatus = []

      if (state.openCheck) {
        newStatus.push('OPEN')
      }
      if (state.selectCheck) {
        newStatus.push('SELECTING')
      }
      if (state.selectEndCheck) {
        newStatus.push('SELECTION_ENDED')
      }
      if (state.finishCheck) {
        newStatus.push('FINISHED')
      }
      if (state.cancelCheck) {
        newStatus.push('CANCELLED')
      }

      if (state.pendingCheck) {
        newApplicationStatus.push('PENDING')
      }
      if (state.offerCheck) {
        newApplicationStatus.push('OFFER_SENT')
      }
      if (state.rejectCheck) {
        newApplicationStatus.push('REJECTED')
      }
      if (state.offerAcceptCheck) {
        newApplicationStatus.push('OFFER_ACCEPTED')
      }
      if (state.offerRejectCheck) {
        newApplicationStatus.push('OFFER_REJECTED')
      }
      setSearch({
        ...search,
        title: state.title,
        status: newStatus,
        applicationStatus: newApplicationStatus,
      })
      setJob((prev) => ({ ...prev, jobs: [] }))
      setIsLoading(true)
    },
    [search, job, setJob],
  )

  const fetchData = useCallback(async () => {
    try {
      const res = (
        await apiClient.get<GetAppliedJobDto[]>(`/jobs/applied`, {
          params: {
            ...search,
          },
        })
      ).data
      setJob((prev) => ({ ...prev, jobs: res }))
    } catch (err) {
      handleError(err)
    }
    setIsLoading(false)
  }, [search])
  useEffect(() => {
    fetchData()
  }, [search])
  useEffect(() => {
    if (!isOpen || isDesktop) {
      filterData(state)
    }
  }, [
    state.openCheck,
    state.selectCheck,
    state.selectEndCheck,
    state.finishCheck,
    state.cancelCheck,
    state.pendingCheck,
    state.offerCheck,
    state.rejectCheck,
    state.offerAcceptCheck,
    state.offerRejectCheck,
    router.isReady,
  ])

  return {
    job,
    fetchData,
    filterData,
    state,
    setState,
    isOpen,
    open,
    close,
    isLoading,
  }
}

export default useJobListData
