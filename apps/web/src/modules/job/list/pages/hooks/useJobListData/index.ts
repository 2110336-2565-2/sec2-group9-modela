import { GetJobCardWithMaxPageDto } from '@modela/dtos'
import { apiClient } from 'common/utils/api'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

import { IFilter, ISearch } from '../../types'

const useJobListData = () => {
  const router = useRouter()
  const [job, setJob] = useState<GetJobCardWithMaxPageDto>()
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const pageControl = useRef(1)
  const [search, setSearch] = useState<ISearch>({
    startDate: null,
    endDate: null,
    location: null,
    startTime: null,
    endTime: null,
    minWage: 0,
    maxWage: null,
    age: null,
    status: [],
    gender: [],
    castingId: null,
  })
  const filterData = async (state: IFilter) => {
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
      age: state.age,
      startDate: state.startDate ? dayjs(state.startDate).toISOString() : null,
      endDate: state.endDate ? dayjs(state.endDate).toISOString() : null,
      location: state.location,
      startTime: state.startTime ? dayjs(state.startTime).toISOString() : null,
      endTime: state.endTime ? dayjs(state.endTime).toISOString() : null,
      minWage: Number(state.wage) - Number(state.deviant),
      maxWage: Number(state.wage) + Number(state.deviant),
      status: newStatus,
      gender: newGender,
    })

    setJob({ ...job, jobs: [], maxPage: 1 })
    setPage(1)
    console.log('Set Page : ', page)
    pageControl.current = 0

    setHasMore(true)
  }
  const fetchData = async () => {
    console.log('Fetched')
    try {
      console.log(page, pageControl.current)
      if (pageControl.current <= page) {
        pageControl.current = page + 1
        const res = (
          await apiClient.get<GetJobCardWithMaxPageDto>(`/job`, {
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
      setPage(page + 1)
    } catch (e) {
      console.log(e)
      router.replace('/404')
    }
  }
  return { job, hasMore, fetchData, filterData }
}

export default useJobListData
