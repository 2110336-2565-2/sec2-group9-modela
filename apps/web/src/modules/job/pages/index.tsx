import { GetJobDto } from '@modela/dtos'
import { apiClient } from 'common/utils/api'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import Card from '../components/Card'

export default function JobDetail() {
  const router = useRouter()
  const { jid } = router.query
  const [job, setJob] = useState<GetJobDto>()

  useEffect(() => {
    const fetchData = async () => {
      const res = (await apiClient.get('/job/' + jid)).data as GetJobDto
      console.log(res)
      setJob(res)
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
        {job && <Card {...job} />}
      </div>
    </>
  )
}
