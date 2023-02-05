import { GetJobDto } from '@modela/dtos'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import JobCard from '../components/JobCard'

const JobDetailPage = () => {
  const router = useRouter()
  const { jid } = router.query
  const [job, setJob] = useState<GetJobDto>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = (await apiClient.get<GetJobDto>('/job/' + jid)).data
        setJob(res)
      } catch (e) {
        console.log(e)
        router.push('/404')
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '3rem',
          width: '40vw',
        }}
      >
        {job && <JobCard {...job} />}
      </div>
    </>
  )
}

export default JobDetailPage
