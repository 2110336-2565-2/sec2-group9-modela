/* eslint-disable react-hooks/exhaustive-deps */
import { ApplicationStatus, GetAppliedJobDto, JobStatus } from '@modela/dtos'
import { useMediaQuery } from '@mui/material'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import useSwitch from 'common/hooks/useSwitch'
import { apiClient } from 'common/utils/api'
import { JobCardContainerProps } from 'modules/job/appliedJob/components/JobCardContainer/types'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { IFilter, initialIFilter, initialISearch, ISearch } from '../../types'

const useJobListData = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [job, setJob] = useState<JobCardContainerProps>({ jobs: [] })
  const [search, setSearch] = useState<ISearch>(initialISearch)
  const [state, setState] = useState<IFilter>(initialIFilter)
  const { handleError } = useErrorHandler()
  const isDesktop = useMediaQuery('(min-width: 900px)')

  const { isOpen, open, close } = useSwitch()

  const filterData = useCallback(
    async (state: IFilter) => {
      let newStatus = []
      let newApplicationStatus = []

      if (state.openCheck) {
        newStatus.push(JobStatus.OPEN)
      }
      if (state.selectCheck) {
        newStatus.push(JobStatus.SELECTING)
      }
      if (state.selectEndCheck) {
        newStatus.push(JobStatus.SELECTION_ENDED)
      }
      if (state.finishCheck) {
        newStatus.push(JobStatus.FINISHED)
      }
      if (state.cancelCheck) {
        newStatus.push(JobStatus.CANCELLED)
      }

      if (state.pendingCheck) {
        newApplicationStatus.push(ApplicationStatus.PENDING)
      }
      if (state.offerCheck) {
        newApplicationStatus.push(ApplicationStatus.OFFER_SENT)
      }
      if (state.rejectCheck) {
        newApplicationStatus.push(ApplicationStatus.REJECTED)
      }
      if (state.offerAcceptCheck) {
        newApplicationStatus.push(ApplicationStatus.OFFER_ACCEPTED)
      }
      if (state.offerRejectCheck) {
        newApplicationStatus.push(ApplicationStatus.OFFER_REJECTED)
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
