import { GetJobCardWithMaxPageDto } from '@modela/dtos'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import { useState } from 'react'

const useJobListData = () => {
  const router = useRouter()
  const [job, setJob] = useState<GetJobCardWithMaxPageDto>()
  const [hasMore, setHasMore] = useState(true)
  var pageControl: number = 1

  const fetchData = async (page: number) => {
    try {
      if (pageControl <= page) {
        pageControl = page + 1
        const res = (
          await apiClient.get<GetJobCardWithMaxPageDto>(`/job`, {
            params: {
              limit: 5,
              page,
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
    } catch (e) {
      console.log(e)
      router.replace('/404')
    }
  }
  return { job, hasMore, fetchData }
}

export default useJobListData
