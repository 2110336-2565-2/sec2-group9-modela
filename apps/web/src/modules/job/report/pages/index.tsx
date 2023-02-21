import { UserType } from '@modela/database'
import { GetReportsDto } from '@modela/dtos'
import withGuard from 'common/hoc/withGuard'
import React from 'react'

import JobReportCard from '../components/JobReportCard'
import { RootContainer } from './styled'

const JobReportPage = () => {
  const mockData: GetReportsDto = {
    jobId: 1,
    jobTitle: 'งานพี',
    reports: [
      {
        reportId: 1,
        reporterId: 1,
        reporterName: 'ธนพล สุขสวัสดิ์',
        reason: 'ไม่มีเครื่องเสียง',
      },
      {
        reportId: 2,
        reporterId: 1,
        reporterName: 'ธนพล สุขสวัสดิ์',
        reason: 'ไม่มีเครื่องเสียง',
      },
    ],
  }

  return (
    <RootContainer>
      <JobReportCard {...mockData} />
    </RootContainer>
  )
}

export default withGuard(JobReportPage, 'verified', [UserType.ADMIN])
