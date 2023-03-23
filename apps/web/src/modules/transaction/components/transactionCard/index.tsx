import { Link, Typography } from '@mui/material'
import JobCardHeader from 'modules/job/components/JobCardHeader'
import React from 'react'

import { CardContainer } from './styled'

const TransactionCard = () => {
  return (
    <CardContainer>
      <JobCardHeader
        title="P"
        castingId={1}
        castingName="P"
        companyName="company"
        jobCastingImageUrl=""
        jobId={1}
        status="OPEN"
      />
      <Typography>
        รายละเอียดงาน: <Link>sk</Link>
      </Typography>
    </CardContainer>
  )
}

export default TransactionCard
