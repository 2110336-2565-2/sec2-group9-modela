import withGuard from 'common/hoc/withGuard'
import JobMenu from 'modules/job/components/JobMenu'
import React from 'react'

import JobCard from '../components/JobCard'
import useJobData from './hooks/useJobData'
import { JobCardContainer, PageContainer } from './styled'

const JobDetailPage = () => {
  const { job } = useJobData()

  return (
    <PageContainer>
      {job && (
        <>
          <JobMenu focus="detail" />
          <JobCardContainer>
            <JobCard {...job} />
          </JobCardContainer>
          <div style={{ width: '10vw' }} />
        </>
      )}
    </PageContainer>
  )
}

export default withGuard(JobDetailPage, 'verified')
