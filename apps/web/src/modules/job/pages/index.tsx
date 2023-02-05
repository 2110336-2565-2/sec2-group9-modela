import React from 'react'

import JobCard from '../components/JobCard'
import useJobData from './hooks/useJobData'

const JobDetailPage = () => {
  const { job } = useJobData()

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
