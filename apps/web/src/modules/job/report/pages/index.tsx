import { GetReportsDto, UserType } from '@modela/dtos'
import { CircularProgress } from '@mui/material'
import withGuard from 'common/hoc/withGuard'
import React from 'react'

import JobReportCard from '../components/JobReportCard'
import useGetReport from '../hooks/useGetReport'
import { RootContainer } from './styled'

const JobReportPage = () => {
  const Data: GetReportsDto | undefined = useGetReport()

  return (
    <RootContainer>
      {Data ? <JobReportCard {...Data} /> : <CircularProgress />}
    </RootContainer>
  )
}

export default withGuard(JobReportPage, 'verified', [UserType.ADMIN])
