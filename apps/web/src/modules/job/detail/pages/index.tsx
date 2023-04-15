import { UserType } from '@modela/dtos'
import { useUser } from 'common/context/UserContext'
import withGuard from 'common/hoc/withGuard'
import JobMenu from 'modules/job/components/JobMenu'
import React from 'react'

import JobDetailCard from '../components/JobDetailCard'
import useJobData from './hooks/useJobData'
import { JobCardContainer, PageContainer } from './styled'

const JobDetailPage = () => {
  const { job } = useJobData()
  const { user } = useUser()
  const { type } = user!

  return (
    <PageContainer>
      {job && (
        <>
          {type === UserType.CASTING && <JobMenu focus="detail" />}
          <JobCardContainer>
            <JobDetailCard {...job} />
          </JobCardContainer>
          {type === UserType.CASTING && <div style={{ width: '10vw' }} />}
        </>
      )}
    </PageContainer>
  )
}

export default withGuard(JobDetailPage, 'verified')
