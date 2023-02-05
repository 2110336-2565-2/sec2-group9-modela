import React from 'react'

import JobCard from '../components/JobCard'
import useJobData from './hooks/useJobData'
import { RootContainer } from './styled'

const JobDetailPage = () => {
  const { job } = useJobData()

  return <RootContainer>{job && <JobCard {...job} />}</RootContainer>
}

export default JobDetailPage
