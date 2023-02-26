/* eslint-disable react-hooks/exhaustive-deps */
import { GetJobCardWithMaxPageDto } from '@modela/dtos'
import { useMediaQuery } from '@mui/material'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import { useCallback, useEffect, useRef, useState } from 'react'

import { IFilter, initialIFilter, initialISearch, ISearch } from '../../types'

const useJobListData = () => {
  const [isOpen, setOpen] = useState(false)
  const [job, setJob] = useState<GetJobCardWithMaxPageDto>()
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const pageControl = useRef(1)
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

      setJob({ ...job, jobs: [], maxPage: 1 })
      setPage(1)
      pageControl.current = 1

      setHasMore(true)
    },
    [search, job, setJob, setPage, pageControl, setHasMore],
  )

  const fetchData = useCallback(async () => {
    try {
      if (pageControl.current <= page) {
        pageControl.current = page + 1
        const res = (
          await apiClient.get<GetJobCardWithMaxPageDto>(`/jobs`, {
            params: {
              limit: 5,
              page,
              ...search,
            },
          })
        ).data
        setJob((prevJobs) => ({
          ...prevJobs,
          jobs: [...(prevJobs?.jobs || []), ...res.jobs],
          maxPage: res.maxPage,
        }))
        setHasMore(res.maxPage > page)
      }
      setPage((prev) => prev + 1)
    } catch (err) {
      handleError(err)
    }
  }, [page, search])

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
  ])

  return {
    job,
    hasMore,
    fetchData,
    filterData,
    state,
    setState,
    isOpen,
    open,
    close,
  }
}

export default useJobListData
