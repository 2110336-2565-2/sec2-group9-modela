/* eslint-disable react-hooks/exhaustive-deps */
import { GetJobCardWithMaxPageDto } from '@modela/dtos'
import { useMediaQuery } from '@mui/material'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import { apiClient } from 'common/utils/api'
import dayjs from 'dayjs'
import {
  IFilter,
  initialIFilter,
  initialISearch,
  ISearch,
} from 'modules/job/list/pages/types'
import { useCallback, useEffect, useRef, useState } from 'react'

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
      let newGender = []

      if (state.openCheck) {
        newStatus.push('OPEN')
      }
      if (state.closeCheck) {
        newStatus.push('CLOSE')
      }
      if (state.maleCheck) {
        newGender.push('MALE')
      }
      if (state.femaleCheck) {
        newGender.push('FEMALE')
      }
      if (state.otherCheck) {
        newGender.push('OTHER')
      }
      setSearch({
        ...search,
        title: state.title,
        age: state.age,
        startDate: state.startDate
          ? dayjs(state.startDate).toISOString()
          : null,
        endDate: state.endDate ? dayjs(state.endDate).toISOString() : null,
        location: state.location,
        startTime: state.startTime
          ? dayjs(state.startTime).toISOString()
          : null,
        endTime: state.endTime ? dayjs(state.endTime).toISOString() : null,
        minWage:
          state.wage || state.wage === 0
            ? Number(state.wage) - Number(state.deviant)
            : null,
        maxWage:
          state.wage || state.wage === 0
            ? Number(state.wage) + Number(state.deviant)
            : null,
        status: newStatus,
        gender: newGender,
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
    state.maleCheck,
    state.femaleCheck,
    state.otherCheck,
    state.openCheck,
    state.closeCheck,
    state.startDate,
    state.endDate,
    state.startTime,
    state.endTime,
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
