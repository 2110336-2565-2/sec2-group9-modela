import { UserType } from '@modela/database'
import withGuard from 'common/hoc/withGuard'
import React from 'react'

import JobReportCard from '../components/JobReportCard'
import { RootContainer } from './styled'

const JobReportPage = () => {
  return (
    <RootContainer>
      <JobReportCard />
    </RootContainer>
  )
}

export default withGuard(JobReportPage, [UserType.ADMIN])
